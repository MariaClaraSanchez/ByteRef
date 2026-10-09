/**
 * ByteRef — registry.js
 * Fonte única da navegação: sidebar, cards da home e contagem de tecnologias.
 * Para adicionar uma tecnologia: crie src/pages/<id>.html e uma entrada em TECHS.
 * `cmds` = número de botões de cópia (.cp) da página — validado por
 * specs/001-design-system-redesign/scripts/check_pages.sh
 */

const TECH_GROUPS = [
  { id: 'cloud-devops',   label: 'Cloud & DevOps' },
  { id: 'terminal-tools', label: 'Terminal & Ferramentas' },
  { id: 'backend-db',     label: 'Backend & Bancos' },
  { id: 'data',           label: 'Dados' },
  { id: 'ai-llm',         label: 'IA & LLM' },
];

const TECHS = [
  { id: 'gcp', name: 'GCP', icon: '☁️', tagline: 'Google Cloud Platform',
    group: 'cloud-devops', page: 'src/pages/gcp.html', cmds: 26 },
  { id: 'kubernetes', name: 'Kubernetes', icon: '🚢', tagline: 'kubectl & cluster ops',
    group: 'cloud-devops', page: 'src/pages/kubernetes.html', cmds: 23 },
  { id: 'docker', name: 'Docker', icon: '🐳', tagline: 'containers & registry',
    group: 'cloud-devops', page: 'src/pages/docker.html', cmds: 27 },

  { id: 'bash', name: 'CLI / Bash', icon: '💻', tagline: 'produtividade no terminal',
    group: 'terminal-tools', page: 'src/pages/bash.html', cmds: 30 },
  { id: 'git', name: 'Git / GitHub', icon: '🐙', tagline: 'controle de versão & fluxo de PR',
    group: 'terminal-tools', page: 'src/pages/git.html', cmds: 15 },
  { id: 'poetry', name: 'Poetry', icon: '📦', tagline: 'gerenciamento de dependências',
    group: 'terminal-tools', page: 'src/pages/poetry.html', cmds: 40 },

  { id: 'flask', name: 'Flask', icon: '🌶️', tagline: 'web framework Python',
    group: 'backend-db', page: 'src/pages/flask.html', cmds: 30 },
  { id: 'postgresql', name: 'PostgreSQL', icon: '🐘', tagline: 'psql & SQL avançado',
    group: 'backend-db', page: 'src/pages/postgresql.html', cmds: 41 },
  { id: 'mysql', name: 'MySQL', icon: '🐬', tagline: 'queries & administração',
    group: 'backend-db', page: 'src/pages/mysql.html', cmds: 41 },
  { id: 'redis', name: 'Redis', icon: '⚡', tagline: 'cache, filas e pub/sub',
    group: 'backend-db', page: 'src/pages/redis.html', cmds: 23 },

  { id: 'pandas', name: 'Pandas', icon: '🐼', tagline: 'análise de dados Python',
    group: 'data', page: 'src/pages/pandas.html', cmds: 47 },
];
