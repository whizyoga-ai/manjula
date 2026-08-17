# Claude Code Prompt — Uttarpara Bengali literary rewrite

You are working in repository:

`whizyoga-ai/manjula`

Primary page:

`/uttarpara.html`

Primary Bengali editorial master:

`/docs/uttarpara-bengali-literary-rewrite.md`

Food timeline data:

`/assets/data/food.js`

Historical/culinary sources already maintained in the repository must remain authoritative. Do not replace or weaken the existing fact-vs-reconstruction discipline.

## Objective

Rewrite the Bengali experience of `uttarpara.html` using the editorial master in `docs/uttarpara-bengali-literary-rewrite.md`.

The current Bengali is often grammatically correct but sounds like English thought translated into Bengali. Fix that completely. The Bengali page should feel originally conceived by an exceptional Bengali essayist: elegant, lucid, restrained, historically conscious, rooted in river, soil, food, memory and Uttarpara. It must not sound like marketing copy, machine translation, schoolbook Bengali, or over-decorated pseudo-literature.

The English version is NOT the source for the Bengali. Treat Bengali as an independently authored language layer.

## Non-negotiable historical rule

Preserve the repository's evidence taxonomy and existing source integrity:

- `documented` = directly sourced fact
- `local` = attributed local/oral history
- `informed` = historically informed reconstruction; must be hedged explicitly
- `interpretive` = interpretation or present-day editorial connection

Never turn an `informed`, `local`, or `interpretive` statement into an unqualified historical fact.

Never invent:

- a dish as having originated in Uttarpara without evidence
- a historical person's favorite food
- a Portuguese ship docking specifically at Uttarpara
- a named old sweet shop without a verifiable source
- agricultural history for Uttarpara that the evidence does not support

Where we do not know, use beautiful but explicit uncertainty: “সম্ভবত”, “অনুমান করা যায়”, “একটি সম্ভাব্য পুনর্গঠন”, “নিশ্চিত করে বলার উপায় নেই।”

## Literary voice

Use the master copy as the primary Bengali voice. Preserve and tastefully render these short literary references where contextually appropriate:

- রবীন্দ্রনাথ ঠাকুর: “বাংলার মাটি, বাংলার জল…”
- ভারতচন্দ্র রায়গুণাকর, `অন্নদামঙ্গল`: “আমার সন্তান যেন থাকে দুধে ভাতে।”
- জীবনানন্দ দাশ: “বাংলার মুখ আমি দেখিয়াছি…”

Do not paste long poems or literary passages. These are brief resonant anchors, not decoration.

## Required implementation

1. Read the FULL current `uttarpara.html`, `assets/data/food.js`, relevant `assets/data/town.js`, source JSON files, and `docs/uttarpara-bengali-literary-rewrite.md` before editing.

2. Replace weak/static Bengali copy in `uttarpara.html` with the corresponding master copy, including:
   - hero
   - food-story introduction
   - 30-second summary
   - institutional timeline intro
   - library section
   - Uttarpara Speech section
   - Jaykrishna Mukhopadhyay section
   - people/visitors section intro
   - soil/food interlude where appropriate
   - Manjula connection / closing
   - microcopy and headings

3. Rewrite the Bengali fields in `assets/data/food.js` to match the literary quality and historical caution in the master copy. Keep IDs, image references, source keys, evidence types, confidence metadata, rendering structure and English fields intact unless a small structural adjustment is necessary for correct rendering.

4. For every food era, place the period image adjacent to its period text on desktop, and sensibly stacked on mobile. Do not replace the existing images unless an asset is missing or broken.

5. Keep the full-page overall culinary journey image, if already present, as a secondary visual BELOW the era-by-era journey rather than using it instead of individual era imagery.

6. Add a subtle visible legend explaining the difference between documented history and reconstruction in Bengali. It must not feel like a legal disclaimer.

7. Improve Bengali typography:
   - keep/use `Noto Serif Bengali` / `Tiro Bangla` where the existing design allows
   - comfortable Bengali line-height
   - avoid overly narrow text columns
   - do not italicize Bengali body text merely to mimic English editorial styling
   - ensure Bengali numerals remain consistent in Bengali view

8. Fix obvious Bengali text corruption/encoding artifacts such as stray characters (for example the visible `ঁ`-style corruption before names) anywhere on the page.

9. Preserve the BN/EN toggle and ensure BOTH languages still render correctly after changes.

10. Preserve SEO metadata, schema, citations, links and source references. Update Bengali title/description metadata only if needed to match the improved page copy; do not reduce keyword usefulness.

## Tone tests

Before committing, reject any Bengali sentence that sounds like one of these:

- a literal translation from English
- a tourism-board brochure
- an advertisement for Manjula
- an encyclopedia translated by software
- exaggerated nostalgia unsupported by evidence

Prefer sentences that feel natural when read aloud by an educated native Bengali speaker.

Examples of direction:

BAD: `যে ক্রমে শহরটা তৈরি হল`
GOOD: `একটি শহর নিজেকে কীভাবে গড়ে তুলেছিল`

BAD: `যে বাড়িতে বই সবার`
GOOD: `যে দরজা দিয়ে বই ব্যক্তিগত সম্পত্তি থেকে জনসম্পদ হল`

BAD: `খাদ্যের যাত্রা`
BETTER depending on context: `স্বাদের ইতিহাস`, `খাদ্যের পথচলা`, `হেঁশেলের ইতিহাস`

## QA

After implementation:

- open/render `uttarpara.html`
- test Bengali and English toggles
- test desktop and mobile breakpoints
- inspect every era image and caption
- verify no Bengali text overflow
- verify no broken Unicode/encoding
- verify anchors/navigation still work, especially `#food`
- verify source/citation UI still works
- confirm no unsupported historical assertion was introduced
- compare every factual change against existing repository source data

## Git

Make the change directly in the current working branch, run the relevant static/site checks available in the repo, and commit with a clear message such as:

`Rewrite Uttarpara Bengali as literary native prose`

In the final response, summarize:

- files changed
- major Bengali sections rewritten
- any historical claims you deliberately kept hedged
- QA performed
