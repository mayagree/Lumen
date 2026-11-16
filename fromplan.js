// Opened from "Plan my night": back (and the step's main button) lead back to the plan, not home or the next booking step.
(() => {
  if (new URLSearchParams(location.search).get('from') !== 'plan') return;
  const back = 'plan-design.html?v=e&back=1';
  const fix = () => {
    document.querySelectorAll('.back, #stickyBack, .sticky a').forEach(a => { a.setAttribute('href', back);
      a.addEventListener('click', e => { e.preventDefault(); e.stopImmediatePropagation(); location.href = back; }, true); });
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fix) : fix();
})();
