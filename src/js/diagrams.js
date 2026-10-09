/**
 * ByteRef — diagrams.js
 * Desenha os diagramas Mermaid de figure.diagram[data-diagram].
 *
 * - Carrega o Mermaid só se a página tiver diagramas, depois do resto do conteúdo.
 * - Cores vêm dos tokens CSS do tema ativo; redesenha ao trocar o tema.
 * - Se o Mermaid não carregar (offline) ou um diagrama tiver erro, a descrição
 *   textual (.diagram-fallback) continua visível. Nunca mostra erro técnico.
 *
 * Contrato: specs/002-concept-summaries-diagrams/contracts/diagram.md
 */
(function () {
  const MERMAID_URL = 'https://cdn.jsdelivr.net/npm/mermaid@12.1.0/dist/mermaid.esm.min.mjs';

  const figures = [...document.querySelectorAll('figure.diagram[data-diagram]')];
  if (!figures.length) return;

  let mermaid = null;
  let renderSeq = 0;

  figures.forEach(fig => { fig.dataset.state = 'loading'; });

  function token(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function themeVariables() {
    const bg = token('--diagram-bg');
    const node = token('--diagram-node');
    const line = token('--diagram-line');
    const text = token('--diagram-text');
    const accent = token('--accent');
    const onAccent = token('--on-accent');
    const border = token('--border');
    const info = token('--info');
    const tip = token('--tip');
    const warn = token('--warn');
    const muted = token('--surface-2');

    return {
      background: bg,
      fontFamily: token('--font-mono'),
      fontSize: '13px',
      textColor: text,
      primaryColor: node,
      primaryTextColor: text,
      primaryBorderColor: accent,
      secondaryColor: muted,
      secondaryTextColor: text,
      secondaryBorderColor: border,
      tertiaryColor: bg,
      tertiaryTextColor: text,
      tertiaryBorderColor: border,
      lineColor: line,
      edgeLabelBackground: bg,
      clusterBkg: muted,
      clusterBorder: border,
      titleColor: text,
      nodeTextColor: text,
      // sequenceDiagram
      actorBkg: node,
      actorBorder: accent,
      actorTextColor: text,
      actorLineColor: line,
      signalColor: line,
      signalTextColor: text,
      labelBoxBkgColor: node,
      labelBoxBorderColor: border,
      labelTextColor: text,
      loopTextColor: text,
      noteBkgColor: muted,
      noteBorderColor: border,
      noteTextColor: text,
      activationBkgColor: muted,
      activationBorderColor: accent,
      // gitGraph
      git0: accent, git1: info, git2: tip, git3: warn,
      git4: accent, git5: info, git6: tip, git7: warn,
      gitBranchLabel0: onAccent, gitBranchLabel1: bg, gitBranchLabel2: bg, gitBranchLabel3: bg,
      gitBranchLabel4: onAccent, gitBranchLabel5: bg, gitBranchLabel6: bg, gitBranchLabel7: bg,
      commitLabelColor: text,
      commitLabelBackground: muted,
      tagLabelColor: text,
      tagLabelBackground: muted,
      tagLabelBorder: border,
    };
  }

  function configure() {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      suppressErrorRendering: true,
      theme: 'base',
      themeVariables: themeVariables(),
      flowchart: { htmlLabels: false, curve: 'basis', useMaxWidth: false },
      sequence: { mirrorActors: false, useMaxWidth: false },
      gitGraph: { mainBranchName: 'main', useMaxWidth: false },
    });
  }

  async function renderOne(fig) {
    const body = fig.querySelector('.diagram-body');
    const src = fig.querySelector('.diagram-src');
    const fallback = fig.querySelector('.diagram-fallback');
    if (!body || !src) return;

    try {
      const id = `dg-${++renderSeq}`;
      const { svg } = await mermaid.render(id, src.textContent.trim());
      body.querySelector(':scope > svg')?.remove();
      body.insertAdjacentHTML('beforeend', svg);
      const el = body.querySelector(':scope > svg');
      el.setAttribute('role', 'img');
      if (fallback) {
        el.setAttribute('aria-label', fallback.textContent.trim());
        fallback.classList.add('visually-hidden');
      }
      fig.dataset.state = 'rendered';
      fig.dataset.themeRendered = document.documentElement.dataset.theme;
    } catch (err) {
      // Mantém a descrição textual; erro só no console para quem mantém o site
      body.querySelector(':scope > svg')?.remove();
      fallback?.classList.remove('visually-hidden');
      fig.dataset.state = 'failed';
      console.warn('[ByteRef] diagrama não renderizado:', fig.querySelector('figcaption')?.textContent, err);
    }
  }

  async function renderAll() {
    for (const fig of figures) await renderOne(fig);
  }

  async function start() {
    try {
      ({ default: mermaid } = await import(MERMAID_URL));
    } catch (err) {
      figures.forEach(fig => { fig.dataset.state = 'failed'; });
      console.warn('[ByteRef] Mermaid indisponível; exibindo descrições textuais dos diagramas.');
      return;
    }
    configure();
    await renderAll();
  }

  document.addEventListener('byteref:themechange', () => {
    if (!mermaid) return;
    configure();
    renderAll();
  });

  const idle = window.requestIdleCallback || (cb => setTimeout(cb, 200));
  const begin = () => idle(start, { timeout: 1500 });

  if (document.readyState === 'complete') begin();
  else window.addEventListener('load', begin, { once: true });
})();
