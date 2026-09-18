"""Extract vector logos, association marks and sector line art from the print PDF as standalone SVGs.
Serialises only the drawing items inside each cell (PyMuPDF's page SVG export always emits the whole page).
Raster parts inside a cell are embedded as PNG data URIs. Cells are in PDF points on the 1314 x 882 pt spreads."""
import fitz, os, base64
PDF = "/Users/raghavgrover/Desktop/JREW/Business Development/Brochure and Content/JREW Engineering Brochure Final Print-ready.pdf"
OUT = "/Users/raghavgrover/Desktop/JREW/Code/jrew-site-v3/public"
INSPECT = "/private/tmp/claude-501/-Users-raghavgrover/dd67866f-61cf-495a-ae5c-6791a8046d2f/scratchpad/vectors"
os.makedirs(INSPECT, exist_ok=True)
doc = fitz.open(PDF)
_cache = {}
def drawings(pi):
    if pi not in _cache:
        _cache[pi] = (doc[pi].get_drawings(), doc[pi].get_image_info(xrefs=True))
    return _cache[pi]

def rgb(c):
    return "#%02x%02x%02x" % tuple(int(round(v * 255)) for v in c[:3]) if c else "none"

def path_d(items, closed):
    d = []; cur = None
    def mv(p):
        nonlocal cur
        if cur is None or abs(cur.x - p.x) > 0.01 or abs(cur.y - p.y) > 0.01:
            d.append(f"M{p.x:.2f} {p.y:.2f}")
    for it in items:
        op = it[0]
        if op == "l":
            mv(it[1]); d.append(f"L{it[2].x:.2f} {it[2].y:.2f}"); cur = it[2]
        elif op == "c":
            mv(it[1]); d.append(f"C{it[2].x:.2f} {it[2].y:.2f} {it[3].x:.2f} {it[3].y:.2f} {it[4].x:.2f} {it[4].y:.2f}"); cur = it[4]
        elif op == "re":
            r = it[1]; d.append(f"M{r.x0:.2f} {r.y0:.2f}H{r.x1:.2f}V{r.y1:.2f}H{r.x0:.2f}Z"); cur = None
        elif op == "qu":
            q = it[1]; d.append(f"M{q.ul.x:.2f} {q.ul.y:.2f}L{q.ur.x:.2f} {q.ur.y:.2f}L{q.lr.x:.2f} {q.lr.y:.2f}L{q.ll.x:.2f} {q.ll.y:.2f}Z"); cur = None
    if closed and d and not d[-1].endswith("Z"): d.append("Z")
    return "".join(d)

def image_png(xref):
    pix = fitz.Pixmap(doc, xref)
    if pix.n - pix.alpha >= 4: pix = fitz.Pixmap(fitz.csRGB, pix)
    return base64.b64encode(pix.tobytes("png")).decode()

def export(page_index, name, cell, subdir, pad=4, mode="inside", skip_wide=True):
    page = doc[page_index]; drs, imgs = drawings(page_index)
    cell = fitz.Rect(cell); parts = []; boxes = []
    for d in drs:
        r = d["rect"]
        if mode == "inside":
            ok = r.x0 >= cell.x0 and r.x1 <= cell.x1 and r.y0 >= cell.y0 and r.y1 <= cell.y1
        else:
            inter = r & cell
            ok = not inter.is_empty and inter.get_area() >= 0.5 * max(r.get_area(), 0.01) and r.y0 >= cell.y0 - 2 and r.y1 <= cell.y1 + 2
        if not ok: continue
        if skip_wide and r.width > 0.9 * cell.width and r.height < 2: continue
        if r.width < 0.3 and r.height < 0.3: continue
        if mode == "intersect" and r.width > 0.6 * cell.width and all(it[0] in ("re", "qu") for it in d["items"]): continue  # card fills
        fill = d.get("fill"); stroke = d.get("color"); typ = d.get("type", "")
        attrs = []
        if "f" in typ and fill is not None:
            attrs.append(f'fill="{rgb(fill)}"')
            if d.get("fill_opacity", 1) not in (None, 1): attrs.append(f'fill-opacity="{d["fill_opacity"]:.3f}"')
            if d.get("even_odd"): attrs.append('fill-rule="evenodd"')
        else:
            attrs.append('fill="none"')
        if "s" in typ and stroke is not None:
            attrs.append(f'stroke="{rgb(stroke)}" stroke-width="{max(d.get("width") or 0.5, 0.35):.2f}"')
            cap = {0: "butt", 1: "round", 2: "square"}.get((d.get("lineCap") or (0,))[0] if isinstance(d.get("lineCap"), tuple) else d.get("lineCap", 0), "butt")
            join = {0: "miter", 1: "round", 2: "bevel"}.get(d.get("lineJoin", 0) or 0, "miter")
            attrs.append(f'stroke-linecap="{cap}" stroke-linejoin="{join}"')
            if d.get("stroke_opacity", 1) not in (None, 1): attrs.append(f'stroke-opacity="{d["stroke_opacity"]:.3f}"')
        dd = path_d(d["items"], bool(d.get("closePath")))
        if not dd: continue
        parts.append(f'<path d="{dd}" {" ".join(attrs)}/>'); boxes.append(r)
    for i in imgs:
        b = fitz.Rect(i["bbox"])
        if b.x0 >= cell.x0 - 1 and b.x1 <= cell.x1 + 1 and b.y0 >= cell.y0 - 1 and b.y1 <= cell.y1 + 1 and i.get("xref"):
            parts.append(f'<image href="data:image/png;base64,{image_png(i["xref"])}" x="{b.x0:.2f}" y="{b.y0:.2f}" width="{b.width:.2f}" height="{b.height:.2f}" preserveAspectRatio="none"/>')
            boxes.append(b)
    if not boxes:
        print("EMPTY", name); return
    u = boxes[0]
    for b in boxes[1:]: u |= b
    u = fitz.Rect(u.x0 - pad, u.y0 - pad, u.x1 + pad, u.y1 + pad)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{u.x0:.2f} {u.y0:.2f} {u.width:.2f} {u.height:.2f}" '
           f'width="{u.width:.0f}" height="{u.height:.0f}" role="img">' + "".join(parts) + "</svg>")
    with open(f"{OUT}/{subdir}/{name}.svg", "w") as f: f.write(svg)
    pix = page.get_pixmap(dpi=300, clip=u); pix.save(f"{INSPECT}/{subdir}-{name}.png")
    print(f"{name:22s} {u.width:6.1f}x{u.height:5.1f}pt  {len(parts):3d} parts  {len(svg)//1024:5d} KB")

cols = [(680, 821), (821, 961), (961, 1105), (1105, 1250)]
rows = [(175, 283), (283, 398), (398, 513), (513, 628), (628, 743), (743, 862)]
names = [["jcb", "caterpillar", "kion", "hyster-yale"], ["godrej", "ace", "leeboy", "claas"],
         ["manitou", "terex", "volvo", "faiveley"], ["maini", "escorts-kubota", "mahindra", "doosan"],
         ["josts", "puma", "linde", "skyjack"], ["preet", "bobcat", "cmpl", "cnh-industrial"]]
for ri, (ry0, ry1) in enumerate(rows):
    for ci, (cx0, cx1) in enumerate(cols):
        export(10, names[ri][ci], (cx0, ry0, cx1, ry1), "logos")
for name, cell in [("excavator", (940, 214, 1260, 376)), ("forklift", (940, 380, 1260, 530)),
                   ("combine-harvester", (940, 532, 1260, 688)), ("locomotive", (940, 690, 1260, 845))]:
    export(1, name, cell, "lineart", pad=3, mode="intersect", skip_wide=False)
for name, cell in [("jrew-wordmark-panel", (95, 770, 205, 830)), ("icema", (222, 770, 306, 830)), ("make-in-india", (312, 770, 396, 830)),
                   ("greenco", (398, 770, 455, 830)), ("cii", (462, 770, 550, 830)), ("tuv-rheinland", (552, 770, 650, 830)),
                   ("jrew-logo-cover", (680, 25, 840, 120))]:
    export(11, name, cell, "associations", pad=3)
