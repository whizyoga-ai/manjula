# Scene briefs for the reel

Twelve scenes run in the phone on the home page. Five are real footage of the
shop. Seven are AI stills whose faces are not the sisters, and these are the
briefs to replace them with.

## Why these are briefs and not finished images

I cannot generate them here. There is an RTX 5090 on this machine and a
bake-off harness at `Brahmando/tools/image-bakeoff`, but it runs **SDXL** and
**Qwen-Image-Edit** — a text-to-image model and an editing model. Neither does
identity transfer: given a photograph of one of them, neither will put *that face* in
a new scene. That needs a face-conditioned pipeline (IP-Adapter FaceID,
InstantID, PuLID or equivalent), which is not in the harness.

Antigravity is already producing this and is the right tool. These briefs are
written for it.

## The two faces

Neither is named here or anywhere on the site — the family asked for the
proprietor's name to come off, so these briefs use A and B and the reference
photographs carry the identification.

| Who | Reference | Description |
|---|---|---|
| **Sister A** — the one on the licence | `menu idea/black.jpg` | Long dark wavy hair, black saree, bindi. Also in `black2.jpg`, `glam.jpg`, `4.jpg`. |
| **Sister B** | `menu idea/we are the champion.jpg` — **left**, in glasses | Rectangular dark-framed glasses, hair back, rounder face. Sister A is on the right in that frame. |

`we are the champion.jpg` is the one image with **both of them together** and is
the reference to match a two-person scene against.

## The place, which every scene has to sit in

Not a brick-walled café. Not a commercial kitchen with a line. Compare against
`assets/video/counter.mp4` and `assets/video/signs.mp4` — that is the shop:

- one small room, **white painted walls**, no exposed brick
- **hand-lettered paper signs hung from the ceiling** on string, Bengali above
  English — মাখন পাউরুটি / BUTTER TOAST, স্টু পাউরুটি / BREAD & STEW
- a string of small **fairy lights** along the wall
- white **wire and melamine shelving**, glass jars of biscuits
- a two-tier **steel momo steamer** on a white table
- a green **Atlantis brew machine** for tea and coffee
- an inverted-bottle **water dispenser**
- three small framed devotional pictures, high on the wall
- outside: a pavement, **purple plastic stools** used as tables, a chalk slate
- **no branded aprons.** Nobody in the real footage is wearing one.

## The scenes

Each replaces the file named. Vertical 9:16, and it will be cropped to
720×1280, so keep the subject central and out of the bottom fifth — a caption
sits there.

| Replaces | Scene |
|---|---|
| `momo-steam.jpg` | **Sister A lifting the lid off the steel momo steamer**, steam rising into the fairy lights, momos visible in the tier. Her hands on the lid, face lit by the steam. |
| `maggi.jpg` | **Sister A at the pan**, maggi coming off the heat into a bowl, egg and cheese going in. Small gas ring, white table, not a restaurant range. |
| `toast.jpg` | **Sister A at the tawa**, malai toast, a knife spreading, the buttered side catching the light. |
| `chai.jpg` | **Sister B pouring tea** from the Atlantis machine into a glass, the shop's shelves behind her. |
| `wok-fire.jpg` | Replace the flaming street wok. **Sister B at the counter taking an order** — one hand on a notebook or phone, a customer's hand offering a note across the counter. |
| `roll.jpg` | Replace the griddle. **Both sisters in the vegetable market**, early, choosing produce — onions, chillies, coriander — a jute bag between them. |
| `puchka.jpg` | Replace the street shot. **Sister B serving at the pavement stools**, handing a paper plate of momos down to someone sitting on a purple stool, the shop lit behind. |

## More scenes worth having

- **Opening up.** Sister A raising the green shutter at first light, the slate
  under her arm, street still quiet.
- **Chalking the slate.** Sister B writing the day's specials on the
  blackboard, chalk in hand, half the board still blank.
- **The school rush.** Uniformed students crowding the counter after the last
  bell, both sisters working.
- **Folding momos.** Four hands at a steel tray, a row of finished pleats.
- **Closing.** The counter wiped down, one light still on, stools stacked.
- **A tea handed over.** Just the exchange — a glass passed from her hand to a
  customer's, nothing else in frame.

## Rules that hold for every one of them

1. **The faces must be theirs.** That is the whole reason these are being
   regenerated.
2. **No branded aprons, no shopfront sign that is not the real one.** The
   current set invented both.
3. **Never a dish the shop does not sell.** The card is momo, toast, eggs,
   maggi, tea, coffee. No rolls, no puchka, no cocktails.
4. **No text baked into the image.** Captions are HTML and bilingual; text
   inside the picture cannot switch language and cannot be read by a screen
   reader.
5. Deliver as **9:16, at least 720×1280**, named exactly as in the table.
   `assets/data/reels.js` needs no edit if the filenames match.
