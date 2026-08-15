/* ==========================================================================
   Nexus — the Manjula assistant.

   Speaks the Brahmando multi-tenant embed API:
       POST https://chat.brahmando.com/api/embed/manjula/stream
       { message, session_id }  ->  text/event-stream

   No API key in the browser. The endpoint is origin-checked and the tenant
   key is injected server-side, which is why this file can sit in a public
   repository without leaking anything.

   IT FOLLOWS THE PAGE'S LANGUAGE. Bengali by default, and every string here
   exists twice. The knowledge pack behind it is bilingual too, so a question
   asked in Bengali comes back in Bengali.

   WHAT IT WILL NOT DO, and why the copy says so out loud:
     - it does not know today's specials unless the slate says so. The board
       is chalk on a pavement in Uttarpara; a language model in a datacentre
       has no way to read it. Asked, it says call the shop.
     - it does not take orders. It can price a plate; it cannot promise one.
     - it does not invent history. The family story about the name is told as
       the family's story, which is what it is.

   FAILURE IS VISIBLE. A 403 or a 404 says "not enabled here" instead of
   leaving three dots bouncing forever — a broken tenant and a slow one must
   not look the same, because only one of them is worth waiting for.
   ========================================================================== */

'use strict';

(function () {

  const TENANT = 'manjula';
  const STREAM = `https://chat.brahmando.com/api/embed/${TENANT}/stream`;
  const SESS_KEY = 'manjula-nexus-session';

  const COPY = {
    bn: {
      launch: 'জিজ্ঞাসা করুন',
      title: 'মঞ্জুলা সহায়ক',
      sub: 'মেনু, দাম, আর উত্তরপাড়ার কথা',
      placeholder: 'কোনও পদ, দাম, বা উত্তরপাড়া নিয়ে জিজ্ঞাসা করুন…',
      send: 'পাঠান', close: 'বন্ধ করুন',
      opener: 'নমস্কার। মেনু, দাম, দোকানের নাম, বা উত্তরপাড়া — যা জানতে চান জিজ্ঞাসা করুন। আজকের স্পেশাল কী, সেটা কিন্তু আমি জানি না; ওটা দোকানের বোর্ডে লেখা থাকে।',
      samples: [
        'মোমোর প্লেটে কটা থাকে?',
        'সবচেয়ে সস্তা কী পাওয়া যায়?',
        'নামটা মঞ্জুলা কেন?',
        'জয়কৃষ্ণ লাইব্রেরি কত পুরনো?',
      ],
      poweredBy: 'চালায়',
      errNet: 'এখন দোকানের সঙ্গে যোগাযোগ করতে পারলাম না। ইন্টারনেট দেখে আবার চেষ্টা করুন।',
      errOrigin: 'এই ঠিকানার জন্য সহায়কটি এখনও চালু করা হয়নি।',
      errServer: 'কিছু একটা গোলমাল হল। আবার একবার চেষ্টা করুন, নয়তো ৯১৬৩৫ ৩৮৭৯৪-এ ফোন করুন।',
    },
    en: {
      launch: 'Ask about the shop',
      title: 'Manjula assistant',
      sub: 'The menu, the prices, and Uttarpara',
      placeholder: 'Ask about a dish, a price, or the town…',
      send: 'Send', close: 'Close',
      opener: "Hello. Ask about the menu, the prices, where the name came from, or about Uttarpara itself. One thing I can't tell you is today's specials — those are chalked on a board outside the shop, and I have no way to read it.",
      samples: [
        'How many momos in a plate?',
        'What is the cheapest thing here?',
        'Why is it called Manjula?',
        'How old is the Jaykrishna library?',
      ],
      poweredBy: 'Powered by',
      errNet: 'I could not reach the shop just now. Check your connection and try again.',
      errOrigin: 'The assistant is not enabled for this address yet.',
      errServer: 'Something went wrong at my end. Try again, or call the shop on +91 91635 38794.',
    },
  };

  const lang = () => (document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'bn');
  const t = () => COPY[lang()];

  let sessionId = null;
  try { sessionId = sessionStorage.getItem(SESS_KEY); } catch (e) { /* private mode */ }

  let busy = false;
  let opened = false;

  /* ---------- styles (scoped, injected so the page CSS stays about the shop) */

  const css = `
  .nx-launch{position:fixed;left:1rem;bottom:1rem;z-index:72;display:inline-flex;align-items:center;gap:.55rem;
    border:0;border-radius:999px;cursor:pointer;padding:.8rem 1.25rem;font:inherit;font-weight:600;
    background:#14110e;color:#f6f1e6;border:1px solid rgba(246,241,230,.28);
    box-shadow:0 14px 34px -14px rgba(0,0,0,.8)}
  .nx-launch:hover{background:#221d18}
  .nx-launch .nx-spark{width:9px;height:9px;border-radius:50%;background:#f6c65a;flex:none}
  .nx-panel{position:fixed;left:1rem;bottom:1rem;z-index:73;width:min(400px,calc(100vw - 2rem));height:min(560px,calc(100vh - 2rem));
    display:flex;flex-direction:column;background:#fbf7ee;border-radius:14px;overflow:hidden;
    box-shadow:0 40px 80px -24px rgba(0,0,0,.55);border:1px solid #e2d5ba}
  .nx-panel[hidden]{display:none}
  .nx-head{display:flex;align-items:center;gap:.7rem;padding:.85rem 1rem;background:#14110e;color:#f6f1e6}
  .nx-head h3{margin:0;font-size:1rem;font-weight:600;line-height:1.2}
  .nx-head p{margin:0;font-size:.78rem;color:#b6ab97}
  .nx-head button{margin-left:auto;background:transparent;border:0;color:#b6ab97;font-size:1.4rem;line-height:1;cursor:pointer;padding:0 .2rem}
  .nx-log{flex:1;overflow:auto;padding:1rem;display:flex;flex-direction:column;gap:.7rem}
  .nx-msg{max-width:88%;padding:.6rem .85rem;border-radius:12px;font-size:.94rem;line-height:1.55;white-space:pre-wrap;word-wrap:break-word}
  .nx-msg--bot{background:#fff;border:1px solid #e2d5ba;align-self:flex-start;border-bottom-left-radius:4px}
  .nx-msg--me{background:#6d3fa8;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
  .nx-msg--err{background:#fdeceb;border-color:#f0bdb7;color:#8c2c20}
  .nx-msg b{font-weight:700}
  .nx-samples{display:flex;flex-wrap:wrap;gap:.4rem;padding:0 1rem .7rem}
  .nx-samples button{border:1px solid #e2d5ba;background:#fff;border-radius:999px;padding:.35rem .75rem;
    font:inherit;font-size:.82rem;cursor:pointer;color:#2a231b}
  .nx-samples button:hover{background:#f1eafb;border-color:#6d3fa8;color:#4c2a78}
  .nx-form{display:flex;gap:.5rem;padding:.7rem;border-top:1px solid #e2d5ba;background:#f4ecdc}
  .nx-form textarea{flex:1;resize:none;border:1px solid #e2d5ba;border-radius:10px;padding:.55rem .7rem;
    font:inherit;font-size:.94rem;max-height:110px;background:#fff;color:#2a231b}
  .nx-form button{border:0;border-radius:10px;background:#6d3fa8;color:#fff;font:inherit;font-weight:600;
    padding:0 1rem;cursor:pointer}
  .nx-form button:disabled{opacity:.5;cursor:default}
  .nx-foot{padding:.45rem 1rem .6rem;font-size:.72rem;color:#6d6151;background:#f4ecdc;display:flex;align-items:center;gap:.35rem}
  .nx-foot img{width:14px;height:14px}
  .nx-dots span{display:inline-block;width:6px;height:6px;margin-right:3px;border-radius:50%;background:#b6ab97;
    animation:nxb 1.2s infinite ease-in-out}
  .nx-dots span:nth-child(2){animation-delay:.15s}
  .nx-dots span:nth-child(3){animation-delay:.3s}
  @keyframes nxb{0%,80%,100%{opacity:.3}40%{opacity:1}}
  @media (max-width:520px){.nx-panel{left:.5rem;right:.5rem;bottom:.5rem;width:auto;height:min(76vh,560px)}
    .nx-launch{left:.75rem;bottom:.75rem;padding:.7rem 1rem;font-size:.9rem}}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(style);

  /* ---------- DOM ---------- */

  const launch = document.createElement('button');
  launch.type = 'button';
  launch.className = 'nx-launch';
  launch.innerHTML = `<span class="nx-spark" aria-hidden="true"></span><span class="nx-launch-t"></span>`;

  const panel = document.createElement('section');
  panel.className = 'nx-panel';
  panel.hidden = true;
  panel.setAttribute('aria-label', 'Manjula assistant');
  panel.innerHTML = `
    <header class="nx-head">
      <div><h3></h3><p></p></div>
      <button type="button" class="nx-close" aria-label="Close">×</button>
    </header>
    <div class="nx-log" role="log" aria-live="polite"></div>
    <div class="nx-samples"></div>
    <form class="nx-form">
      <textarea rows="1"></textarea>
      <button type="submit"></button>
    </form>
    <p class="nx-foot">
      <img src="assets/img/brahmexa-logo.png" alt="">
      <span class="nx-power"></span>
    </p>`;

  document.body.append(launch, panel);

  const log     = panel.querySelector('.nx-log');
  const samples = panel.querySelector('.nx-samples');
  const form    = panel.querySelector('.nx-form');
  const input   = form.querySelector('textarea');
  const sendBtn = form.querySelector('button');

  /* ---------- copy, refreshed whenever the page language changes ---------- */

  function paintCopy() {
    const c = t();
    launch.querySelector('.nx-launch-t').textContent = c.launch;
    panel.querySelector('h3').textContent = c.title;
    panel.querySelector('.nx-head p').textContent = c.sub;
    input.placeholder = c.placeholder;
    sendBtn.textContent = c.send;
    panel.querySelector('.nx-close').setAttribute('aria-label', c.close);
    panel.querySelector('.nx-power').textContent = `${c.poweredBy} Nexus · Brahmexa`;

    samples.innerHTML = '';
    c.samples.forEach((q) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = q;
      b.addEventListener('click', () => { input.value = q; send(); });
      samples.append(b);
    });
  }

  // The language switch lives in site.js and just flips an attribute, so
  // watching the attribute is enough — no coupling between the two files.
  new MutationObserver(() => {
    paintCopy();
    if (!opened) log.innerHTML = '';
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });

  /* ---------- messages ---------- */

  function scroll() { log.scrollTop = log.scrollHeight; }

  function addMsg(who, text, opts = {}) {
    const el = document.createElement('div');
    el.className = `nx-msg nx-msg--${who}` + (opts.error ? ' nx-msg--err' : '');
    el.textContent = text;
    log.append(el);
    scroll();
    return el;
  }

  /* Minimal formatting: the model returns **bold** and newlines and nothing
     else worth rendering. Everything is inserted as text nodes; the only
     markup this builds is <b>, so a model response cannot inject HTML. */
  function format(el, raw) {
    el.textContent = '';
    raw.split(/(\*\*[^*]+\*\*)/g).forEach((chunk) => {
      if (chunk.startsWith('**') && chunk.endsWith('**') && chunk.length > 4) {
        const b = document.createElement('b');
        b.textContent = chunk.slice(2, -2);
        el.append(b);
      } else if (chunk) {
        el.append(document.createTextNode(chunk));
      }
    });
  }

  async function send() {
    const text = input.value.trim();
    if (!text || busy) return;
    busy = true; sendBtn.disabled = true;
    input.value = ''; input.style.height = 'auto';
    addMsg('me', text);

    const thinking = document.createElement('div');
    thinking.className = 'nx-msg nx-msg--bot nx-dots';
    thinking.innerHTML = '<span></span><span></span><span></span>';
    log.append(thinking); scroll();

    try {
      const res = await fetch(STREAM, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      });

      thinking.remove();

      if (!res.ok) {
        addMsg('bot', (res.status === 403 || res.status === 404) ? t().errOrigin : t().errServer, { error: true });
        return;
      }

      const bubble = addMsg('bot', '');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '', full = '';

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          if (data.startsWith('{')) {
            try {
              const meta = JSON.parse(data);
              if (meta.session_id) {
                sessionId = meta.session_id;
                try { sessionStorage.setItem(SESS_KEY, sessionId); } catch (e) { /* private mode */ }
              }
            } catch (_) { /* a stray brace is not worth breaking the stream for */ }
            continue;
          }
          full += data;
          format(bubble, full);
          scroll();
        }
      }

      if (!full.trim()) {
        bubble.classList.add('nx-msg--err');
        bubble.textContent = t().errServer;
      }
    } catch (err) {
      thinking.remove();
      addMsg('bot', t().errNet, { error: true });
    } finally {
      busy = false; sendBtn.disabled = false; input.focus();
    }
  }

  /* ---------- wiring ---------- */

  form.addEventListener('submit', (e) => { e.preventDefault(); send(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 110) + 'px';
  });

  function toggle(on) {
    panel.hidden = !on;
    launch.hidden = on;
    if (on) {
      if (!opened) { opened = true; addMsg('bot', t().opener); }
      input.focus();
    }
  }
  launch.addEventListener('click', () => toggle(true));
  panel.querySelector('.nx-close').addEventListener('click', () => toggle(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) toggle(false); });

  paintCopy();

})();
