/* ==========================================================================
   Manjula Bite & Brew — page behaviour.

   Five jobs, and it refuses a sixth:
     1. the language switch (Bengali is the default, and it is remembered)
     2. open / closed, computed in Kolkata time whoever is looking
     3. the menu, rendered from assets/data/menu.js
     4. the slate, rendered from assets/data/slate.js — and CHECKED against
        today's date, so the page can say "I don't know" out loud
     5. the chit: tap dishes, get a message to send. Not a checkout.

   The sixth job it will not do is take money. There is no cart, no payment
   intent, no card field, and no order that exists anywhere but in this tab
   until a human at the shop answers a phone. A one-room shop with two owners
   cannot honour an order placed by a stranger at 3am, so the software is not
   allowed to accept one.
   ========================================================================== */

'use strict';

(function () {

  /* ---------- Bengali numerals ------------------------------------------ */

  const BN_DIGITS = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  const bnNum = (n) => String(n).replace(/\d/g, (d) => BN_DIGITS[+d]);

  const lang = () => document.documentElement.getAttribute('data-lang') || 'bn';
  const num  = (n) => (lang() === 'bn' ? bnNum(n) : String(n));
  const rupees = (n) => '₹' + num(n);

  /* ---------- language --------------------------------------------------- */

  const LANG_KEY = 'manjula-lang';

  function setLang(next) {
    const l = next === 'en' ? 'en' : 'bn';
    document.documentElement.setAttribute('data-lang', l);
    document.documentElement.setAttribute('lang', l === 'bn' ? 'bn' : 'en');
    document.querySelectorAll('[data-lang-set]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.langSet === l));
    });
    try { localStorage.setItem(LANG_KEY, l); } catch (e) { /* private mode */ }
    // Everything that prints a number or a date has to be redrawn, because
    // the numerals themselves change with the language.
    renderMenu();
    renderSlate();
    renderChit();
    renderStatus();
    buildReel();
    paintReel();
  }

  document.querySelectorAll('[data-lang-set]').forEach((b) => {
    b.addEventListener('click', () => setLang(b.dataset.langSet));
  });

  /* ---------- open / closed ---------------------------------------------- */

  /* The shop is in Kolkata; the reader may not be. Asking the visitor's
     browser what time it is would tell a customer in London that a shop in
     Uttarpara is open at 4am. So the clock is always the shop's clock. */
  function kolkataNow() {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false, weekday: 'long',
    }).formatToParts(new Date());
    const g = (t) => parts.find((p) => p.type === t)?.value;
    return {
      iso: `${g('year')}-${g('month')}-${g('day')}`,
      hour: +g('hour') % 24,
      minute: +g('minute'),
      weekday: g('weekday'),
    };
  }

  const WEEKDAY_BN = {
    Monday: 'সোমবার', Tuesday: 'মঙ্গলবার', Wednesday: 'বুধবার',
    Thursday: 'বৃহস্পতিবার', Friday: 'শুক্রবার', Saturday: 'শনিবার',
    Sunday: 'রবিবার',
  };

  function renderStatus() {
    const el = document.getElementById('status');
    if (!el) return;
    const open = +el.dataset.open, close = +el.dataset.close;
    const now = kolkataNow();
    const mins = now.hour * 60 + now.minute;
    const isOpen = mins >= open * 60 && mins < close * 60;
    const text = el.querySelector('.status__text');

    el.classList.toggle('is-open', isOpen);
    el.classList.toggle('is-shut', !isOpen);

    const bn = lang() === 'bn';
    if (isOpen) {
      const left = Math.round((close * 60 - mins) / 60);
      text.textContent = bn
        ? (left >= 1
            ? `খোলা আছে · আরও প্রায় ${bnNum(left)} ঘণ্টা`
            : 'খোলা আছে · তবে বন্ধ হওয়ার মুখে')
        : (left >= 1
            ? `Open now · about ${left} more hour${left === 1 ? '' : 's'}`
            : 'Open now · closing shortly');
    } else {
      const until = mins < open * 60
        ? Math.round((open * 60 - mins) / 60)
        : Math.round((24 * 60 - mins + open * 60) / 60);
      text.textContent = bn
        // "ঘণ্টা দুয়েক" is the idiom, but it only works with the number
        // spelled out; against a numeral it reads as a typo. Plain and clean.
        ? `এখন বন্ধ · খুলবে সকাল ${bnNum(open)}টায় — আর প্রায় ${bnNum(until)} ঘণ্টা পরে`
        : `Closed now · opens at ${open}am, in about ${until} hour${until === 1 ? '' : 's'}`;
    }
  }

  /* ---------- the reel ---------------------------------------------------- */

  /* A phone in the hero running the kitchen as a story. Scenes come from
     assets/data/reels.js; the ones with a price are dishes you can actually
     order, the rest are atmosphere and carry a caption only. */

  let reelAt = 0;
  let reelTimer = null;
  const REEL_MS = 5000;

  function buildReel() {
    const screen = document.querySelector('.phone__screen');
    if (!screen || typeof REELS === 'undefined' || screen.dataset.built) return;
    screen.dataset.built = '1';

    const bars = document.querySelector('.phone__bars');
    const tabs = document.querySelector('.reel__tabs');

    // Collected into a fragment and inserted in front of the bars in one go.
    // prepend() per image reversed the DOM order, and paintReel indexes the
    // scenes by position — so the screen showed the counter while the caption
    // read maggi.
    const frag = document.createDocumentFragment();

    REELS.forEach((r, i) => {
      const img = document.createElement('img');
      img.className = 'reel__img' + (i === 0 ? ' is-on' : '');
      img.src = `assets/img/reel/${r.f}.jpg`;
      img.width = 720; img.height = 1280;
      if (i === 0) img.fetchPriority = 'high'; else img.loading = 'lazy';
      img.alt = '';                       // the caption describes the scene
      frag.append(img);

      const bar = document.createElement('i');
      bar.append(document.createElement('b'));
      bars.append(bar);

      const tab = document.createElement('button');
      tab.type = 'button';
      tab.addEventListener('click', (e) => { e.stopPropagation(); show(i); restart(); });
      tabs.append(tab);
    });

    screen.insertBefore(frag, bars);

    /* Tap the left third to go back, anywhere else to go on — the gesture
       everyone already has from every story app there is. */
    screen.addEventListener('click', (e) => {
      const r = screen.getBoundingClientRect();
      show(e.clientX - r.left < r.width / 3 ? reelAt - 1 : reelAt + 1);
      restart();
    });

    paintReel();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) restart();
  }

  function restart() {
    clearInterval(reelTimer);
    reelTimer = setInterval(() => show(reelAt + 1), REEL_MS);
  }

  function show(i) {
    reelAt = (i + REELS.length) % REELS.length;
    paintReel();
  }

  function paintReel() {
    if (typeof REELS === 'undefined') return;
    const imgs = document.querySelectorAll('.reel__img');
    if (!imgs.length) return;
    const bn = lang() === 'bn';
    const r = REELS[reelAt];

    imgs.forEach((im, i) => im.classList.toggle('is-on', i === reelAt));

    document.querySelectorAll('.phone__bars i').forEach((bar, i) => {
      bar.classList.toggle('is-on', i === reelAt);
      bar.classList.toggle('is-done', i < reelAt);
      if (i === reelAt) {            // retrigger the fill animation
        const fill = bar.firstElementChild;
        fill.style.animation = 'none'; void fill.offsetWidth; fill.style.animation = '';
      }
    });

    document.querySelectorAll('.reel__tabs button').forEach((t, i) => {
      t.textContent = bn ? REELS[i].tabBn : REELS[i].tabEn;
      t.setAttribute('aria-current', String(i === reelAt));
    });

    const scene = document.querySelector('.phone__scene');
    const dish = document.querySelector('.phone__dish');
    if (scene) scene.textContent = bn ? r.bn : r.en;
    if (dish) {
      dish.innerHTML = '';
      if (r.price) {                 // a dish on the card: name it and price it
        const b = document.createElement('b');
        b.textContent = bn ? r.dishBn : r.dishEn;
        const price = document.createElement('span');
        price.className = 'phone__price';
        price.textContent = rupees(r.price);
        dish.append(b, price);
      }
      // no price means atmosphere: caption only, nothing implied for sale
    }
  }

  /* ---------- the menu ---------------------------------------------------- */

  function renderMenu() {
    const grid = document.getElementById('menuGrid');
    if (!grid || typeof MENU === 'undefined') return;
    const bn = lang() === 'bn';
    grid.innerHTML = '';

    MENU.forEach((group) => {
      const card = document.createElement('section');
      card.className = `card card--${group.accent}`;

      const head = document.createElement('div');
      head.className = 'card__head';
      const h3 = document.createElement('h3');
      h3.textContent = bn ? group.bn.name : group.en.name;
      const count = document.createElement('span');
      count.textContent = bn
        ? `${bnNum(group.items.length)} রকম`
        : `${group.items.length} items`;
      head.append(h3, count);

      const note = document.createElement('p');
      note.className = 'card__note';
      note.textContent = bn ? group.bn.note : group.en.note;

      const ul = document.createElement('ul');
      group.items.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'dish';

        const name = document.createElement('span');
        name.className = 'dish__name';
        name.textContent = bn ? item.bn : item.en;

        const price = document.createElement('span');
        price.className = 'dish__price';
        if (item.priceLabel) {
          price.innerHTML = `${rupees(item.price)} <small>(${bn ? item.priceLabelBn : item.priceLabel})</small>`;
        } else {
          price.textContent = rupees(item.price);
        }

        const add = document.createElement('button');
        add.className = 'add';
        add.type = 'button';
        add.textContent = '+';
        add.setAttribute('aria-label', bn
          ? `${item.bn} চিরকুটে যোগ করুন`
          : `Add ${item.en} to the chit`);
        add.addEventListener('click', () => addToChit(item));

        li.append(name, price, add);

        const meta = [];
        if (item.pieces) meta.push(bn ? `${bnNum(item.pieces)} পিস` : `${item.pieces} pieces`);
        const n = bn ? item.bn_note : item.en_note;
        if (n) meta.push(n);
        if (meta.length) {
          const m = document.createElement('span');
          m.className = 'dish__meta';
          m.textContent = meta.join(' · ');
          li.append(m);
        }

        ul.append(li);
      });

      card.append(head, note, ul);
      grid.append(card);
    });
  }

  /* ---------- the slate --------------------------------------------------- */

  function renderSlate() {
    const board = document.getElementById('board');
    if (!board || typeof SLATE === 'undefined') return;
    const bn = lang() === 'bn';
    const today = kolkataNow().iso;
    const isToday = SLATE.date === today;

    board.innerHTML = '';

    /* the date line, and whether this board is today's */
    const dateRow = document.createElement('p');
    dateRow.className = 'board__date';
    /* Midday IST, so the instant cannot fall on a different calendar day in
       any timezone the reader might be in. Every part is then read back
       THROUGH Intl in Kolkata time — getDate() would answer in the reader's
       zone and silently date the board a day early from anywhere west of
       India, which is exactly what it did on the first run. */
    const written = new Date(SLATE.date + 'T12:00:00+05:30');
    const inKolkata = (opts) => new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', ...opts }).format(written);
    const dayName = inKolkata({ weekday: 'long' });
    const pretty = bn
      ? `${bnNum(+inKolkata({ day: 'numeric' }))}/${bnNum(+inKolkata({ month: 'numeric' }))} · ${WEEKDAY_BN[dayName] || dayName}`
      : inKolkata({ day: 'numeric', month: 'long', weekday: 'long' });

    const label = document.createElement('span');
    label.textContent = bn ? `বোর্ড লেখা হয়েছে ${pretty}` : `Board written ${pretty}`;

    const stamp = document.createElement('span');
    stamp.className = 'board__stamp ' + (isToday ? 'is-today' : 'is-old');
    stamp.textContent = isToday
      ? (bn ? 'আজকের' : "Today's")
      : (bn ? 'পুরনো বোর্ড' : 'Not today');

    dateRow.append(label, stamp);
    board.append(dateRow);

    if (SLATE.headline && (bn ? SLATE.headline.bn : SLATE.headline.en)) {
      const h = document.createElement('p');
      h.className = 'board__headline';
      h.textContent = bn ? SLATE.headline.bn : SLATE.headline.en;
      board.append(h);
    }

    const ol = document.createElement('ol');
    SLATE.items.forEach((item) => {
      const li = document.createElement('li');

      const name = document.createElement('span');
      name.className = 'board__name';
      name.textContent = bn ? item.bn : item.en;

      let priceEl;
      if (item.sizes) {
        priceEl = document.createElement('span');
        priceEl.className = 'board__sizes';
        item.sizes.forEach((s) => {
          const sp = document.createElement('span');
          sp.innerHTML = `${rupees(s.price)}<small>${bn ? s.bn : s.en}</small>`;
          priceEl.append(sp);
        });
      } else {
        priceEl = document.createElement('span');
        priceEl.className = 'board__price';
        priceEl.textContent = rupees(item.price);
      }

      li.append(name, priceEl);

      const bits = [];
      if (item.pieces) bits.push(bn ? `${bnNum(item.pieces)} পিস` : `${item.pieces} pieces`);
      const n = bn ? item.bn_note : item.en_note;
      if (n) bits.push(n);
      if (bits.length) {
        const note = document.createElement('span');
        note.className = 'board__note';
        note.textContent = bits.join(' · ');
        li.append(note);
      }

      ol.append(li);
    });
    board.append(ol);

    /* The honest sentence. This is the reason the file exists. */
    if (!isToday) {
      const warn = document.createElement('p');
      warn.className = 'board__unknown';
      warn.innerHTML = bn
        ? `উপরের বোর্ডটা <strong>আজকের নয়</strong>। আজ কী রান্না হয়েছে, সে খবর এখানে এসে পৌঁছয়নি।
           <a href="tel:+919163538794">বুজুনিকে একটা ফোন করে নিন — ৯১৬৩৫ ৩৮৭৯৪</a>। মেনুর
           বাকি পদ কিন্তু রোজই থাকে।`
        : `The board above is <strong>not today's</strong>. This page does not know what was
           cooked this morning — <a href="tel:+919163538794">call Bujuni on +91 91635 38794</a>
           and ask. Everything on the printed menu is there every day.`;
      board.append(warn);
    }

    const photo = document.getElementById('slatePhoto');
    if (photo) {
      if (SLATE.photo) { photo.src = SLATE.photo; photo.closest('figure').hidden = false; }
      else { photo.closest('figure').hidden = true; }
    }
  }

  /* ---------- the chit ---------------------------------------------------- */

  const chit = new Map();   // id -> { item, qty }

  function addToChit(item) {
    const row = chit.get(item.id) || { item, qty: 0 };
    row.qty += 1;
    chit.set(item.id, row);
    renderChit();
    const panel = document.getElementById('chitPanel');
    if (panel && !panel.classList.contains('is-open')) openChit(true);
  }

  function removeFromChit(id) {
    const row = chit.get(id);
    if (!row) return;
    row.qty -= 1;
    if (row.qty <= 0) chit.delete(id); else chit.set(id, row);
    renderChit();
  }

  function chitTotal() {
    let t = 0;
    chit.forEach((r) => { t += r.item.price * r.qty; });
    return t;
  }

  function openChit(on) {
    const panel = document.getElementById('chitPanel');
    const btn = document.getElementById('chitOpen');
    panel.classList.toggle('is-open', on);
    btn.setAttribute('aria-expanded', String(on));
  }

  function renderChit() {
    const dock = document.getElementById('chitDock');
    const body = document.getElementById('chitBody');
    const total = document.getElementById('chitTotal');
    const count = document.getElementById('chitCount');
    if (!dock || !body) return;

    const bn = lang() === 'bn';
    let n = 0;
    chit.forEach((r) => { n += r.qty; });

    dock.classList.toggle('is-on', n > 0);
    count.textContent = num(n);
    total.textContent = rupees(chitTotal());
    if (n === 0) openChit(false);

    body.innerHTML = '';
    chit.forEach((row) => {
      const line = document.createElement('div');
      line.className = 'chit-line';

      const qty = document.createElement('span');
      qty.className = 'chit-qty';
      qty.textContent = num(row.qty) + '×';

      const name = document.createElement('span');
      name.textContent = bn ? row.item.bn : row.item.en;

      const money = document.createElement('span');
      money.textContent = rupees(row.item.price * row.qty);

      const rm = document.createElement('button');
      rm.className = 'rm';
      rm.type = 'button';
      rm.textContent = '−';
      rm.setAttribute('aria-label', bn ? 'একটা কমান' : 'Remove one');
      rm.addEventListener('click', () => removeFromChit(row.item.id));

      line.append(qty, name, money, rm);
      body.append(line);
    });

    /* The chit becomes a message. Written in whichever language the reader is
       reading, because the person at the other end reads both. */
    const lines = [];
    chit.forEach((row) => {
      lines.push(bn
        ? `${bnNum(row.qty)} × ${row.item.bn} — ${rupees(row.item.price * row.qty)}`
        : `${row.qty} × ${row.item.en} — ₹${row.item.price * row.qty}`);
    });
    const msg = bn
      ? `নমস্কার। মঞ্জুলা বাইট অ্যান্ড ব্রু-তে একটা অর্ডার দিতে চাই —\n\n${lines.join('\n')}\n\nমোট ${rupees(chitTotal())}\n\n(manjulab.com থেকে পাঠানো)`
      : `Hello! I'd like to order from Manjula Bite & Brew:\n\n${lines.join('\n')}\n\nTotal ₹${chitTotal()}\n\n(sent from manjulab.com)`;

    const wa = document.getElementById('chitWa');
    if (wa) wa.href = 'https://wa.me/919163538794?text=' + encodeURIComponent(msg);
  }

  document.getElementById('chitOpen')?.addEventListener('click', () => {
    const panel = document.getElementById('chitPanel');
    openChit(!panel.classList.contains('is-open'));
  });
  document.getElementById('chitClose')?.addEventListener('click', () => openChit(false));

  /* ---------- start ------------------------------------------------------- */

  let saved = 'bn';
  try { saved = localStorage.getItem(LANG_KEY) || 'bn'; } catch (e) { /* private mode */ }
  setLang(saved);

  // The status line goes stale if a tab is left open across 9pm.
  setInterval(renderStatus, 60000);

})();
