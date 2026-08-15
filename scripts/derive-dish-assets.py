# Turn the rendered dish PNGs into the two shapes the site actually loads.
#
# One render per dish, two derived files, and nothing hand-cropped:
#   assets/img/dish/{id}.jpg   96px square  — the menu card thumbnail
#   assets/img/reel/{id}.jpg   900x1200     — the reel still and video poster
#
# The PNGs stay out of the repo. They are 768x1024 lossless masters at roughly
# 1.5MB each, and shipping thirty megabytes of PNG to look at 52px thumbnails
# would be absurd. Rerun this after any rerender; it is idempotent.

import pathlib, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC  = ROOT / "assets/img/dish"
REEL = ROOT / "assets/img/reel"
REEL.mkdir(parents=True, exist_ok=True)

# The thumbnail is served at 52px and at 2x on a phone that is 104px, so 208
# gives a retina screen something to work with and still weighs a few KB.
THUMB = 208


def square(im):
    """Centre square, biased slightly high — the dish sits centre-low in a
    3:4 frame and a dead-centre crop takes counter instead of food."""
    w, h = im.size
    side = min(w, h)
    top = int((h - side) * 0.38) if h > w else 0
    left = (w - side) // 2
    return im.crop((left, top, left + side, top + side))


def main():
    pngs = sorted(SRC.glob("*.png"))
    if not pngs:
        print("no dish renders found")
        return
    for p in pngs:
        im = Image.open(p).convert("RGB")

        t = square(im).resize((THUMB, THUMB), Image.LANCZOS)
        tp = SRC / f"{p.stem}.jpg"
        t.save(tp, quality=84, optimize=True, progressive=True)

        r = im.resize((900, 1200), Image.LANCZOS)
        rp = REEL / f"{p.stem}.jpg"
        r.save(rp, quality=84, optimize=True, progressive=True)

        print(f"  {p.stem:<14} thumb {tp.stat().st_size//1024:>3}KB   "
              f"reel {rp.stat().st_size//1024:>3}KB")
    print(f"\n{len(pngs)} dish(es) derived")


if __name__ == "__main__":
    main()
