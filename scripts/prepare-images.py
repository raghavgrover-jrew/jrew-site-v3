"""Copy brochure photography into public/images with subject names, downsized to at most 2400 px, JPEG q82.
Transparent PNGs keep their alpha. Source: extracted-assets/images (70 files). Mapping verified against the spread renders.
STAKON cutouts are not here: their extracted JPEGs lost the soft mask, so extract-stakon-alpha.py pulls them from the PDF."""
import os
from PIL import Image
SRC = "/Users/raghavgrover/Desktop/JREW/Business Development/Brochure and Content/extracted-assets/images"
OUT = "/Users/raghavgrover/Desktop/JREW/Code/jrew-site-v3/public/images"
MAP = {
  # hero and shop floor
  "hero/plant-exterior-mohali.jpg": ("p01_x197_2768x1958.jpeg", 2400),
  "shopfloor/fabrication-bay.jpg": ("p02_x3_2366x1776.jpeg", 2000),
  "shopfloor/operator-at-machine.jpg": ("p02_x4_2369x1778.jpeg", 2000),
  "shopfloor/welder-casting.jpg": ("p02_x5_2464x1848.jpeg", 2000),
  # families
  "products/mast-assembly.jpg": ("p04_x14_452x802.jpeg", 900),
  "products/front-axle-assembly.jpg": ("p04_x15_1056x234.jpeg", 1200),
  # eight component cards (spread 04 right)
  "components/dipper-baseplate.jpg": ("p04_x17_509x143.jpeg", 900),
  "components/machined-plate.jpg": ("p04_x25_431x271.jpeg", 900),
  "components/suspension-bearing.jpg": ("p04_x18_253x293.jpeg", 900),
  "components/latch-assembly.jpg": ("p04_x27_517x233.jpeg", 900),
  "components/unbalanced-mass.jpg": ("p04_x19_378x298.jpeg", 900),
  "components/excavator-bucket.jpg": ("p04_x23_621x414.jpeg", 900),
  "components/ball-race-rotation-ring.jpg": ("p04_x22_428x220.jpeg", 900),
  "components/compactor-drum.jpg": ("p04_x20_429x278.jpeg", 900),
  # 14 attachments (spread 05)
  "attachments/hd-fork-with-grab.jpg": ("p05_x45_746x712.jpeg", 900),
  "attachments/power-grab.jpg": ("p05_x47_569x585.jpeg", 900),
  "attachments/multi-shovel.jpg": ("p05_x48_674x645.jpeg", 900),
  "attachments/manure-fork-with-grab.jpg": ("p05_x46_532x441.jpeg", 900),
  "attachments/grapple-scrap-with-industrial-grab.jpg": ("p05_x35_514x404.jpeg", 900),
  "attachments/cotton-grab.jpg": ("p05_x36_500x496.jpeg", 900),
  "attachments/sugarcane-grab.jpg": ("p05_x33_521x464.jpeg", 900),
  "attachments/drum-handler.jpg": ("p05_x34_526x309.jpeg", 900),
  "attachments/pole-planter.jpg": ("p05_x41_530x270.jpeg", 900),
  "attachments/man-basket.jpg": ("p05_x42_505x368.jpeg", 900),
  "attachments/skid-steer-pallet-fork.jpg": ("p05_x40_501x476.jpeg", 900),
  "attachments/fork-frame.jpg": ("p05_x43_699x606.jpeg", 900),
  "attachments/precision-placer.jpg": ("p05_x44_438x535.jpeg", 900),
  "attachments/side-tilt-rotate-carriage.jpg": ("p05_x38_474x456.jpeg", 900),
  # forged and profiles (spread 06 left)
  "forged/lifting-hook.jpg": ("p06_x52_328x640.jpeg", 900),
  "forged/forged-forks.jpg": ("p06_x53_767x549.jpeg", 900),
  "forged/special-steel-profiles.jpg": ("p06_x54_806x604.jpeg", 900),
  "forged/forging-shop-panorama.jpg": ("p06_x63_2425x838.jpeg", 2400),
  # STAKON (spread 06 right)
  # facilities (spread 07)
  "facilities/moh-1.jpg": ("p07_x69_811x609.jpeg", 1200),
  "facilities/fbd-1.jpg": ("p07_x70_799x600.jpeg", 1200),
  "facilities/fbd-2.jpg": ("p07_x71_861x646.jpeg", 1200),
  "facilities/moh-2.jpg": ("p07_x72_792x698.jpeg", 1200),
  "process/laser-cutting.jpg": ("p07_x73_1534x1386.jpeg", 1600),
  "process/container-loading.jpg": ("p07_x74_1139x1085.jpeg", 1400),
  # engineering (spread 08), case study and quality (spread 09)
  "engineering/design-review.jpg": ("p08_x78_1322x991.jpeg", 1400),
  "engineering/fixture.jpg": ("p08_x79_1177x996.jpeg", 1400),
  "engineering/robotic-welding.jpg": ("p08_x80_1986x1053.jpeg", 2000),
  "quality/paint-booth-carriage.jpg": ("p09_x84_1121x842.jpeg", 1400),
  "quality/carriage-assembly-export.jpg": ("p09_x85_2405x1805.jpeg", 2000),
  "quality/faro-arm-cmm.jpg": ("p09_x86_2517x1886.jpeg", 2000),
  "quality/passed-part.jpg": ("p09_x87_1427x1071.jpeg", 1400),
  # people and CSR (spread 10)
  "people/visual-management-board.jpg": ("p10_x94_1489x1034.jpeg", 1600),
  "people/office-interior.jpg": ("p10_x95_2437x1827.jpeg", 2000),
  "csr/school-classroom.jpg": ("p10_x91_802x534.jpeg", 1200),
  "csr/medical-handover.jpg": ("p10_x92_780x585.jpeg", 1200),
  "csr/funeral-van.jpg": ("p10_x93_818x546.jpeg", 1200),
  # awards (spread 11)
  "awards/caterpillar-2023.jpg": ("p11_x140_783x522.jpeg", 1200),
  "awards/caterpillar-2024.jpg": ("p11_x141_770x514.jpeg", 1200),
  "awards/caterpillar-2025.jpg": ("p11_x142_812x609.jpeg", 1200),
  "awards/cii-godrej.jpg": ("p11_x143_1600x1066.jpeg", 1400),
  "awards/jcb.jpg": ("p11_x144_1398x1048.jpeg", 1400),
  "awards/et-now.jpg": ("p11_x134_1270x1025.jpeg", 1400),
  "awards/godrej-quality-leadership.jpg": ("p10_x169_1326x939.jpeg", 1400),
}
total = 0
for dest, (src, maxpx) in MAP.items():
    path = f"{OUT}/{dest}"; os.makedirs(os.path.dirname(path), exist_ok=True)
    im = Image.open(f"{SRC}/{src}")
    if max(im.size) > maxpx:
        im.thumbnail((maxpx, maxpx), Image.LANCZOS)
    if dest.endswith(".png"):
        im.save(path, optimize=True)
    else:
        im.convert("RGB").save(path, quality=82, optimize=True, progressive=True)
    sz = os.path.getsize(path); total += sz
    print(f"{dest:48s} {im.size[0]:5d}x{im.size[1]:<5d} {sz//1024:5d} KB")
print("total", total // 1024, "KB")
