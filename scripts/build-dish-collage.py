# The collage that closes the food story.
#
# BUILT FROM THE REAL DISH PICTURES, NOT GENERATED. Every other image in that
# section is a reconstruction of a past nobody photographed, and each says so.
# This one is the present, and the present does not need imagining: there are
# twenty dishes on the card and twenty pictures of them already in the repo.
# A generated "collage of Manjula dishes" would have invented food the shop
# does not sell in order to illustrate the food it does.
#
# Twenty tiles for twenty dishes. No repeats, no filler.

import io
import pathlib
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "assets/img/reel"
OUT = ROOT / "assets/img/food/manjula-collage.jpg"

# Order matters: this is read left to right, so it runs the card in menu order
# rather than alphabetically. Momo first, because that is what the shop is for.
ORDER = [
    "chsteam", "chfried", "mtsteam", "mtfried", "chmtmomo",
    "stew", "malai", "butter", "eggtoast", "charbighugni",
    "boiled", "poach", "omlet", "cheeseomlet", "tea",
    "plainmag", "eggmag", "cheesemag", "eggcheesemag", "coffee",
]

COLS, ROWS = 5, 4
TILE_W, TILE_H = 232, 194          # 1160 x 776, near enough 3:2
GAP = 3
BG = (251, 247, 238)               # --paper, so the seams read as the page


def tile(path, w, h):
    im = Image.open(path).convert("RGB")
    iw, ih = im.size
    if iw / ih > w / h:                      # cover-crop
        nw = int(ih * w / h)
        im = im.crop(((iw - nw) // 2, 0, (iw - nw) // 2 + nw, ih))
    else:
        nh = int(iw * h / w)
        top = int((ih - nh) * 0.42)          # bias high; the food sits centre-low
        im = im.crop((0, top, iw, top + nh))
    return im.resize((w, h), Image.LANCZOS)


def main():
    missing = [s for s in ORDER if not (SRC / f"{s}.jpg").exists()]
    if missing:
        print("missing dish stills:", ", ".join(missing))
        return
    W = COLS * TILE_W + (COLS + 1) * GAP
    H = ROWS * TILE_H + (ROWS + 1) * GAP
    sheet = Image.new("RGB", (W, H), BG)
    for i, slug in enumerate(ORDER):
        c, r = i % COLS, i // COLS
        x = GAP + c * (TILE_W + GAP)
        y = GAP + r * (TILE_H + GAP)
        sheet.paste(tile(SRC / f"{slug}.jpg", TILE_W, TILE_H), (x, y))
    sheet.save(OUT, quality=86, optimize=True, progressive=True)
    print(f"  {len(ORDER)} dishes -> {OUT.name}  {W}x{H}  {OUT.stat().st_size // 1024}KB")


if __name__ == "__main__":
    main()
