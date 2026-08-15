/* ==========================================================================
   UTTARPARA — the page's behaviour.

   Four jobs:
     1. render the timeline, the people, the institutions and the places from
        assets/data/town.js, in whichever language is on
     2. reveal them as they arrive, and not at all if the reader has asked for
        reduced motion
     3. run the Explore tabs, loading exactly one resource at a time
     4. degrade to a native panel the moment an embed does not work, without
        ever showing a blank rectangle or a browser error

   WHAT THIS FILE WILL NOT DO. It does not proxy anybody, strip anybody's
   headers, or reach into a framed document. If a site declines to be embedded
   the decline is honoured and the fallback renders. The only reason the
   fallback ever needs to fire is that a third party changed their mind, which
   they are entitled to do.
   ========================================================================== */

'use strict';

(function () {

  const lang = () => (document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'bn');
  const isBn = () => lang() === 'bn';
  const el = (tag, cls, txt) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };
  /* The data carries a little inline markup (<i>, <strong>) and nothing else.
     It is authored in this repo, not fetched, so innerHTML here is our own
     text — but anything that arrives over the network below goes in with
     textContent, never this. */
  const html = (tag, cls, markup) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (markup != null) n.innerHTML = markup;
    return n;
  };

  const src = (key) => (typeof TOWN_SOURCES !== 'undefined' ? TOWN_SOURCES[key] : null);

  function sourceTag(key) {
    const s = src(key);
    if (!s) return null;
    const a = el('a', 'twn-cite');
    a.href = s.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = isBn() ? 'সূত্র' : 'source';
    a.title = s.label[lang()];
    return a;
  }

  /* ---------- timeline ---------------------------------------------------- */

  function renderTimeline() {
    const ol = document.getElementById('townTimeline');
    if (!ol || typeof TOWN_TIMELINE === 'undefined') return;
    ol.innerHTML = '';
    TOWN_TIMELINE.forEach((t) => {
      const li = el('li', 'twn-line__item' + (t.big ? ' is-big' : '') + (t.mark ? ' is-mark' : ''));
      li.append(el('span', 'twn-line__dot'));
      const yr = el('p', 'twn-line__yr', isBn() ? t.year : t.yearEn);
      const body = el('div', 'twn-line__body');
      body.append(el('h3', null, t[lang()].t));
      body.append(html('p', null, t[lang()].d));
      const cite = sourceTag(t.src);
      if (cite) body.append(cite);
      li.append(yr, body);
      ol.append(li);
    });
    arm(ol.querySelectorAll('.twn-line__item'));
  }

  /* ---------- people ------------------------------------------------------ */

  const KIND = {
    town:    { bn: 'এখানকার',      en: 'of the town' },
    stayed:  { bn: 'থেকেছেন',      en: 'stayed here' },
    visitor: { bn: 'এসেছেন',       en: 'visited' },
  };

  function renderPeople() {
    const ul = document.getElementById('townPeople');
    if (!ul || typeof TOWN_PEOPLE === 'undefined') return;
    ul.innerHTML = '';
    TOWN_PEOPLE.forEach((p) => {
      const li = el('li', 'twn-ppl__item twn-ppl__item--' + p.kind);
      const head = el('div', 'twn-ppl__head');
      head.append(el('h3', null, p[lang()].n));
      head.append(el('span', 'twn-ppl__kind', KIND[p.kind][lang()]));
      li.append(head);
      if (p.years && p.years !== '—') li.append(el('p', 'twn-ppl__yr', p.years));
      li.append(el('p', 'twn-ppl__role', p[lang()].r));
      const cite = sourceTag(p.src);
      if (cite) li.append(cite);
      ul.append(li);
    });
    arm(ul.querySelectorAll('.twn-ppl__item'));
  }

  /* ---------- institutions ------------------------------------------------ */

  function renderLearning() {
    const box = document.getElementById('townLearning');
    if (!box || typeof TOWN_LEARNING === 'undefined') return;
    box.innerHTML = '';
    TOWN_LEARNING.forEach((c) => {
      const card = el('article', 'twn-card' + (c.lead ? ' is-lead' : ''));
      if (c.photo) {
        const img = el('img', 'twn-card__pic');
        img.src = `assets/img/town/${c.photo}.jpg`;
        img.loading = 'lazy'; img.decoding = 'async'; img.alt = '';
        card.append(img);
      }
      card.append(el('p', 'twn-card__yr', isBn() ? c.yearBn : c.year));
      card.append(el('h3', null, c[lang()].n));
      card.append(el('p', 'twn-card__d', c[lang()].d));
      const cite = sourceTag(c.src);
      if (cite) card.append(cite);
      box.append(card);
    });
    arm(box.querySelectorAll('.twn-card'));
  }

  /* ---------- places ------------------------------------------------------ */

  function renderPlaces() {
    const box = document.getElementById('townPlaces');
    if (!box || typeof TOWN_PLACES === 'undefined') return;
    box.innerHTML = '';
    TOWN_PLACES.forEach((p) => {
      const fig = el('figure', 'twn-place');
      const img = el('img');
      img.src = `assets/img/town/${p.photo}.jpg`;
      img.loading = 'lazy'; img.decoding = 'async';
      img.alt = p[lang()].n;
      const cap = el('figcaption');
      cap.append(el('b', null, p[lang()].n));
      cap.append(el('span', null, p[lang()].d));
      fig.append(img, cap);
      box.append(fig);
    });
    arm(box.querySelectorAll('.twn-place'));
  }


  /* ---------- the food story ----------------------------------------------- */

  /* Chapters, people and ideas out of assets/data/food.js.
     THE `type` FIELD IS RENDERED, NOT DECORATION. A chapter that is a
     reconstruction says so on its face — the reader should be able to see
     which paragraphs are evidence and which are a reading, without having to
     take our word for the difference. `confidence` is never rendered; it is a
     note to whoever edits the data next. */

  const FD_TYPE = {
    documented:   { bn: 'নথিভুক্ত',        en: 'Documented' },
    local:        { bn: 'পারিবারিক ও স্থানীয় স্মৃতি', en: 'Family and local memory' },
    informed:     { bn: 'ঐতিহাসিক অনুমান', en: 'Historically informed' },
    interpretive: { bn: 'আমাদের পাঠ',      en: 'Our reading' },
    unknown:      { bn: 'জানা নেই',        en: 'Not known' },
  };

  function fdStamp(kind, extra) {
    const t = FD_TYPE[kind];
    if (!t) return null;
    const s = el('span', 'fd__stamp fd__stamp--' + kind, (extra || t)[lang()] || t[lang()]);
    return s;
  }

  function fdSources(keys) {
    if (!keys || !keys.length) return null;
    const p = el('p', 'fd__src');
    p.append(document.createTextNode(isBn() ? 'সূত্র: ' : 'Source: '));
    keys.forEach((k, i) => {
      const s = src(k);
      if (!s) return;
      if (i) p.append(document.createTextNode(' · '));
      const a = el('a', null, s.label[lang()]);
      a.href = s.url; a.target = '_blank'; a.rel = 'noopener';
      p.append(a);
    });
    return p;
  }

  function renderFoodChapters() {
    const ol = document.getElementById('foodChapters');
    if (!ol || typeof FOOD_CHAPTERS === 'undefined') return;
    ol.innerHTML = '';
    /* All of it in one run, ending on 2026. The last chapter was briefly
       rendered down at the foot of the page, on the reasoning that finishing
       at the shop and then restarting at 1704 was a bounce. It reads better
       as written: a chapter that is explicitly about what happens next is a
       hand-off rather than an ending, and the history below it becomes the
       answer to how the town got here. */
    FOOD_CHAPTERS.forEach((c, i) => {
      const li = el('li', 'fd__ch' + (i % 2 ? ' is-flip' : '') + (c.img ? '' : ' is-textonly'));

      if (c.img) {
        const fig = el('figure', 'fd__fig');
        const img = el('img');
        img.src = `assets/img/food/${c.img}.jpg`;
        img.width = 1152; img.height = 768;
        img.loading = i === 0 ? 'eager' : 'lazy';
        img.decoding = 'async';
        img.alt = c[lang()] ? '' : '';
        img.addEventListener('error', () => fig.remove());
        fig.append(img);
        /* Every image says what it is, and the two disclosures are not
           interchangeable. A scene set in 1704 or 1859 is a reconstruction of
           a past nobody photographed. The present-day ones are made pictures
           of a present that could have been photographed and was not — which
           is a different admission, and the one the dish pages already make.
           Captioning today's counter as a "historical reconstruction" would
           be its own small untruth. */
        const past = c.type === 'informed';   // 'local' is testimony, not reconstruction
        fig.append(el('figcaption', null, past
          ? (isBn() ? 'কল্পনানির্ভর পুনর্নির্মাণ — সমসাময়িক ছবি নয়।'
                    : 'Artistic reconstruction — not a contemporary picture.')
          : (isBn() ? 'বানানো ছবি, ক্যামেরায় তোলা নয়।'
                    : 'A made picture, not a photograph.')));
        li.append(fig);
      }

      const box = el('div', 'fd__txt');
      const head = el('div', 'fd__head');
      head.append(el('p', 'fd__era', c.era[lang()]));
      const st = fdStamp(c.type);
      if (st) head.append(st);
      box.append(head);
      box.append(el('h3', null, c.ttl[lang()]));
      box.append(el('p', 'fd__lede', c.lede[lang()]));
      if (c.body) box.append(el('p', null, c.body[lang()]));

      if (c.plate) {
        const pl = el('div', 'fd__plate');
        pl.append(el('p', 'fd__plate__lbl', c.plate.label[lang()]));
        const ul = el('ul');
        c.plate.items[lang()].forEach((it) => ul.append(el('li', null, it)));
        pl.append(ul);
        box.append(pl);
      }
      if (c.note) box.append(el('p', 'fd__note', c.note[lang()]));
      if (c.kicker) box.append(el('p', 'fd__kick', c.kicker[lang()]));
      const sr = fdSources(c.src);
      if (sr) box.append(sr);

      li.append(box);
      ol.append(li);
    });
    arm(document.querySelectorAll('.fd__ch'));
  }

  function renderFoodPeople() {
    const box = document.getElementById('foodPeople');
    if (!box || typeof FOOD_PEOPLE === 'undefined') return;
    box.innerHTML = '';
    FOOD_PEOPLE.forEach((p) => {
      const card = el('article', 'fd-card');
      const head = el('div', 'fd-card__head');
      head.append(el('h3', null, p.name[lang()]));
      const st = fdStamp(p.stamp.kind, p.stamp);
      if (st) head.append(st);
      card.append(head);
      if (p.years) card.append(el('p', 'fd-card__yr', p.years));
      card.append(el('p', null, p.body[lang()]));
      if (p.kicker) card.append(el('p', 'fd__kick', p.kicker[lang()]));
      const sr = fdSources(p.src);
      if (sr) card.append(sr);
      box.append(card);
    });
    arm(box.querySelectorAll('.fd-card'));
  }

  function renderFoodIdeas() {
    const box = document.getElementById('foodIdeas');
    if (!box || typeof FOOD_IDEAS === 'undefined') return;
    box.innerHTML = '';
    FOOD_IDEAS.forEach((it) => {
      const card = el('article', 'fd-idea');
      card.append(el('p', 'fd-idea__from', it.from));
      card.append(el('h3', null, it[lang()].n));
      card.append(el('p', null, it[lang()].d));
      box.append(card);
    });
    arm(box.querySelectorAll('.fd-idea'));
  }

  /* ---------- sources and picture credits --------------------------------- */

  function renderSources() {
    const ul = document.getElementById('townSources');
    if (ul && typeof TOWN_SOURCES !== 'undefined') {
      ul.innerHTML = '';
      Object.values(TOWN_SOURCES).forEach((s) => {
        const li = el('li');
        const a = el('a', null, s.label[lang()]);
        a.href = s.url; a.target = '_blank'; a.rel = 'noopener';
        li.append(a);
        ul.append(li);
      });
    }
    const p = document.getElementById('townCredits');
    if (p && typeof TOWN_CREDITS !== 'undefined') {
      p.innerHTML = '';
      p.append(document.createTextNode(isBn()
        ? 'ছবি উইকিমিডিয়া কমন্স থেকে, লাইসেন্স মেনে, মাপ বদলে নেওয়া হয়েছে — '
        : 'Photographs from Wikimedia Commons, reused under the licence shown and resized — '));
      TOWN_CREDITS.forEach((c, i) => {
        if (i) p.append(document.createTextNode(' · '));
        const a = el('a', null, `${c.title} (${c.by}, ${c.lic})`);
        a.href = c.page; a.target = '_blank'; a.rel = 'noopener';
        p.append(a);
      });
      p.append(document.createTextNode('.'));
    }
  }

  /* ---------- reveal on scroll -------------------------------------------- */

  /* Reduced motion is not a lesser experience here: without the observer the
     elements simply start visible, which is what `.twn-rev` is without
     `is-in` when the class is never applied. So the guard is one line and
     everything below it is decoration. */
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let obs = null;

  function arm(nodes) {
    if (!nodes || !nodes.length) return;
    if (REDUCED || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-in'));
      return;
    }
    if (!obs) {
      obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          obs.unobserve(e.target);          // reveal once; this is not a toggle
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }
    nodes.forEach((n) => { n.classList.add('twn-rev'); obs.observe(n); });
  }

  /* ---------- Explore: tabs ----------------------------------------------- */

  let tabAt = 0;
  const loaded = new Set();          // panels already built; never rebuilt

  function buildTabs() {
    const strip = document.getElementById('townTabs');
    const panels = document.getElementById('townPanels');
    if (!strip || !panels || typeof TOWN_RESOURCES === 'undefined') return;
    strip.innerHTML = ''; panels.innerHTML = '';

    TOWN_RESOURCES.forEach((r, i) => {
      const b = el('button', 'twn-tab');
      b.type = 'button';
      b.id = `twn-tab-${r.id}`;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-controls', `twn-panel-${r.id}`);
      b.setAttribute('aria-selected', 'false');
      b.tabIndex = -1;
      b.textContent = r.tab[lang()];
      b.addEventListener('click', () => select(i, true));
      strip.append(b);

      const p = el('section', 'twn-panel');
      p.id = `twn-panel-${r.id}`;
      p.setAttribute('role', 'tabpanel');
      p.setAttribute('aria-labelledby', `twn-tab-${r.id}`);
      p.hidden = true;
      panels.append(p);
    });

    /* Arrow keys move between tabs, Home/End jump to the ends. This is the
       WAI-ARIA tabs pattern and it is the difference between a tab strip and
       six buttons that happen to sit in a row. */
    strip.addEventListener('keydown', (e) => {
      const n = TOWN_RESOURCES.length;
      let next = null;
      if (e.key === 'ArrowRight') next = (tabAt + 1) % n;
      else if (e.key === 'ArrowLeft') next = (tabAt - 1 + n) % n;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = n - 1;
      if (next === null) return;
      e.preventDefault();
      select(next, true);
      strip.children[next].focus();
    });

    // #explore-wikipedia in the address bar opens on that tab.
    const want = (location.hash.match(/^#explore-(.+)$/) || [])[1];
    const at = want ? TOWN_RESOURCES.findIndex((r) => r.id === want) : -1;
    select(at >= 0 ? at : 0, false);
  }

  function select(i, push) {
    const strip = document.getElementById('townTabs');
    const panels = document.getElementById('townPanels');
    if (!strip || !panels) return;
    tabAt = i;

    [...strip.children].forEach((b, k) => {
      const on = k === i;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      // scrollLeft on the strip, NOT scrollIntoView on the button.
      // scrollIntoView scrolls every scrollable ancestor including the page,
      // so opening this page dumped the reader two-thirds of the way down it,
      // at the Explore section, before they had read a word. Moving the
      // strip's own scrollLeft cannot move the page.
      if (on && push) {
        const l = b.offsetLeft, r = l + b.offsetWidth;
        if (l < strip.scrollLeft) strip.scrollLeft = l - 12;
        else if (r > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = r - strip.clientWidth + 12;
      }
    });
    [...panels.children].forEach((p, k) => { p.hidden = k !== i; });

    const r = TOWN_RESOURCES[i];
    if (!loaded.has(r.id)) { loaded.add(r.id); fill(panels.children[i], r); }

    if (push) {
      // replaceState, not pushState: flicking through six tabs should not
      // bury the back button under six history entries.
      history.replaceState(null, '', `#explore-${r.id}`);
    }
  }

  /* ---------- Explore: a panel -------------------------------------------- */

  function openOriginal(r) {
    const a = el('a', 'twn-open');
    a.href = r.url; a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = '';
    a.append(document.createTextNode(isBn() ? 'মূল সাইটে দেখুন' : 'Open original'));
    const arrow = el('span', null, '↗');
    arrow.setAttribute('aria-hidden', 'true');
    a.append(' ', arrow);
    // Screen readers should be told the link leaves the site; sighted readers
    // have the arrow.
    const sr = el('span', 'sr-only', isBn() ? ' (নতুন ট্যাবে খোলে)' : ' (opens in a new tab)');
    a.append(sr);
    return a;
  }

  function head(r) {
    const h = el('div', 'twn-panel__head');
    const t = el('div');
    t.append(el('h3', null, r[lang()].title));
    t.append(el('p', null, r[lang()].blurb));
    h.append(t, openOriginal(r));
    return h;
  }

  function attribution(r) {
    const p = el('p', 'twn-attr');
    p.textContent = (isBn() ? 'সূত্র: ' : 'Source: ') + r.attribution[lang()];
    return p;
  }

  function factList(r) {
    if (!r.facts) return null;
    const dl = el('dl', 'twn-panel__facts');
    r.facts.forEach((f) => {
      const [k, v] = f[lang()];
      dl.append(el('dt', null, k), el('dd', null, v));
    });
    return dl;
  }

  function fill(panel, r) {
    panel.innerHTML = '';
    panel.append(head(r));
    if (r.embed === 'iframe') return fillIframe(panel, r);
    if (r.embed === 'api')    return fillWiki(panel, r);
    return fillNative(panel, r);
  }

  /* A native panel is not an apology. It is the default presentation for
     anything we are not embedding, and it should read as though it were
     always the plan — because for three of the five resources, it was. */
  function fillNative(panel, r) {
    const box = el('div', 'twn-native');
    const facts = factList(r);
    if (facts) box.append(facts);
    box.append(attribution(r));
    panel.append(box);
  }

  /* THERE IS NO RELIABLE WAY TO DETECT A BLOCKED CROSS-ORIGIN FRAME, AND THAT
     IS DELIBERATE ON THE BROWSER'S PART. Three things were tried against a
     known X-Frame-Options: deny origin, and all three failed to tell it apart
     from a page that loaded perfectly:

       · `error` never fires. The browser considers the block a normal outcome.
       · `load` fires for both — and fires once at ~2ms for every iframe
         regardless, because the initial about:blank document counts.
       · reading contentWindow.location.href throws for both, because Chrome
         commits an opaque error document that is cross-origin like any other.

     Leaking "did my header stop you" to the embedder is exactly what the
     header exists to prevent, so no amount of cleverness here will work.

     THE ANSWER IS THEREFORE NOT DETECTION. It is:
       1. Check the headers before shipping. `embed: 'iframe'` is set on two
          origins in town.js and only because their responses were read.
       2. Make the panel worth reading whether or not the frame paints. The
          title, the description and Open original sit above the frame, and
          the facts sit below it. A frame that comes up blank leaves a
          complete panel rather than a white rectangle — which is the actual
          requirement, once you stop trying to sense the unsensable.
       3. Keep a watchdog for the failures that ARE observable: a site that
          hangs, or DNS that does not resolve. Those never fire a real load.

     The watchdog does not remove the frame. A slow site on a bad connection
     is not a blocked site, and yanking it away at eight seconds would break
     the case it was meant to protect. */
  function fillIframe(panel, r) {
    const shell = el('div', 'twn-frame');
    const load = el('p', 'twn-frame__state');
    load.textContent = isBn() ? 'আনা হচ্ছে…' : 'Loading…';
    shell.append(load);

    const f = document.createElement('iframe');
    f.title = r[lang()].title;
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    // Enough to let the site work, and nothing that lets it act as us:
    // no allow-top-navigation, no allow-modals, no allow-downloads.
    f.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-forms');
    f.className = 'twn-frame__f';

    const started = Date.now();
    let real = false;
    const warn = () => {
      if (real) return;
      load.textContent = isBn()
        ? 'সাইটটি এখানে দেখা না গেলে উপরের লিঙ্কে মূল সাইটে চলে যান।'
        : 'If this does not appear, the link above opens it directly.';
      shell.classList.add('is-slow');
    };
    const timer = setTimeout(warn, 9000);

    f.addEventListener('load', () => {
      // Every iframe fires load once for its initial about:blank, within a
      // few milliseconds of getting a src. That one is not the page.
      if (Date.now() - started < 250) return;
      real = true;
      clearTimeout(timer);
      load.remove();
      shell.classList.add('is-on');
    });
    f.addEventListener('error', () => { clearTimeout(timer); warn(); });

    shell.append(f);
    f.src = r.url;

    panel.append(shell);
    // The facts sit under the frame whether or not the frame paints. This is
    // the whole fallback strategy — see the note above on why detection is
    // not available — so it must not be conditional on anything.
    const facts = factList(r);
    if (facts) {
      const box = el('div', 'twn-native twn-native--under');
      box.append(facts);
      panel.append(box);
    }
    panel.append(attribution(r));
  }

  /* Wikipedia, through the REST summary endpoint rather than an iframe.
     CORS is open on this endpoint, the response is a paragraph and a
     thumbnail, and rendering it here in this site's own type is both lighter
     for the reader and fairer to Wikipedia than reproducing their whole page
     inside ours. The licence line is not optional and is not small print. */
  function fillWiki(panel, r) {
    const box = el('div', 'twn-wiki');
    const state = el('p', 'twn-frame__state', isBn() ? 'আনা হচ্ছে…' : 'Loading…');
    box.append(state);
    panel.append(box);

    const done = (extract, thumb, title) => {
      box.innerHTML = '';
      if (thumb) {
        const img = el('img', 'twn-wiki__pic');
        img.src = thumb; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
        box.append(img);
      }
      const t = el('div', 'twn-wiki__txt');
      t.append(el('h4', null, title));
      t.append(el('p', null, extract));       // textContent, never innerHTML
      box.append(t);
      panel.append(attribution(r));
    };

    // A baked-in paragraph so this panel is never empty: no network, no API,
    // no problem. It is replaced the moment the live summary arrives.
    const FALLBACK = {
      en: 'Uttarpara is a town on the west bank of the Hooghly in Hooghly district, West Bengal, within ten kilometres of Kolkata and directly across the river from the Dakshineswar Kali Temple. Its municipality, constituted in 1853, is the oldest in West Bengal, and the Uttarpara Jaykrishna Public Library has stood beside the Grand Trunk Road since 1859.',
      bn: 'উত্তরপাড়া হুগলি জেলার একটি শহর, গঙ্গার পশ্চিম পাড়ে, কলকাতা থেকে দশ কিলোমিটারের মধ্যে — ঠিক উল্টো দিকে দক্ষিণেশ্বর কালীমন্দির। ১৮৫৩ সালে গঠিত এখানকার পৌরসভা পশ্চিমবঙ্গের প্রাচীনতম, আর জিটি রোডের ধারে জয়কৃষ্ণ পাবলিক লাইব্রেরি দাঁড়িয়ে আছে ১৮৫৯ সাল থেকে।',
    };

    const ctl = new AbortController();
    const bail = setTimeout(() => ctl.abort(), 7000);
    fetch(r.api, { signal: ctl.signal, headers: { Accept: 'application/json' } })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((d) => {
        clearTimeout(bail);
        done(d.extract || FALLBACK[lang()],
             (d.thumbnail || {}).source || null,
             d.title || 'Uttarpara');
      })
      .catch(() => {
        clearTimeout(bail);
        done(FALLBACK[lang()], null, 'Uttarpara');
      });
  }

  /* ---------- go ---------------------------------------------------------- */

  function drawAll() {
    renderTimeline();
    renderPeople();
    renderLearning();
    renderPlaces();
    renderFoodChapters();
    renderFoodPeople();
    renderFoodIdeas();
    renderSources();
    loaded.clear();                  // language changed: panels must be rebuilt
    buildTabs();
  }

  document.addEventListener('DOMContentLoaded', () => {
    drawAll();
    document.querySelectorAll('[data-lang-set]').forEach((b) => {
      b.addEventListener('click', () => setTimeout(drawAll, 0));
    });
  });

})();
