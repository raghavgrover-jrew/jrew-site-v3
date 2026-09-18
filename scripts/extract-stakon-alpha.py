"""STAKON product cutouts with their soft masks applied.

The extracted-assets JPEGs for spread 06 flattened the PDF's SMask: the machine pixels are
right but the drop shadow (semi-transparent black in the source) became a hard black blob.
This pulls the same image objects straight from the print PDF, applies the SMask, and writes
alpha PNGs at web size. Run after prepare-images.py; it overwrites public/images/stakon/.
"""
import io, os
import fitz
from PIL import Image

PDF = "/Users/raghavgrover/Desktop/JREW/Business Development/Brochure and Content/JREW Engineering Brochure Final Print-ready.pdf"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "stakon")
# page 6 image xrefs (see extracted-assets naming p06_x<xref>_<w>x<h>)
TARGETS = {58: ("fe-series.png", 900), 65: ("se-series.png", 900), 60: ("fept-2000.png", 900), 62: ("fept-2000-alt.png", 900), 56: ("stacker-hero.png", 1400)}

doc = fitz.open(PDF)
os.makedirs(OUT, exist_ok=True)
for xref, (name, maxpx) in TARGETS.items():
    pix = fitz.Pixmap(doc, xref)
    if pix.n - pix.alpha > 3:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    smask = doc.extract_image(xref).get("smask", 0)
    if smask:
        mask = fitz.Pixmap(doc, smask)
        if mask.n > 1:
            mask = fitz.Pixmap(fitz.csGRAY, mask)
        pix = fitz.Pixmap(pix, mask)
    im = Image.open(io.BytesIO(pix.tobytes("png")))
    if max(im.size) > maxpx:
        im.thumbnail((maxpx, maxpx), Image.LANCZOS)
    path = os.path.join(OUT, name)
    im.save(path, optimize=True)
    print(f"{name:20s} xref {xref} smask {smask} -> {im.size[0]}x{im.size[1]} {os.path.getsize(path)//1024} KB alpha={'A' in im.mode}")
