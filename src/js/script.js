/**
 * ByteRef — script.js
 * Navegação (a partir de registry.js), home, tema, colapso de áreas,
 * cópia, busca, atalhos de teclado e contadores.
 */

/* ─── DOM ─── */
const searchInput  = document.getElementById('searchInput');
const searchClear  = document.getElementById('searchClear');
const resultBadge  = document.getElementById('searchResultBadge');
const sidebar      = document.getElementById('sidebar');
const overlay      = document.getElementById('overlay');
const hamburger    = document.getElementById('hamburger');
const themeToggle  = document.getElementById('themeToggle');
const toast        = document.getElementById('toast');
const cmdCountEl   = document.getElementById('cmdCount');
const techCountEl  = document.querySelector('.chip');
const searchEmpty  = document.querySelector('.search-empty');

/* ─── CAMINHOS ─── */
function basePath() {
  return location.pathname.includes('/src/pages/') ? '../../' : '';
}

const groupsWithTechs = TECH_GROUPS.map(group => ({
  ...group,
  techs: TECHS.filter(t => t.group === group.id),
}));

/* ─── SIDEBAR (a partir do registro) ─── */
function renderNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const currentId = document.body.dataset.techId;
  const frag = document.createDocumentFragment();

  groupsWithTechs.forEach(group => {
    if (!group.techs.length) return;

    const label = document.createElement('span');
    label.className = 'nav-group-label';
    label.textContent = group.label;
    frag.appendChild(label);

    group.techs.forEach(tech => {
      const a = document.createElement('a');
      a.className = 'nav-link';
      a.href = basePath() + tech.page;
      a.dataset.s = tech.id;
      a.innerHTML = `<span class="nav-icon" aria-hidden="true">${tech.icon}</span><span>${tech.name}</span>`;
      if (tech.id === currentId) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
      frag.appendChild(a);
    });
  });

  nav.replaceChildren(frag);
}

/* ─── HOME (cards agrupados) ─── */
function renderHome() {
  const container = document.getElementById('techGroups');
  if (!container) return;

  const frag = document.createDocumentFragment();

  groupsWithTechs.forEach(group => {
    const section = document.createElement('section');
    section.className = 'tech-group';
    section.innerHTML = `<h2>${group.label}</h2><div class="tech-grid"></div>`;
    const grid = section.querySelector('.tech-grid');

    if (!group.techs.length) {
      grid.innerHTML = `
        <div class="tech-card is-soon">
          <div class="tech-card-title">Em breve</div>
          <div class="tech-card-desc">Conteúdo de ${group.label} a caminho.</div>
        </div>`;
    }

    group.techs.forEach(tech => {
      const a = document.createElement('a');
      a.className = 'tech-card';
      a.href = tech.page;
      a.dataset.search = `${tech.name} ${tech.tagline} ${group.label}`.toLowerCase();
      a.innerHTML = `
        <div class="tech-card-icon" aria-hidden="true">${tech.icon}</div>
        <div class="tech-card-title">${tech.name}</div>
        <div class="tech-card-desc">${tech.tagline}</div>
        <div class="tech-card-count">${tech.cmds} comandos</div>`;
      grid.appendChild(a);
    });

    frag.appendChild(section);
  });

  container.replaceChildren(frag);
}

/* ─── RODAPÉ ─── */
function renderFooterLink() {
  const footer = document.querySelector('.footer');
  if (!footer || footer.querySelector('.footer-link')) return;
  const a = document.createElement('a');
  a.className = 'footer-link';
  a.href = basePath() + 'src/pages/componentes.html';
  a.textContent = 'Componentes';
  footer.insertBefore(a, cmdCountEl);
}

function updateCounts() {
  if (cmdCountEl) {
    const onHome = document.getElementById('techGroups');
    const count = onHome
      ? TECHS.reduce((sum, t) => sum + t.cmds, 0)
      : document.querySelectorAll('.cp').length;
    cmdCountEl.textContent = `${count} comandos`;
  }
  if (techCountEl) {
    techCountEl.textContent = `${TECHS.length} tecnologia${TECHS.length === 1 ? '' : 's'}`;
  }
}

renderNav();
renderHome();
renderFooterLink();
updateCounts();

/* ─── SIDEBAR (mobile) ─── */
function setSidebar(open) {
  sidebar.classList.toggle('open', open);
  overlay.classList.toggle('show', open);
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}

hamburger.setAttribute('aria-controls', 'sidebar');
setSidebar(false);

hamburger.addEventListener('click', () => {
  const open = !sidebar.classList.contains('open');
  setSidebar(open);
  if (open) searchInput.focus();
});

overlay.addEventListener('click', () => setSidebar(false));

document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 920) setSidebar(false);
  });
});

/* ─── TEMA ─── */
const root = document.documentElement;

function syncThemeButton() {
  themeToggle.setAttribute('aria-label', 'Alternar tema claro/escuro');
  themeToggle.setAttribute('aria-pressed', String(root.dataset.theme === 'light'));
}

syncThemeButton();

themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('sr-theme', root.dataset.theme); } catch { /* storage bloqueado */ }
  syncThemeButton();
  document.dispatchEvent(new CustomEvent('byteref:themechange', { detail: { theme: root.dataset.theme } }));
});

/* ─── COLAPSO DE ÁREAS ─── */
function setAreaExpanded(btn, expanded) {
  const body = document.getElementById(btn.getAttribute('aria-controls'));
  if (!body) return;
  body.classList.toggle('is-collapsed', !expanded);
  btn.setAttribute('aria-expanded', String(expanded));
}

document.querySelectorAll('.page-area .collapse-btn').forEach(btn => {
  btn.setAttribute('aria-label', 'Recolher ou expandir seção');
  btn.addEventListener('click', () => {
    setAreaExpanded(btn, btn.getAttribute('aria-expanded') === 'false');
  });
});

/* ─── CÓPIA ─── */
let toastTimer;

async function writeClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* cai no fallback */
    }
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.className = 'clipboard-fallback';
  ta.style.cssText = 'position:absolute;left:-9999px;top:0';
  document.body.appendChild(ta);
  ta.select();
  ta.setSelectionRange(0, ta.value.length);
  const ok = document.execCommand('copy');
  document.body.removeChild(ta);
  return ok;
}

function handleCopyClick(e) {
  e.preventDefault();
  e.stopPropagation();

  const btn = e.currentTarget;
  const text = btn.dataset.c;
  if (!text) return;

  writeClipboard(text).then(() => {
    btn.classList.add('copied');
    btn.textContent = '✓';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.textContent = '⧉';
    }, 1200);
    showToast('Copiado ✓');
  });
}

document.querySelectorAll('.cp').forEach(btn => {
  if (!btn.hasAttribute('aria-label')) btn.setAttribute('aria-label', 'Copiar comando');
  btn.addEventListener('click', handleCopyClick);
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1600);
}

/* ─── BUSCA ─── */
const HIGHLIGHT_TARGETS = [
  'td.desc', 'td.code code', '.pitfalls td', '.area-body > p', '.summary-list li',
  '.callout', '.concept-card', '.diagram figcaption', '.diagram-fallback', '.code-block pre',
].join(', ');

// Texto visível de um elemento, sem o conteúdo de <script> (ex.: fonte dos diagramas)
function visibleText(el) {
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: node => (node.parentElement.closest('script') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  let text = '';
  let n;
  while ((n = walk.nextNode())) text += n.nodeValue;
  return text;
}

let searchDebounce;

searchInput.addEventListener('input', () => {
  searchClear.hidden = !searchInput.value;
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(doSearch, 150);
});

searchClear.addEventListener('click', () => {
  resetSearch();
  searchInput.focus();
});

function searchableAreas() {
  return document.querySelectorAll('.page-area:not([data-area="hero"])');
}

function doSearch() {
  const q = searchInput.value.trim().toLowerCase();

  removeHighlights();

  if (!q) {
    resetSearch();
    return;
  }

  let total = 0;

  // Home: filtra os cards de tecnologia
  document.querySelectorAll('.tech-card[data-search]').forEach(card => {
    const match = card.dataset.search.includes(q);
    card.hidden = !match;
    total += match;
  });
  document.querySelectorAll('.tech-group').forEach(group => {
    group.hidden = !group.querySelector('.tech-card[data-search]:not([hidden])');
  });

  // Páginas: filtra as áreas e destaca os trechos
  searchableAreas().forEach(area => {
    if (!visibleText(area).toLowerCase().includes(q)) {
      area.classList.add('sr-hidden');
      return;
    }

    area.classList.remove('sr-hidden');
    const btn = area.querySelector('.collapse-btn');
    if (btn) setAreaExpanded(btn, true);

    area.querySelectorAll(HIGHLIGHT_TARGETS).forEach(el => {
      total += highlightNode(el, q);
    });
  });

  resultBadge.hidden = false;
  resultBadge.textContent = total ? `${total} resultado${total > 1 ? 's' : ''}` : 'Sem resultados';
  if (searchEmpty) {
    searchEmpty.hidden = total > 0;
    searchEmpty.textContent = `Nenhum resultado para “${searchInput.value.trim()}”.`;
  }
}

function resetSearch() {
  searchInput.value = '';
  searchClear.hidden = true;
  resultBadge.hidden = true;
  if (searchEmpty) searchEmpty.hidden = true;
  removeHighlights();

  searchableAreas().forEach(a => a.classList.remove('sr-hidden'));
  document.querySelectorAll('.tech-card[data-search], .tech-group').forEach(el => { el.hidden = false; });
}

function highlightNode(el, q) {
  let count = 0;

  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let n;
  while ((n = walk.nextNode())) {
    if (!n.parentElement.closest('mark.hl, button, script')) nodes.push(n);
  }

  const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');

  nodes.forEach(node => {
    const val = node.nodeValue;
    if (!val.toLowerCase().includes(q)) return;

    const frag = document.createDocumentFragment();
    let last = 0;
    let match;
    re.lastIndex = 0;
    while ((match = re.exec(val)) !== null) {
      frag.appendChild(document.createTextNode(val.slice(last, match.index)));
      const mark = document.createElement('mark');
      mark.className = 'hl';
      mark.textContent = match[0];
      frag.appendChild(mark);
      last = match.index + match[0].length;
      count++;
    }

    frag.appendChild(document.createTextNode(val.slice(last)));
    node.parentNode.replaceChild(frag, node);
  });

  return count;
}

function removeHighlights() {
  const parents = new Set();
  document.querySelectorAll('mark.hl').forEach(m => {
    parents.add(m.parentNode);
    m.replaceWith(document.createTextNode(m.textContent));
  });
  parents.forEach(p => p.normalize());
}

/* ─── ATALHOS DE TECLADO ─── */
document.addEventListener('keydown', e => {
  const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);

  if (e.key === '/' && !typing) {
    e.preventDefault();
    if (window.innerWidth <= 920 && !sidebar.classList.contains('open')) setSidebar(true);
    searchInput.focus();
    searchInput.select();
  }

  if (e.key === 'Escape') {
    if (document.activeElement === searchInput) {
      resetSearch();
      searchInput.blur();
    }
    if (sidebar.classList.contains('open')) {
      setSidebar(false);
      hamburger.focus();
    }
  }
});

/* ─── LOG ─── */
console.log('%c BR ByteRef', 'color:#f0a500;font-size:16px;font-weight:900;font-family:monospace');
console.log(`%c DevOps & Backend Reference · ${TECHS.length} tecnologias`, 'color:#8b95ab;font-size:11px');
