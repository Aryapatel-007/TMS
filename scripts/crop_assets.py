"""
Crop the TMS Instagram screenshots into clean website photos.

Run from the repo root:
    python scripts/crop_assets.py

Reads   assets/raw/*.jpg          (original screenshots, never edited)
Writes  public/images/<name>.webp (photos used on the website)
        assets/refs/<name>.png    (reference images for the logo, not used on the site)
        assets/review/contact-sheet.jpg (all crops on one page, for a quick visual check)

Crop boxes were measured on 1189 x 2576 screenshots and are stored as
proportions, so they work at any resolution with the same aspect ratio.
If a crop needs fixing, change only that entry's box and run the script again.
"""

from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "assets" / "raw"
OUT = ROOT / "public" / "images"
REFS = ROOT / "assets" / "refs"
REVIEW = ROOT / "assets" / "review"

BASE_W, BASE_H = 1189, 2576

# raw file -> (output name, (x0, y0, x1, y1) in 1189 x 2576 space, kind)
# kind "site" goes to public/images as webp, kind "ref" goes to assets/refs as png
CROPS = {
    # banquet venue: interiors and exterior
    # The site shows the banquet only, so food and chef photos are not cropped.
    "1000133658.jpg": ("hero-angel-hall",              (0, 530, 1176, 2088), "site"),
    "1000133701.jpg": ("space-brick-arch-long-tables", (0, 108, 1189, 2190), "site"),
    "1000133705.jpg": ("space-private-curtain-table",  (0, 108, 1189, 2190), "site"),
    "1000133703.jpg": ("space-angel-fountain",         (0, 108, 1189, 1880), "site"),
    "1000133707.jpg": ("space-rose-painting",          (0, 108, 1189, 1880), "site"),
    "1000133654.jpg": ("space-cherub-lamp",            (0, 990, 1189, 1935), "site"),
    "1000133656.jpg": ("space-chandelier-ceiling",     (0, 800, 1189, 1385), "site"),
    "1000133660.jpg": ("space-window-dining",          (600, 400, 1056, 1145), "site"),
    "1000133697.jpg": ("exterior-storefront",          (0, 280, 1189, 2140), "site"),
    "1000133721.jpg": ("feast-see-you-at-the-table",   (0, 1300, 1189, 2230), "site"),
}

# Extra reference crops (one raw file can produce more than one output)
REF_CROPS = [
    ("1000133636.jpg", "ref-logo-copper-on-black", (200, 890, 990, 1685)),
    ("1000133697.jpg", "ref-logo-storefront",      (420, 450, 690, 810)),
    ("1000133638.jpg", "ref-menu-story-page",      (0, 162, 1189, 2275)),
    ("1000133699.jpg", "ref-menu-cover-lockup",    (150, 1050, 1150, 1900)),
]


def scaled_box(box, size):
    w, h = size
    x0, y0, x1, y1 = box
    return (
        round(x0 / BASE_W * w),
        round(y0 / BASE_H * h),
        round(x1 / BASE_W * w),
        round(y1 / BASE_H * h),
    )


def check_ratio(name, size):
    w, h = size
    expected = BASE_W / BASE_H
    actual = w / h
    if abs(actual - expected) / expected > 0.02:
        print(f"  WARNING {name}: aspect ratio {w}x{h} differs from the screenshots the boxes were measured on. Check this crop by eye.")


def main():
    for folder in (OUT, REFS, REVIEW):
        folder.mkdir(parents=True, exist_ok=True)

    thumbs = []
    missing = []

    jobs = [(raw, name, box, kind) for raw, (name, box, kind) in CROPS.items()]
    jobs += [(raw, name, box, "ref") for raw, name, box in REF_CROPS]

    for raw, name, box, kind in jobs:
        src = RAW / raw
        if not src.exists():
            missing.append(raw)
            continue
        img = Image.open(src).convert("RGB")
        check_ratio(raw, img.size)
        crop = img.crop(scaled_box(box, img.size))

        if kind == "site":
            dest = OUT / f"{name}.webp"
            crop.save(dest, "WEBP", quality=86, method=6)
        else:
            dest = REFS / f"{name}.png"
            crop.save(dest, "PNG", optimize=True)

        print(f"  {raw} -> {dest.relative_to(ROOT)}  ({crop.width}x{crop.height})")
        thumb = crop.copy()
        thumb.thumbnail((300, 300))
        thumbs.append((name, thumb))

    if missing:
        print("\nMissing raw files (put them in assets/raw/ without renaming):")
        for m in sorted(set(missing)):
            print("  ", m)

    if thumbs:
        cols, cell_w, cell_h = 6, 310, 340
        rows = (len(thumbs) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * cell_w, rows * cell_h), (34, 26, 22))
        draw = ImageDraw.Draw(sheet)
        for i, (name, thumb) in enumerate(thumbs):
            x = (i % cols) * cell_w + 5
            y = (i // cols) * cell_h + 5
            sheet.paste(thumb, (x, y))
            draw.text((x, y + 307), name[:42], fill=(239, 226, 211))
        sheet_path = REVIEW / "contact-sheet.jpg"
        sheet.save(sheet_path, quality=85)
        print(f"\nContact sheet: {sheet_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
