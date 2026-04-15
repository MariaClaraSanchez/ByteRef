/**
 * ByteRef — script.js
 * Search, copy, collapse, active nav, theme toggle, cmd counter
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

/* ─── COUNT COMMANDS ─── */
function countCommands() {
  const count = document.querySelectorAll('.cp').length;
  if (cmdCountEl) cmdCountEl.textContent = `${count} comandos`;
}

function countTechnologies() {
  const count = document.querySelectorAll('.nav-link').length;
  if (techCountEl) techCountEl.textContent = `${count} tecnologia${count === 1 ? '' : 's'}`;
}

countCommands();
const techCount = countTechnologies();

/* ─── SIDEBAR (mobile) ─── */
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});

document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 920) {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    }
  });
});

/* ─── THEME TOGGLE ─── */
const saved = localStorage.getItem('sr-theme');
if (saved === 'light') document.body.classList.add('light');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('sr-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

/* ─── COLLAPSE SECTIONS ─── */
document.querySelectorAll('.section-head').forEach(head => {
  const id   = head.getAttribute('data-toggle');
  const body = head.closest('.tech-section')?.querySelector('.section-body');
  if (!body) return;

  head.addEventListener('click', e => {
    body.classList.toggle('is-collapsed');
    head.classList.toggle('is-collapsed');
  });
});

/* ─── COPY ─── */
let toastTimer;

function handleCopyClick(e) {
  e.preventDefault();
  e.stopPropagation();

  const btn = e.currentTarget;
  const text = btn.dataset.c;
  if (!text) return;

  const copyText = async value => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  copyText(text).then(success => {
    if (!success) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      ta.style.top = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

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
  btn.addEventListener('click', handleCopyClick);
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1600);
}

/* ─── SEARCH ─── */
let searchDebounce;

searchInput.addEventListener('input', () => {
  searchClear.hidden = !searchInput.value;
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(doSearch, 150);
});

searchClear.addEventListener('click', resetSearch);

function doSearch() {
  const q = searchInput.value.trim().toLowerCase();

  removeHighlights();

  if (!q) {
    resetSearch();
    return;
  }

  let total = 0;

  document.querySelectorAll('.tech-section').forEach(section => {
    const text = section.textContent.toLowerCase();

    if (!text.includes(q)) {
      section.classList.add('sr-hidden');
      return;
    }

    section.classList.remove('sr-hidden');

    const body = section.querySelector('.section-body');
    const head = section.querySelector('.section-head');
    if (body) body.classList.remove('is-collapsed');
    if (head) head.classList.remove('is-collapsed');

    section.querySelectorAll('td.desc, td.code code, td.err-label, td.err-fix').forEach(el => {
      total += highlightNode(el, q);
    });
  });

  resultBadge.hidden = false;
  resultBadge.textContent = total ? `${total} resultado${total > 1 ? 's' : ''}` : 'Sem resultados';
}

function resetSearch() {
  searchInput.value = '';
  searchClear.hidden = true;
  resultBadge.hidden = true;
  removeHighlights();

  document.querySelectorAll('.tech-section').forEach(s => s.classList.remove('sr-hidden'));
}

function highlightNode(el, q) {
  let count = 0;

  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let n;
  while ((n = walk.nextNode())) nodes.push(n);

  nodes.forEach(node => {
    const val = node.nodeValue;
    const lower = val.toLowerCase();
    if (!lower.includes(q)) return;

    const frag = document.createDocumentFragment();
    let last = 0;
    let i;
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'gi');

    let match;
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
  document.querySelectorAll('mark.hl').forEach(m => {
    const t = document.createTextNode(m.textContent);
    m.parentNode.replaceChild(t, m);
  });
  document.querySelectorAll('td').forEach(td => td.normalize());
}

/* ─── KEYBOARD SHORTCUTS ─── */
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== searchInput && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
  if (e.key === 'Escape') {
    if (document.activeElement === searchInput) {
      resetSearch();
      searchInput.blur();
    }
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }
});

/* ─── ACTIVE NAV (IntersectionObserver) ─── */
const navLinks = document.querySelectorAll('.nav-link');

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => a.classList.toggle('active', a.dataset.s === id));
    }
  });
}, { rootMargin: `-${52}px 0px -60% 0px`, threshold: 0.01 });

document.querySelectorAll('.tech-section').forEach(s => io.observe(s));

/* ─── SMOOTH SCROLL for nav ─── */
navLinks.forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#' || href?.endsWith('#')) {
      e.preventDefault();
      const target = document.getElementById(a.dataset.s);
      if (!target) return;
      const y = target.getBoundingClientRect().top + scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

/* ─── LOG ─── */
console.log('%c BR ByteRef', 'color:#f0a500;font-size:16px;font-weight:900;font-family:monospace');
console.log(`%c DevOps & Backend Reference · ${techCount} tecnologias`, 'color:#8b95ab;font-size:11px');
