# Turn the dish masters into the two shapes the site actually loads.
#
# One master per dish, two derived files, and nothing hand-cropped afterwards:
#   assets/img/dish/{id}.jpg   208px square  — the menu card thumbnail
#   assets/img/reel/{id}.jpg   900x1200      — the reel still and video poster
#
# Masters come from two places and this script does not care which:
#   C:/Customers/Manjula/menu-images/*.jpg   the client's own set, 1024x1024
#   assets/img/dish/*.png                    locally rendered, for the gaps
# The client set wins where both exist. Rerun after any change; idempotent.
#
# TWO OF THE CLIENT IMAGES ARE CROPPED, AND FOR ONE REASON.
# mutton_steam_momo and mutton_fried_momo are both waist-up portraits of a
# smiling woman in a branded apron, in a brick-walled restaurant with string
# lights and a wall sign. None of that is real: the shop is one white-painted
# room, there are no aprons, no brick and no sign, and the face is nobody who
# works there. That last point has been raised twice, and a page that puts a
# stranger's face beside a dish and calls it the kitchen is telling a lie the
# customer can walk in and catch. The crop keeps the food — which is fine —
# and drops the person, the apron and the invented dining room with her.

import io
import pathlib
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "assets/img/dish"
REEL = ROOT / "assets/img/reel"
CLIENT = pathlib.Path(r"C:/Customers/Manjula/menu-images")
REEL.mkdir(parents=True, exist_ok=True)
SRC.mkdir(parents=True, exist_ok=True)

# The thumbnail is served at 52px, 104px on a 2x phone. 208 gives a retina
# screen something to work with and still weighs a handful of kilobytes.
THUMB = 208

# client filename -> the item's id in assets/data/menu.js
CLIENT_MAP = {
    "boiled_egg":         "boiled",
    "bread_chicken_stew": "stew",
    "butter_toast":       "butter",
    "cheese_maggi":       "cheesemag",
    "cheese_omlet":       "cheeseomlet",
    "chicken_fried_momo": "chfried",
    "chicken_steam_momo": "chsteam",
    "egg_cheese_maggi":   "eggcheesemag",
    "egg_maggi":          "eggmag",
    "egg_toast":          "eggtoast",
    "malai_toast":        "malai",
    "mutton_fried_momo":  "mtfried",
    "mutton_steam_momo":  "mtsteam",
    "omlet":              "omlet",
    "plain_maggi":        "plainmag",
    "poach":              "poach",
    # NOT MAPPED, ON PURPOSE:
    #   tea.jpg     — has a plate of jalebi beside the cup. The shop does not
    #                 sell jalebi. Same rule that took the kathi roll and the
    #                 puchka out of the reel: a picture on a menu is read as an
    #                 offer, and there is no footnote small enough to undo it.
    #   coffee.jpg  — byte-for-byte identical to tea.jpg, so it is a cup of tea
    #                 captioned "coffee" as well as having the jalebi.
    # Both use locally rendered masters instead.
}

# Crop boxes as fractions (left, top, right, bottom), applied before anything
# else. Only the two portraits need one.
CROP = {
    # The top edge on mtsteam is set below the apron lettering, not just below
    # the chin — the first attempt cleared the face and left "BITE & BREW /
    # UTTARPARA" printed across an apron nobody at this shop owns.
    "mtsteam": (0.04, 0.655, 0.98, 1.00),
    "mtfried": (0.02, 0.560, 0.98, 0.94),
}


def square(im, bias=0.38):
    """Centre square, biased high — a dish sits centre-low in a tall frame and
    a dead-centre crop takes counter instead of food."""
    w, h = im.size
    side = min(w, h)
    top = int((h - side) * bias) if h > w else 0
    left = (w - side) // 2
    return im.crop((left, top, left + side, top + side))


def portrait(im):
    """Cover-crop to 3:4 for the reel and the video poster."""
    w, h = im.size
    tw, th = 3, 4
    if w / h > tw / th:
        nw = int(h * tw / th)
        return im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    nh = int(w * th / tw)
    top = int((h - nh) * 0.30)
    return im.crop((0, top, w, top + nh))


def masters():
    """id -> (path, origin). The client's own images win where both exist."""
    out = {}
    for p in sorted(SRC.glob("*.png")):
        out[p.stem] = (p, "rendered")
    if CLIENT.is_dir():
        for p in sorted(CLIENT.glob("*.jpg")):
            slug = CLIENT_MAP.get(p.stem)
            if slug:
                out[slug] = (p, "client")
    return out


def main():
    found = masters()
    if not found:
        print("no dish masters found")
        return
    for slug, (path, origin) in sorted(found.items()):
        im = Image.open(path).convert("RGB")
        if slug in CROP:
            w, h = im.size
            l, t, r, b = CROP[slug]
            im = im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))

        tp = SRC / f"{slug}.jpg"
        square(im).resize((THUMB, THUMB), Image.LANCZOS).save(
            tp, quality=84, optimize=True, progressive=True)

        rp = REEL / f"{slug}.jpg"
        portrait(im).resize((900, 1200), Image.LANCZOS).save(
            rp, quality=84, optimize=True, progressive=True)

        flag = " (cropped)" if slug in CROP else ""
        print(f"  {slug:<14} {origin:<9} thumb {tp.stat().st_size // 1024:>3}KB   "
              f"reel {rp.stat().st_size // 1024:>3}KB{flag}")
    print(f"\n{len(found)} dish(es) derived")


if __name__ == "__main__":
    main()
