/* ==========================================================================
   The bulk order sheet.

   Reads the same assets/data/menu.js the home page reads, so a price can
   never differ between the menu and a large order — there is one card and one
   set of numbers, and this page is a different view of them.

   IT DOES NOT TAKE MONEY AND IT DOES NOT CONFIRM ANYTHING. Same rule as the
   chit on the home page, and it matters more here: the sums are larger and a
   page that felt like a checkout would have somebody arriving on Saturday
   expecting two hundred momos nobody agreed to make. The sheet composes one
   message. The shop answering is the confirmation.

   No minimum, no notice period and no bulk discount appear anywhere, because
   nobody has told me what they are. Guessing at "24 hours notice" would put a
   promise on the counter that the counter never made.
   ========================================================================== */

'use strict';

(function () {

  const BN = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  const bnNum = (n) => String(n).replace(/\d/g, (d) => BN[+d]);
  const lang = () => (document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'bn');
  const num = (n) => (lang() === 'bn' ? bnNum(n) : String(n));
  const rupees = (n) => '₹' + num(n);

  const qty = new Map();          // item id -> count

  /* ---------- the picker ---------- */

  function renderGrid() {
    const grid = document.getElementById('bulkGrid');
    if (!grid || typeof MENU === 'undefined') return;
    const bn = lang() === 'bn';
    grid.innerHTML = '';

    MENU.forEach((group) => {
      const sec = document.createElement('div');
      sec.className = `bulk__group bulk__group--${group.accent}`;

      const h = document.createElement('h3');
      h.textContent = bn ? group.bn.name : group.en.name;
      sec.append(h);

      group.items.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'bulk__row';

        const name = document.createElement('span');
        name.className = 'bulk__name';
        name.textContent = bn ? item.bn : item.en;

        const price = document.createElement('span');
        price.className = 'bulk__price';
        price.textContent = rupees(item.price);

        const stepper = document.createElement('span');
        stepper.className = 'bulk__step';

        const minus = document.createElement('button');
        minus.type = 'button'; minus.textContent = '−';
        minus.setAttribute('aria-label', bn ? `${item.bn} কমান` : `Fewer ${item.en}`);

        const count = document.createElement('input');
        count.type = 'text'; count.inputMode = 'numeric';
        count.className = 'bulk__count';
        count.value = num(qty.get(item.id) || 0);
        count.setAttribute('aria-label', bn ? `${item.bn} — কতগুলো` : `${item.en} — how many`);

        const plus = document.createElement('button');
        plus.type = 'button'; plus.textContent = '+';
        plus.setAttribute('aria-label', bn ? `${item.bn} বাড়ান` : `More ${item.en}`);

        const bump = (by) => {
          const now = Math.max(0, (qty.get(item.id) || 0) + by);
          if (now) qty.set(item.id, now); else qty.delete(item.id);
          count.value = num(now);
          renderSheet();
        };
        minus.addEventListener('click', () => bump(-1));
        plus.addEventListener('click', () => bump(+1));

        // Typing a number directly matters here — somebody ordering eighty
        // plates should not have to press + eighty times.
        count.addEventListener('input', () => {
          const digits = count.value.replace(/[০-৯]/g, (d) => BN.indexOf(d)).replace(/\D/g, '');
          const n = Math.max(0, Math.min(999, parseInt(digits || '0', 10)));
          if (n) qty.set(item.id, n); else qty.delete(item.id);
          renderSheet();
        });
        count.addEventListener('blur', () => { count.value = num(qty.get(item.id) || 0); });

        stepper.append(minus, count, plus);
        row.append(name, price, stepper);
        sec.append(row);
      });

      grid.append(sec);
    });
  }

  /* ---------- the sheet ---------- */

  function itemById(id) {
    for (const g of MENU) for (const it of g.items) if (it.id === id) return it;
    return null;
  }

  function total() {
    let t = 0;
    qty.forEach((n, id) => { const it = itemById(id); if (it) t += it.price * n; });
    return t;
  }

  function renderSheet() {
    const lines = document.getElementById('bulkLines');
    const totalEl = document.getElementById('bulkTotal');
    if (!lines) return;
    const bn = lang() === 'bn';

    lines.innerHTML = '';
    if (!qty.size) {
      const empty = document.createElement('p');
      empty.className = 'bulk__empty';
      empty.textContent = bn
        ? 'এখনও কিছু বাছা হয়নি। পাশ থেকে বেছে নিন।'
        : 'Nothing chosen yet. Pick from the list.';
      lines.append(empty);
    } else {
      qty.forEach((n, id) => {
        const it = itemById(id); if (!it) return;
        const row = document.createElement('div');
        row.className = 'bulk__line';
        const q = document.createElement('span'); q.textContent = num(n) + '×';
        const nm = document.createElement('span'); nm.textContent = bn ? it.bn : it.en;
        const money = document.createElement('span'); money.textContent = rupees(it.price * n);
        row.append(q, nm, money);
        lines.append(row);
      });
    }
    if (totalEl) totalEl.textContent = rupees(total());
    renderMessage();
  }

  /* ---------- the message ---------- */

  function renderMessage() {
    const wa = document.getElementById('bulkWa');
    if (!wa) return;
    const bn = lang() === 'bn';
    const when = (document.getElementById('bulkWhen') || {}).value?.trim() || '';
    const who  = (document.getElementById('bulkName') || {}).value?.trim() || '';
    const note = (document.getElementById('bulkNote') || {}).value?.trim() || '';

    const lines = [];
    qty.forEach((n, id) => {
      const it = itemById(id); if (!it) return;
      lines.push(bn ? `${bnNum(n)} × ${it.bn} — ${rupees(it.price * n)}`
                    : `${n} × ${it.en} — ₹${it.price * n}`);
    });

    let msg;
    if (bn) {
      msg = 'নমস্কার। মঞ্জুলা বাইট অ্যান্ড ব্রু-তে একটা বড় অর্ডারের কথা বলতে চাই —\n\n'
          + (lines.length ? lines.join('\n') + `\n\nমোট ${rupees(total())}\n` : '')
          + (when ? `\nকবে: ${when}` : '')
          + (who  ? `\nনাম: ${who}` : '')
          + (note ? `\nবলার আছে: ${note}` : '')
          + '\n\n(manjulab.com থেকে পাঠানো)';
    } else {
      msg = 'Hello. I would like to talk about a bulk order from Manjula Bite & Brew —\n\n'
          + (lines.length ? lines.join('\n') + `\n\nTotal ₹${total()}\n` : '')
          + (when ? `\nWhen: ${when}` : '')
          + (who  ? `\nName: ${who}` : '')
          + (note ? `\nNote: ${note}` : '')
          + '\n\n(sent from manjulab.com)';
    }
    wa.href = 'https://wa.me/919163538794?text=' + encodeURIComponent(msg);

    // The email button carries the same list. An empty mailto: would make
    // somebody retype everything they just picked.
    const mail = document.getElementById('bulkMail');
    if (mail) {
      const subject = bn ? 'বড় অর্ডার — মঞ্জুলা বাইট অ্যান্ড ব্রু'
                         : 'Bulk order — Manjula Bite & Brew';
      mail.href = 'mailto:isha.mukherjee1996@gmail.com'
                + '?subject=' + encodeURIComponent(subject)
                + '&body=' + encodeURIComponent(msg);
    }
  }

  /* ---------- placeholders follow the language ---------- */

  function renderPlaceholders() {
    const bn = lang() === 'bn';
    document.querySelectorAll('[data-ph-bn]').forEach((el) => {
      el.placeholder = bn ? el.dataset.phBn : el.dataset.phEn;
    });
  }

  function drawAll() { renderGrid(); renderSheet(); renderPlaceholders(); }

  document.addEventListener('DOMContentLoaded', () => {
    drawAll();
    ['bulkWhen', 'bulkName', 'bulkNote'].forEach((id) => {
      document.getElementById(id)?.addEventListener('input', renderMessage);
    });
    document.querySelectorAll('[data-lang-set]').forEach((b) => {
      // after the language switch has flipped the attribute
      b.addEventListener('click', () => setTimeout(drawAll, 0));
    });
  });

})();
