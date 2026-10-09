/**
 * ByteRef — theme-init.js
 * Carregado no <head>, antes do CSS: aplica o tema salvo antes da primeira
 * pintura para não "piscar" o tema errado.
 */
(function () {
  var saved = null;
  try { saved = localStorage.getItem('sr-theme'); } catch (e) { /* storage bloqueado */ }
  var prefersLight = window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches;
  document.documentElement.dataset.theme = saved || (prefersLight ? 'light' : 'dark');
})();
