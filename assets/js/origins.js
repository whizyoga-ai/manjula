/* ==========================================================================
   Origins page — language switch only.

   The home page's site.js also renders a menu, a slate and an order chit,
   none of which exist here. Rather than load all of it and let two thirds
   sit idle, this page carries the one behaviour it actually needs.

   The storage key is shared with site.js on purpose, so a reader who chose
   English on the home page is still reading English when they arrive here.
   ========================================================================== */

'use strict';

(function () {

  const LANG_KEY = 'manjula-lang';

  function setLang(next) {
    const l = next === 'en' ? 'en' : 'bn';
    document.documentElement.setAttribute('data-lang', l);
    document.documentElement.setAttribute('lang', l);
    document.querySelectorAll('[data-lang-set]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.langSet === l));
    });
    try { localStorage.setItem(LANG_KEY, l); } catch (e) { /* private mode */ }
  }

  document.querySelectorAll('[data-lang-set]').forEach((b) => {
    b.addEventListener('click', () => setLang(b.dataset.langSet));
  });

  let saved = 'bn';
  try { saved = localStorage.getItem(LANG_KEY) || 'bn'; } catch (e) { /* private mode */ }
  setLang(saved);

})();
