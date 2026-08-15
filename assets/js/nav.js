/* ==========================================================================
   The mobile nav.

   Below 880px the header nav was hidden and nothing took its place, so on a
   phone the only route to Origins, Photographs or Uttarpara was knowing
   the URL. Most of this site's readers are on phones. Most of the site was
   therefore unreachable for most of its visitors.

   The panel is the same <nav>, restyled — not a second copy of the links.
   Two lists of navigation drift apart the first time somebody adds a page.

   Its own file because every page needs it and only the home page loads
   site.js.
   ========================================================================== */

'use strict';

(function () {

  const top = document.querySelector('.top');
  const btn = document.querySelector('.navtoggle');
  const nav = document.getElementById('sitenav');
  if (!top || !btn || !nav) return;

  function set(open) {
    top.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    set(!top.classList.contains('is-open'));
  });

  // Following a link should close the panel. Most of these are same-page
  // anchors from another page — index.html#menu and the like — and on the
  // home page they do not navigate at all, so nothing else would close it.
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });

  document.addEventListener('click', (e) => {
    if (!top.contains(e.target)) set(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') set(false);
  });

  // Crossing the breakpoint with the panel open would otherwise leave the
  // header stuck in its open state on a desktop, where the panel does not
  // exist and there is no way to close it.
  const mq = window.matchMedia('(min-width: 881px)');
  const sync = () => { if (mq.matches) set(false); };
  mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);

})();
