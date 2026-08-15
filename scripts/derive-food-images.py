# Turn the rendered era scenes into the jpgs the page loads.
#
# The masters are 1152x768 PNGs from scripts run against Qwen-Image-Edit with
# one of the shop's or the town's real photographs as the reference. The
# reference is what gives them the real river and the real light — and it is
# also why some of them need a crop.
#
# THE 1704 CROP IS NOT COSMETIC. The reference for it is a present-day
# photograph of an Uttarpara ghat with people on the steps, and some of them
# came through into the render wearing t-shirts, with plastic bags beside
# them. In a scene captioned 1704 that is not a stylistic wobble, it is a
# false statement about the past sitting inside a picture the page has just
# told the reader to trust. The crop takes the modern foreground off and keeps
# the boats, the thatch, the nets and the mist, which is the part that was
# asked for.

import io
import pathlib
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "assets/img/food"

# slug -> crop as fractions (left, top, right, bottom), applied before resize
CROP = {
    # lose the modern figures and litter along the bottom edge
    "1704-river": (0.00, 0.00, 1.00, 0.63),
}

# The page lays these out at up to ~620px on desktop and full width on a
# phone. 1400 wide covers a 2x phone and leaves headroom.
WIDE = 1400


def main():
    pngs = sorted(SRC.glob("*.png"))
    if not pngs:
        print("no era renders found")
        return
    for p in pngs:
        im = Image.open(p).convert("RGB")
        if p.stem in CROP:
            w, h = im.size
            l, t, r, b = CROP[p.stem]
            im = im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))
        if im.width > WIDE:
            im = im.resize((WIDE, round(im.height * WIDE / im.width)), Image.LANCZOS)
        out = SRC / f"{p.stem}.jpg"
        im.save(out, quality=84, optimize=True, progressive=True)
        flag = "  (cropped)" if p.stem in CROP else ""
        print(f"  {p.stem:<16} {im.width}x{im.height}  {out.stat().st_size // 1024:>3}KB{flag}")
    print(f"\n{len(pngs)} era image(s) derived")


if __name__ == "__main__":
    main()
