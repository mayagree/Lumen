// Sideways rails also follow a mouse drag (touch already works). A drag doesn't count as a tap.
// On release the rail settles on the next card in the direction you dragged, so you can always go back.
(() => {
  const SEL = '.row, .rail, .filters';
  let el = null, x0 = 0, l0 = 0, moved = false, id = null;
  const end = () => {
    if (!el) return; const r = el; el = null; r.style.cursor = '';
    if (!moved) return;
    const dir = Math.sign(l0 - r.scrollLeft) * -1, pad = parseFloat(getComputedStyle(r).paddingLeft) || 0;
    const kids = [...r.children].filter(c => c.offsetWidth), stops = kids.map(c => c.offsetLeft - r.offsetLeft - pad);
    let to = r.scrollLeft;
    if (stops.length) { const cur = r.scrollLeft;
      to = dir > 0 ? (stops.find(s => s > cur + 4) ?? stops[stops.length - 1]) : ([...stops].reverse().find(s => s < cur - 4) ?? 0); }
    to = Math.max(0, Math.min(r.scrollWidth - r.clientWidth, to));
    r.scrollTo({ left: to, behavior: 'smooth' });
    setTimeout(() => r.style.scrollSnapType = '', 450);
  };
  addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const r = e.target.closest(SEL); if (!r || r.scrollWidth <= r.clientWidth + 2) return;
    end(); el = r; x0 = e.clientX; l0 = r.scrollLeft; moved = false; id = e.pointerId;
  });
  addEventListener('pointermove', e => {
    if (!el) return; if (!(e.buttons & 1)) { end(); return; }
    const d = e.clientX - x0;
    if (!moved && Math.abs(d) > 5) { moved = true; el.style.scrollSnapType = 'none'; el.style.cursor = 'grabbing'; }
    if (moved) { el.scrollLeft = l0 - d; e.preventDefault(); }
  });
  ['pointerup', 'pointercancel', 'blur'].forEach(t => addEventListener(t, end));
  addEventListener('click', e => { if (moved && e.target.closest(SEL)) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  addEventListener('dragstart', e => { if (e.target.closest(SEL)) e.preventDefault(); });
})();
