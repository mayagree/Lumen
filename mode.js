// How much Lumen leads, set on the Me page: guided (voice + picks), quiet (picks in red, no voice), off (you choose everything).
(() => { let m = 'guided'; try { m = localStorage.getItem('lumenMode') || 'guided'; } catch (e) {}
  const u = new URLSearchParams(location.search).get('mode'); if (u) m = u;
  window.LUMEN_MODE = m; document.documentElement.dataset.lumen = m; })();
// For exports: ?scroll=N scrolls the page's main scroller once it has settled.
(() => { const n = new URLSearchParams(location.search).get('scroll'); if (!n) return;
  addEventListener('load', () => setTimeout(() => { const sc = document.querySelector('#scroll, .scroll'); if (sc) sc.scrollTop = +n; }, 1500)); })();
// ?export=1: for screenshots: no side panels, and anything still waiting to fade in is shown.
(() => { if (!new URLSearchParams(location.search).get('export')) return;
  const st = document.createElement('style'); st.textContent = '.controls{display:none!important} body{gap:0!important}' + (new URLSearchParams(location.search).get('export') === '2' ? ' .phone *{transition-duration:0s!important;transition-delay:0s!important}' : '');
  document.head.appendChild(st);
  addEventListener('load', () => setTimeout(() => { const ph = document.getElementById('phone'); if (ph) ph.classList.remove('in', 'reveal', 'arrive'); }, 1200)); })();
// ?tall=1: for long exports: the phone grows to its full content, fixed bars stay at its bottom.
(() => { if (!new URLSearchParams(location.search).get('tall')) return;
  const st = document.createElement('style');
  st.textContent = 'body{align-items:flex-start!important;min-height:0!important} .phone{height:auto!important;min-height:844px} .phone .scroll, .phone #scroll{position:relative!important;inset:auto!important;height:auto!important;overflow:visible!important} .space{height:412px!important;min-height:0!important}';
  document.head.appendChild(st); })();
// Everything you can tap gives way a little under your finger, even where nothing happens yet (Navigate, Settings…).
(() => { const st = document.createElement('style');
  st.textContent = '.pill, .tile.settings, .tap, .tonight, .tile.rate, .drinks button, .opts button { transition: transform .18s ease, filter .18s ease; } .pill:active, .tile.settings:active, .tap:active, .tonight:active, .tile.rate:active, .drinks button:active, .opts button:active { transform: scale(.96); filter: brightness(1.2); }';
  document.head.appendChild(st); })();
// Outside this computer (the published site), the side panels for comparing versions never show.
(() => { if (/^(localhost|127\.0\.0\.1|192\.168\.)/.test(location.hostname)) return;
  const st = document.createElement('style'); st.textContent = '.controls{display:none!important} body{gap:0!important}'; document.head.appendChild(st); })();
// For exports: ?act=click:SELECTOR|wait:MS|... runs taps in order once the page has settled.
(() => { const a = new URLSearchParams(location.search).get('act'); if (!a) return;
  addEventListener('load', () => setTimeout(async () => {
    for (const step of a.split('|')) { const i = step.indexOf(':'), k = step.slice(0, i), v = step.slice(i + 1);
      if (k === 'wait') await new Promise(r => setTimeout(r, +v));
      if (k === 'click') { const el = document.querySelector(v); if (el) el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); await new Promise(r => setTimeout(r, 350)); } } }, 1800)); })();
// The phone frame clips everything inside it at its rounded corners, also glows that blur or scale (overflow alone can leak there).
(() => { const st = document.createElement('style');
  st.textContent = '.phone{clip-path:inset(0 round 46px)} @media (max-width:700px){.phone{clip-path:none}}';
  document.head.appendChild(st); })();
// For exports: ?booked=1 starts the page as if a ticket was already bought.
(() => { if (new URLSearchParams(location.search).get('booked')) try { sessionStorage.setItem('lumenBooked', '1'); } catch (e) {} })();
// For exports only: ?hold=voice keeps Lumen speaking (full glow) once it starts, so the shot never lands mid-fade.
(() => { if (new URLSearchParams(location.search).get('hold') !== 'voice') return;
  const keep = el => { if (!el) return; let on = el.classList.contains('speaking');
    new MutationObserver(() => { if (el.classList.contains('speaking')) on = true; else if (on) el.classList.add('speaking'); })
      .observe(el, { attributes: true, attributeFilter: ['class'] }); };
  keep(document.documentElement); addEventListener('DOMContentLoaded', () => keep(document.getElementById('phone'))); })();
// For exports only: the capturing browser can wait forever for web fonts, so "fonts ready" also fires after 1.5s.
(() => { if (!new URLSearchParams(location.search).get('export')) return;
  try { const f = document.fonts, orig = f.ready; Object.defineProperty(f, 'ready', { configurable: true, get: () => Promise.race([orig, new Promise(r => setTimeout(() => r(f), 1500))]) }); } catch (e) {} })();
// For exports only: some capturing browsers never run animation frames, so frames also run on a timer.
(() => { if (!new URLSearchParams(location.search).get('export')) return;
  const raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = cb => { let done = false; const go = t => { if (!done) { done = true; cb(t); } };
    raf(go); setTimeout(() => go(performance.now()), 20); return 0; }; })();
// For exports only: CSS animations jump to their end, since the capturing browser may not play them.
(() => { if (!new URLSearchParams(location.search).get('export')) return;
  const st = document.createElement('style'); st.textContent = '.phone *, .phone *::before, .phone *::after { animation-duration: .001s !important; animation-delay: 0s !important; animation-iteration-count: 1 !important; animation-fill-mode: both !important; }';
  document.head.appendChild(st); })();
