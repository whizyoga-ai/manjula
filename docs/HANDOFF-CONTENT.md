# Manjula — content & editorial handoff

Written 2026-08-22, at `d0e2932`. Covers the **website's content, copy, imagery
and the Nexus knowledge pack**.

**This is not the deployment document.** Infrastructure, runners, ports,
registries and promotion rules live in `docs/DEPLOYMENT_ARCHITECTURE.md`, with
agent rules in `AGENTS.md` and `CLAUDE.md`. Where this file and those disagree,
they win. Nothing here changes how anything ships.

---

## 1. What the site is

A static site for a one-room street food shop at 17/A Banerjee Para Street,
Uttarpara, Hooghly. No build step: the HTML loads plain `.js` data files and
renders in the browser.

| Page | What it carries |
|---|---|
| `index.html` | hero reel, the slate, the menu, the chit, find us |
| `origins.html` | seven dish stories, covering all twenty menu items |
| `dish.html?d=<slug>` | one story, in depth |
| `uttarpara.html` | the town: **food story first**, then institutional history, then Explore |
| `bulk.html` | ভূরিভোজ — large orders composed into one message |
| `movies.html` | the shop's own photographs |

**Bengali is the default and English is not its translation.** Both sit in the
DOM; `html[data-lang]` decides which is in flow, so the page still reads with
JavaScript off. Edit them as two independent texts — they deliberately do not
track sentence for sentence.

### Where the content actually lives

Almost nothing is in the HTML. The renderers read these:

```
assets/data/menu.js    20 items, prices, and a per-item `desc` for the dish dialog
assets/data/dishes.js  7 origin stories; `covers` maps each to its menu item ids
assets/data/reels.js   30 hero scenes
assets/data/slate.js   the pavement chalkboard
assets/data/food.js    the Uttarpara food story — 8 chapters, 5 people, 4 ideas
assets/data/town.js    the institutional history — timeline, people, schools, Explore
data/uttarpara-culinary-sources.json   sources behind every food claim
```

Renderers: `assets/js/site.js` (index), `pages.js` (origins/dish),
`town.js` (uttarpara), `bulk.js`.

---

## 2. Rules the content follows

These are not style preferences. Each exists because breaking it produced a
concrete failure, and each is written into the file it governs.

**The site never claims to know today's specials.** `slate.js` carries a `date`
compared against today in Kolkata time. It currently has `date: null` — the
board was photographed but nobody recorded when — so the page says so rather
than passing an old board off as today's. *Set a real date and it becomes
today's board.*

**It never shows food the shop does not sell.** A kathi roll, a puchka and a
plate of jalebi were each removed for this. A picture on a menu is read as an
offer; carrying no price is not a defence.

**No strangers in the kitchen.** Two women run the shop. Three supplied images
carried other people's faces — including a man at a griddle — and are cropped
to the food in `scripts/derive-dish-assets.py`, with the reason beside each crop.

**It does not take money.** No cart, no payment intent. An order exists only in
the reader's tab until somebody at the shop answers the phone.

**Nobody's name is on the order line.** "Call the shop", never a person.

### The food story's evidence model

Every entry in `food.js` carries a `type`, and the type is **rendered** as a
small stamp so a reader can see which paragraphs are evidence:

- `documented` — somebody wrote it down; cited
- `local` — **পারিবারিক ও স্থানীয় স্মৃতি / Family and local memory.** Oral
  history, attributed to the person who carries it rather than footnoted.
  Not a weaker category
- `informed` — a reconstruction; the copy hedges out loud
- `interpretive` — our reading, or an idea for a future menu

`confidence` is stored and **never rendered**. It exists so a later editor does
not quietly promote a reconstruction into a fact.

> **The prose scaffolding was deliberately removed.** Six methodological notes
> and a disclaimer under every image made a warm story read like a paper
> defending itself. The rigour moved into `type`, `src` and the sources file.
> Do not put it back into the copy.

---

## 3. Open items

### a. The oral-history category is built and empty — highest value

`type: 'local'` renders, has a stamp, and has an `oralSabarna` entry in the
sources file. **Nothing is filed under it.**

The owner descends from the Sabarna Chowdhury line that settled Uttarpara in
1704 and holds knowledge no archive does. The written sources are worked
through; the oral ones are not. `open_questions` in
`data/uttarpara-culinary-sources.json` lists what to collect: the sweet shops
and their ages, the family's own table, the fish market's reputation, and what
the town knows about the river that never reached print.

**Do not fill it by inference.** A `local` entry needs a person who actually
said the thing.

### b. Bengali chat grammar — a model limitation, not a bug

The Nexus assistant composes Bengali with errors (`পাওয়া না হয়`, `হলেন`).
Content and numbers are right; sentences are not clean. This is
`mistral-local`. Prompt work has not moved it and will not. If Bengali chat
matters commercially it is a model decision, not a fix.

### c. Smaller, known

- **Menu card scans** on the home page predate chicken mutton momo and mutton
  fat ghugni. The captions admit it; replace the scans and drop the captions.
- **Dish clips.** The reel is 30 stills. Adding `vid: true, secs: 4.1` to a
  scene in `reels.js` switches it to `assets/video/reel/<slug>.mp4`.
- **Tags trail `main`.** Last release is `v1.1.0`; content has moved since.
  Next tag should be `v1.2.0`, ideally once the oral history lands.

---

## 4. Traps that have already cost time

**CSS cascade order.** `town.css` loads after `site.css` and ties on
specificity. A correction written in `site.css` for a `.twn-*` or `.fd-*`
selector is silently overruled. *This has cost time three times.* Write the fix
in the file that already owns the rule.

**Bengali line height.** Bengali carries a matra above and descenders below.
1.3 clips both. Everything is 1.6+, numerals 1.72.

**Bengali numerals.** Hind Siliguri draws ১ without its ascending stroke, so the
digit block `U+09E6–09EF` is pinned to Noto Sans Bengali by `unicode-range`.
Do not remove that `@font-face`.

**Never `tabular-nums` on Bengali digits.** `tnum` is a Latin feature; Bengali
digit sets lack it and the browser falls back per glyph, which is what made one
numeral in a run render in a different face. Switched off for Bengali.

**The chandrabindu is `NBSP + U+0981`.** The bare combining mark renders as a
dotted-circle placeholder in every font here. It marks the dead — people, never
institutions named after them, and never মঞ্জু or জাহ্নবী, whose dates are
unknown.

**Names.** মুখোপাধ্যায় / Mukhopadhyay, never Mukherjee — except in Wikipedia
citation titles and the email address, which are those things' real names.

**Bengali that is English in disguise.** Caught three times — দামের সিঁড়ি, the
library's টিকিট, বড় অর্ডার. The tell is writing the English first. **Write the
Bengali first.**

**Verifying in a hidden browser pane** returns zeros for every measurement —
`window.innerWidth` is 0 and every percentage width collapses. Force a viewport
before believing a layout measurement. This produced one false "everything
overflows" report and one false "the dialog is broken".

---

## 5. The assistant

Tenant `manjula` in `Brahmando-ai/brahmando-chatbot`; knowledge in
`knowledge/manjula/`, config in `orchestrator/config/tenants.yaml`.

- **The ingest appends and never removes.** A changed fact leaves both versions
  retrievable. The only clean slate without admin credentials is renaming the
  collection — currently `manjula_kb_v7`, renamed seven times for that reason.
- **Re-ingest:** `POST https://chat.brahmando.com/ingest/manjula` needs both an
  `X-API-Key` header **and** a browser `User-Agent` — Cloudflare answers a
  UA-less request with 403 error 1010 before it reaches nginx.
- **Rules belong in the system prompt, never in knowledge files.** A retrieved
  chunk is shown to the model as a fact about the shop; a sentence beginning
  "do not say" gets recited to customers verbatim. This happened.
- **No historical prices anywhere in the pack.** One that was true on opening
  day got quoted at a customer as current.
- **Stop sequences** were added to the shared `litellm_client.py` — without
  them the model wrote both halves of the conversation.
- **Test by asking the live bot**, not by reading the pack. Every real failure
  here was found that way and none would have shown up any other way.

---

## 6. Where things are

```
C:/whizyoga/repos/Manjula              the site
C:/whizyoga/repos/brahmando-chatbot    the assistant
C:/Customers/Manjula                   client-supplied source material
```

Local image generation runs on this machine's RTX 5090 — Qwen-Image-Edit-2511
GGUF for stills (~4 min each), CogVideoX-5b-I2V for clips (~12 min each).
**Never background a GPU job with `&`;** a detached duplicate once ran
alongside a tracked one and 80 minutes produced nothing.
