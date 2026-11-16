// The countdown ticks once a minute; a digit that changes rolls: the old one rises and blurs away, the new one rises in.
// ?fast=1 makes a minute last 3 seconds, for showing it.
(() => {
  const STEP = new URLSearchParams(location.search).get('fast') ? 3000 : 60000;
  const css = document.createElement('style');
  css.textContent = `.dg { display: inline-block; position: relative; overflow: hidden; vertical-align: bottom; }
    .dg i { display: inline-block; font-style: normal; }
    .dg i.out { position: absolute; left: 0; top: 0; animation: dg-out .7s cubic-bezier(.4,0,.2,1) forwards; }
    .dg i.in { animation: dg-in .7s cubic-bezier(.2,.8,.2,1); }
    @keyframes dg-out { to { transform: translateY(-70%); opacity: 0; filter: blur(4px); } }
    @keyframes dg-in { from { transform: translateY(70%); opacity: 0; filter: blur(4px); } }`;
  document.head.appendChild(css);
  const parts = m => m >= 60 ? [String(Math.floor(m / 60)), 'h', String(m % 60).padStart(2, '0'), 'm'] : [String(m), 'min'];
  const html = m => parts(m).map(p => /\d/.test(p) ? [...p].map(d => `<span class="dg"><i>${d}</i></span>`).join('') : `<small>${p}</small>`).join('');
  const roll = (el, m) => {
    const next = document.createElement('div'); next.innerHTML = html(m);
    const a = el.querySelectorAll('.dg'), b = next.querySelectorAll('.dg');
    if (a.length !== b.length || el.querySelectorAll('small').length !== next.querySelectorAll('small').length) { el.innerHTML = next.innerHTML; return; }
    b.forEach((nd, i) => { const od = a[i], o = od.querySelector('i:not(.out)'), n = nd.textContent;
      if (o.textContent === n) return;
      o.className = 'out'; const ni = document.createElement('i'); ni.className = 'in'; ni.textContent = n; od.appendChild(ni);
      setTimeout(() => o.remove(), 750); });
  };
  const timers = new Map();
  window.lumenStop = el => clearInterval(timers.get(el));
  window.lumenCount = (el, m) => {
    if (!el) return; clearInterval(timers.get(el)); el.innerHTML = html(m); el.dataset.m = m;
    timers.set(el, setInterval(() => { const v = Math.max(0, +el.dataset.m - 1); el.dataset.m = v; roll(el, v); }, STEP));
  };
})();
