// On a phone, the first touch on each page hides the browser bars (full screen), for testing the real proportions.
(() => {
  if (window.parent !== window || innerWidth > 700) return;
  const el = document.documentElement;
  const go = () => { if (!document.fullscreenElement && el.requestFullscreen) el.requestFullscreen({ navigationUI: 'hide' }).catch(() => {}); };
  addEventListener('pointerdown', go, { capture: true });
})();
