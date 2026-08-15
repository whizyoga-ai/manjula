/* ==========================================================================
   Shared behaviour for the story pages.

   The site used to be two very long scrolls. It is now seven short pages, so
   the job here is small: keep the language choice, and render a dish from
   assets/data/dishes.js — either as a card on the origins index or as a whole
   page on dish.html.

   The language key is the same one site.js uses, so a reader who chose
   English on the menu is still reading English three pages later.
   ========================================================================== */

'use strict';

const PAGES = (function () {

  const LANG_KEY = 'manjula-lang';
  const lang = () => (document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'bn');
  const pick = (o) => (o ? (lang() === 'en' ? o.en : o.bn) : '');

  function setLang(next) {
    const l = next === 'en' ? 'en' : 'bn';
    document.documentElement.setAttribute('data-lang', l);
    document.documentElement.setAttribute('lang', l);
    document.querySelectorAll('[data-lang-set]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.langSet === l));
    });
    try { localStorage.setItem(LANG_KEY, l); } catch (e) { /* private mode */ }
    document.dispatchEvent(new CustomEvent('langchange'));
  }

  function initLang() {
    document.querySelectorAll('[data-lang-set]').forEach((b) => {
      b.addEventListener('click', () => setLang(b.dataset.langSet));
    });
    let saved = 'bn';
    try { saved = localStorage.getItem(LANG_KEY) || 'bn'; } catch (e) { /* private mode */ }
    setLang(saved);
  }

  const plate = (art, label) =>
    `<div class="plate"><svg role="img" viewBox="0 0 200 200" aria-label="${label}"><use href="#${art}"></use></svg></div>`;

  /* ------------------------------------------------------- origins index */

  function renderIndex(el) {
    if (!el || typeof DISHES === 'undefined') return;
    el.innerHTML = '';
    DISHES.forEach((d, i) => {
      const a = document.createElement('a');
      a.className = 'dishcard';
      a.href = `dish.html?d=${d.slug}`;
      a.innerHTML =
        plate(d.art, pick(d.name)) +
        `<div class="dishcard__body">
           <span class="dishcard__no">${String(i + 1).padStart(2, '0')}</span>
           <h3>${pick(d.name)}</h3>
           <p class="dishcard__sub">${pick(d.sub)}</p>
           <span class="dishcard__price">${d.price}</span>
         </div>`;
      el.append(a);
    });
  }

  /* --------------------------------------------------------- single dish */

  function renderDish(el) {
    if (!el || typeof DISHES === 'undefined') return;

    const slug = new URLSearchParams(location.search).get('d');
    const i = DISHES.findIndex((d) => d.slug === slug);

    // An unknown or missing ?d= sends the reader to the index rather than
    // showing an empty page. Deep links get shared and mistyped.
    if (i < 0) { location.replace('origins.html'); return; }

    const d = DISHES[i];
    const prev = DISHES[(i - 1 + DISHES.length) % DISHES.length];
    const next = DISHES[(i + 1) % DISHES.length];

    document.body.dataset.tone = d.tone;
    document.title = `${pick(d.name)} — ${lang() === 'en' ? 'where it came from' : 'কোথা থেকে এল'} | Manjula`;

    const routeHtml = d.route.length ? `
      <div class="origin">
        <h3>${lang() === 'en' ? 'The road it took' : 'যে পথে এল'}</h3>
        <ol class="route">${d.route.map((r) => `
          <li><span class="when">${r.when}</span>
              <span class="where">${pick(r.where)}</span>
              <span class="what">${pick(r.what)}</span></li>`).join('')}
        </ol>
      </div>` : '';

    const chipsHtml = d.chips.length
      ? `<ul class="chips">${d.chips.map((c) => `<li>${pick(c)}</li>`).join('')}</ul>` : '';

    el.innerHTML = `
      <div class="wrap chapter__grid">
        <div>
          <p class="chapter__no">${String(i + 1).padStart(2, '0')}</p>
          <h1>${pick(d.name)}</h1>
          <p class="chapter__sub">${pick(d.sub)}</p>
          <p class="lede">${pick(d.lede)}</p>
          ${routeHtml}
          <div class="kitchen">
            <h3>${lang() === 'en' ? 'From this kitchen — the shop’s own account' : 'রান্নাঘরের কথা — দোকানের নিজের বলা'}</h3>
            ${d.kitchen.map((p) => `<p>${pick(p)}</p>`).join('')}
            ${chipsHtml}
            <span class="price-note">${d.price} <small>${pick(d.priceNote)}</small></span>
          </div>
        </div>
        <div class="dishmedia">
          ${plate(d.art, pick(d.name))}
          ${d.clip ? `
          <figure class="dishclip">
            <video muted loop playsinline preload="none" poster="assets/video/dish/${d.clip}.jpg"
                   data-src="assets/video/dish/${d.clip}.mp4" aria-hidden="true"></video>
            <figcaption>${lang() === 'en'
              ? 'Six seconds in the kitchen. Generated, not filmed — see docs/SOURCES.md.'
              : 'রান্নাঘরের ছ’ সেকেন্ড। তোলা ছবি নয়, বানানো — docs/SOURCES.md দেখুন।'}</figcaption>
          </figure>` : ''}
        </div>
      </div>

      <nav class="pager wrap" aria-label="${lang() === 'en' ? 'More dishes' : 'আরও পদ'}">
        <a class="pager__prev" href="dish.html?d=${prev.slug}">
          <span class="pager__dir">${lang() === 'en' ? 'Previous' : 'আগেরটা'}</span>
          <span class="pager__name">${pick(prev.name)}</span>
        </a>
        <a class="pager__all" href="origins.html">${lang() === 'en' ? 'All seven' : 'সাতটাই'}</a>
        <a class="pager__next" href="dish.html?d=${next.slug}">
          <span class="pager__dir">${lang() === 'en' ? 'Next' : 'পরেরটা'}</span>
          <span class="pager__name">${pick(next.name)}</span>
        </a>
      </nav>`;
  }

  /* The clip loads and plays when it reaches the screen, and stops when it
     leaves. preload="none" until then, so a dish page costs nothing extra to
     open — the video is a detail somebody scrolls to, not a tax on arriving. */
  function armClip() {
    const v = document.querySelector('.dishclip video');
    if (!v || !('IntersectionObserver' in window)) return;
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = v.dataset.src;
          v.play().catch(() => {});
        } else v.pause();
      });
    }, { threshold: 0.25 }).observe(v);
  }

  return { initLang, renderIndex, renderDish, armClip, lang };
})();

document.addEventListener('DOMContentLoaded', () => {
  PAGES.initLang();
  const index = document.getElementById('dishIndex');
  const single = document.getElementById('dishPage');
  const draw = () => { PAGES.renderIndex(index); PAGES.renderDish(single); PAGES.armClip(); };
  draw();
  document.addEventListener('langchange', draw);
});
