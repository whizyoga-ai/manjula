/* ==========================================================================
   The theme switch.

   Its own file because every page needs it and only the home page loads
   site.js. Four themes, two dark and two light, and the choice is remembered
   the same way the language is.

   THE RULE THIS FILE HELPS ENFORCE: a theme sets colour and nothing else.
   All it ever does is put an attribute on <html>; the palettes live in CSS
   and redefine one fixed list of tokens. If a theme ever needs JavaScript to
   move something, the theme is wrong, not the code.

   The attribute is applied before paint by an inline snippet in each page's
   <head>, so a reader who chose the light theme does not get a black flash
   on every navigation. This file only wires the buttons.
   ========================================================================== */

'use strict';

(function () {

  const KEY = 'manjula-theme';
  const THEMES = {
    slate: { bn: 'স্লেট',   en: 'Slate' },
    tuni:  { bn: 'টুনি',    en: 'Fairy lights' },
    kagoj: { bn: 'কাগজ',    en: 'Paper' },
    sokal: { bn: 'সকাল',    en: 'Morning' },
  };

  function apply(name) {
    const t = THEMES[name] ? name : 'slate';
    // slate is the default and carries no attribute, so the bare :root block
    // stays the source of truth rather than being a fourth override.
    if (t === 'slate') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(KEY, t); } catch (e) { /* private mode */ }
    document.querySelectorAll('[data-theme-set]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.themeSet === t));
    });
  }

  function label() {
    const bn = document.documentElement.getAttribute('data-lang') !== 'en';
    document.querySelectorAll('[data-theme-set]').forEach((b) => {
      const t = THEMES[b.dataset.themeSet];
      if (t) b.setAttribute('title', bn ? t.bn : t.en);
      if (t) b.setAttribute('aria-label', bn ? t.bn : t.en);
    });
  }

  function init() {
    const host = document.querySelector('.theme');
    if (host && !host.children.length) {
      Object.keys(THEMES).forEach((name) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.dataset.themeSet = name;
        b.addEventListener('click', () => apply(name));
        host.append(b);
      });
    }
    let saved = 'slate';
    try { saved = localStorage.getItem(KEY) || 'slate'; } catch (e) { /* private mode */ }
    apply(saved);
    label();
    // the language switch fires this, and the tooltips are bilingual
    document.addEventListener('langchange', label);
    document.querySelectorAll('[data-lang-set]').forEach((b) =>
      b.addEventListener('click', () => setTimeout(label, 0)));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
