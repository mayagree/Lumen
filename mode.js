// How much Lumen leads, set on the Me page: guided (voice + picks), quiet (picks in red, no voice), off (you choose everything).
(() => { let m = 'guided'; try { m = localStorage.getItem('lumenMode') || 'guided'; } catch (e) {}
  window.LUMEN_MODE = m; document.documentElement.dataset.lumen = m; })();
