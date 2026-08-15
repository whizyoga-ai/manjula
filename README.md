# Manjula Bite & Brew — manjulab.com

A one-room street food shop at 17/A Banerjee Para Street, Uttarpara, Hooghly,
West Bengal 712258. Momo, bread and stew, maggie, eggs, tea and coffee.
Open 9am to 9pm, every day. To order: **Bujuni, +91 91635 38794**.

Built with **Brahmexa**. The assistant is **Nexus**, tenant `manjula`.

Static site. No build step, no dependencies, no framework. Open `index.html`.

## The idea

A street food shop's real interface is the slate on the pavement. So the site
is a slate: chalk on dark for what changes today, printed card for what does
not.

Which produces the one rule the whole thing is built around:

> **The site never claims to know today's specials.**

`assets/data/slate.js` carries a `date`. The page compares it to today in
Kolkata time. If they match, the board is shown as today's. If they do not, the
page says so out loud — *"the board above is not today's, call and ask"* — and
puts the phone number in front of the reader. A restaurant site that quietly
serves last week's specials as though they were today's is lying in a small way
every day. The cost of admitting it is one honest sentence. The cost of
guessing is a customer who walks twenty minutes for a ghugni that ran out on
Tuesday.

## Updating the board

Edit one file, `assets/data/slate.js`:

1. set `date` to today, `YYYY-MM-DD`
2. rewrite `items`
3. commit

That is the entire content management system.

## Two languages, not one translated

Bengali is the default. English is **not** a mirror of it. The two carry
different literary epigraphs on purpose — Tagore, Jibanananda Das and Nazrul on
the Bengali side, Shakespeare and Milton on the English — because a Bengali
reader in Uttarpara and an English reader arriving from a search engine are not
the same person and should not be handed the same borrowed sentence.

Both languages sit in the DOM at once; `html[data-lang]` decides which is in
the flow. The page still reads with JavaScript switched off.

### The name is artwork, not text

`assets/img/wordmark-bn.png` carries **মঞ্জুলা**. Several web fonts mis-shape
the ঞ্জ conjunct — Baloo Da 2 broke it outright, which is why it is not used
here — so the one word the shop cannot afford to have rendered wrongly is an
image, with the word itself in the `alt`. The Bengali display face is Noto
Serif Bengali, which shapes it correctly.

To regenerate the wordmark: set `মঞ্জুলা` in Noto Serif Bengali 700 at 300px in
`#f6f1e6`, screenshot on a transparent ground, trim to the ink, pad 10px.

## Money

There isn't any. The order chit composes a WhatsApp message or dials the shop,
and does nothing else. No cart, no payment intent, no card field, no order that
exists anywhere but in the visitor's tab until a human at the shop answers a
phone. A one-room shop with two owners cannot honour an order placed by a
stranger at 3am, so the software is not allowed to accept one.

## Layout

```
index.html                  the page
assets/css/site.css         one stylesheet
assets/js/site.js           language, open/closed, menu, slate, chit
assets/js/assistant.js      Nexus — POST chat.brahmando.com/api/embed/manjula/stream
assets/data/menu.js         the printed card, as data
assets/data/slate.js        the board  ← the file the shop edits
assets/img/                 photographs, all of this shop, none stock
docs/SOURCES.md             where every fact came from, and what is still open
```

## Deploying

GitHub Pages from the repository root. `CNAME` holds `manjulab.com`;
`.nojekyll` stops Jekyll touching the asset folders.

`manjulab.com` is on Cloudflare. Point the apex and `www` at GitHub Pages and
**leave the `MX` record and the `mail` A record alone** — corporate mailboxes
still run on `mail.manjulab.com` and are unrelated to this site.

## The assistant

Tenant `manjula` in `Brahmando-ai/brahmando-chatbot`
(`orchestrator/config/tenants.yaml`), knowledge pack at `knowledge/manjula/`.
It is bilingual, it knows the menu, the shop, the name and the town — and it
refuses to state today's specials, for the same reason the page does.

Note that tenants created through the admin API do not survive; the tenant must
be in `tenants.yaml` and deployed. Until that deploy lands, the assistant
answers "not enabled for this address yet" rather than hanging.

## Honesty rules that must not be softened

Each of these was a decision, not an oversight:

- no price is estimated — if it is not on the shop's card, the page says so
- no specials are claimed unless the board's date is today
- no `aggregateRating`, no reviews, no star count — the shop is new and has none
- no geo coordinates, because nobody has measured them
- no distance in metres to the school, library or station
- no licence or verification number is published anywhere
- no money is taken, and no card field exists
- Manjula is **not** described as a Vedic goddess — see `docs/SOURCES.md` and
  `knowledge/manjula/04-the-name.md` in the chatbot repo
