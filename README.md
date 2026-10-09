# ByteRef — DevOps & Backend Reference

> Referência técnica rápida para engenheiros: comandos reais, erros comuns e fixes direto ao ponto.

![Dark/Light Mode](https://img.shields.io/badge/Tema-Dark%20%2F%20Light-f0a500?style=flat-square)
![Tecnologias](https://img.shields.io/badge/Tecnologias-15-3dd68c?style=flat-square)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?style=flat-square)
[![Contribuições](https://img.shields.io/badge/Contribuições-Bem%20vindas-brightgreen?style=flat-square)](https://github.com/mariaclarasanchez/ByteRef/blob/main/CONTRIBUTING.md)

---

## 📖 Descrição

**ByteRef** é uma referência técnica rápida para engenheiros **DevOps, Backend, Dados e IA**, com foco em consulta eficiente e sem enrolação. Layout de **tabela densa** com comandos reais, erros comuns e fixes direto ao ponto.

### ✨ Features

- **📍 Página Inicial**: Tecnologias agrupadas por área (Cloud & DevOps, Terminal, Backend & Bancos, Dados, IA & LLM)
- **🧱 Estrutura padrão por página**: Resumo → Conceitos-chave → Como funciona (diagramas) → Comandos → Armadilhas → Links oficiais
- **🗺️ Diagramas Mermaid**: Fluxos e arquiteturas desenhados no navegador, nas cores do tema, com descrição em texto quando estiver offline
- **📊 Tabelas Densas**: Descrição ↔ Código com botão de cópia (⧉) em cada linha
- **🔍 Busca Real-time**: Filtra e destaca comandos na página atual (na home, filtra as tecnologias)
- **🌓 Dark/Light Mode**: Alterável com um clique, persistente e sem "piscar" ao carregar
- **⚙️ Seções Colapsáveis**: Cada área da página pode ser recolhida (mouse ou teclado)
- **🧩 Vitrine de Componentes**: [`src/pages/componentes.html`](src/pages/componentes.html) com markup pronto para copiar
- **♿ Acessível & Responsivo**: Contraste AA nos dois temas, foco visível, funciona em 375px
- **⌨️ Atalhos**: `/` para buscar, `Esc` para limpar
- **🚀 Production-ready**: Static HTML/CSS/JS, sem build; única dependência externa é o Mermaid (CDN), carregado só em páginas com diagrama

🌐 **Acesse online:** [https://mariaclarasanchez.github.io/ByteRef/](https://mariaclarasanchez.github.io/ByteRef/)

---

## 🛠 Tecnologias Cobertas

| #  | Grupo                  | Tecnologia            | Destaques                                                        |
|----|------------------------|-----------------------|------------------------------------------------------------------|
| 1  | Cloud & DevOps         | ☁️ GCP                 | gcloud, IAM, Cloud Run, Compute Engine, Storage, Artifact Registry |
| 2  | Cloud & DevOps         | 🚢 Kubernetes          | Pods, Deployments, Services, rollout/rollback, ConfigMaps        |
| 3  | Cloud & DevOps         | 🐳 Docker              | Build, imagens, containers, registry, volumes, Compose           |
| 4  | Terminal & Ferramentas | 💻 CLI / Bash          | Pipes, redirecionamento, processos, SSH, grep/awk/sed            |
| 5  | Terminal & Ferramentas | 🐙 Git / GitHub        | Commits, branches, merge/rebase, PRs, stash, correções rápidas   |
| 6  | Terminal & Ferramentas | 📦 Poetry              | pyproject, lock, ambientes, build & publish                      |
| 7  | Backend & Bancos       | 🌶️ Flask               | Rotas, blueprints, contexto de app, extensões, deploy WSGI       |
| 8  | Backend & Bancos       | 🐘 PostgreSQL          | Índices, MVCC, EXPLAIN ANALYZE, window functions, backup         |
| 9  | Backend & Bancos       | 🐬 MySQL               | InnoDB, índices, replicação, mysqldump, utf8mb4                  |
| 10 | Backend & Bancos       | ⚡ Redis               | Tipos de dados, TTL, pub/sub, persistência, cache-aside          |
| 11 | Dados                  | 🐼 Pandas              | DataFrame, seleção, groupby, merge, exportação                   |
| 12 | Dados                  | 🎈 Streamlit           | Widgets, rerun, cache, session state, secrets                    |
| 13 | IA & LLM               | 🤖 LLMs & APIs         | Tokens, contexto, streaming, effort, caching, rate limits        |
| 14 | IA & LLM               | 📚 RAG & Embeddings    | Embeddings, chunking, pgvector, busca e resposta com fontes      |
| 15 | IA & LLM               | 🛠️ Agentes & Tool Use  | Ferramentas, loop do agente, MCP, confirmação humana             |

---

## 🚀 Como Usar Localmente

Zero build, zero dependências. Clone e abra direto no navegador:

```bash
git clone https://github.com/mariaclarasanchez/ByteRef.git
cd ByteRef

# Abrir no navegador
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows (PowerShell)
```

Ou com um servidor local:

```bash
# Python 3
python3 -m http.server 8000
# Acesse: http://localhost:8000

# Node.js (com http-server)
npx http-server . -p 8000
```

### ⌨️ Atalhos de Teclado

| Tecla / Ação           | Função                              |
|------------------------|-------------------------------------|
| **`/`**                | Abre e foca a barra de busca        |
| **`Esc`**              | Limpa busca / fecha sidebar mobile  |
| **Clique no título**   | Colapsa/expande a seção             |
| **`⧉` (botão)**        | Copia comando para o clipboard      |
| **Clique no `≡`**      | Abre/fecha sidebar em mobile        |

---

## 📁 Estrutura do Projeto

```
ByteRef/
├─ src/
│  ├─ css/
│  │  ├─ style.css          Entrada única (importa os 4 arquivos abaixo)
│  │  ├─ tokens.css         Cores, espaçamentos e tipografia (dark/light)
│  │  ├─ base.css           Reset, foco visível, movimento reduzido
│  │  ├─ layout.css         Sidebar, topbar, conteúdo, rodapé
│  │  └─ components.css     Áreas da página, tabelas, callouts, cards…
│  ├─ js/
│  │  ├─ theme-init.js      Aplica o tema salvo antes da página aparecer
│  │  ├─ registry.js        Lista de tecnologias (fonte única da navegação)
│  │  ├─ diagrams.js        Carrega o Mermaid sob demanda e desenha os diagramas
│  │  └─ script.js          Sidebar, home, busca, tema, cópia, atalhos
│  └─ pages/                Subpáginas por tecnologia
│     ├─ componentes.html   🧩 Vitrine de componentes para contribuidores
│     ├─ agents.html        IA & LLM: agentes e tool use
│     ├─ llm-apis.html      IA & LLM: chamadas de API
│     ├─ rag.html           IA & LLM: RAG e embeddings
│     ├─ streamlit.html     Dados: apps com Streamlit
│     ├─ bash.html
│     ├─ docker.html
│     ├─ flask.html
│     ├─ gcp.html
│     ├─ git.html
│     ├─ kubernetes.html
│     ├─ mysql.html
│     ├─ pandas.html
│     ├─ poetry.html
│     ├─ postgresql.html
│     └─ redis.html
├─ index.html               🏠 Página inicial com cards de navegação
└─ README.md
```

Cada página em `src/pages/` segue o mesmo esqueleto e referencia o CSS e JS centralizados. A sidebar e os cards da home são gerados a partir de `src/js/registry.js`, então não há listas de links duplicadas nas páginas.

---

## 🤝 Contribuições

Contribuições são muito bem-vindas! A branch `main` está protegida — todas as mudanças devem passar por **Pull Request**.

### 1. Fork & Clone

```bash
git clone https://github.com/mariaclarasanchez/ByteRef.git
cd ByteRef
git checkout -b feature/minha-contribuicao
```

### 2. Fazer Mudanças

#### Adicionar um comando simples

Em qualquer `src/pages/*.html`, encontre a seção desejada e adicione uma linha na tabela:

```html
<tr>
  <td class="desc">O que este comando faz</td>
  <td class="code">
    <code>seu-comando --com-flags</code>
    <button class="cp" data-c="seu-comando --com-flags">⧉</button>
  </td>
</tr>
```

#### Adicionar um bloco de comandos, aviso, conceito ou diagrama

Abra a vitrine [`src/pages/componentes.html`](src/pages/componentes.html), copie o markup do componente (botão ⧉ do bloco "HTML") e cole na área certa da página. Exemplo de bloco de comandos, dentro de `<div class="ref-grid">`:

```html
<div class="ref-block">
  <h3 class="ref-block-title">🤔 Sua Nova Seção</h3>
  <table class="cmd-table">
    <!-- linhas de comando aqui -->
  </table>
</div>
```

#### Adicionar um diagrama

Na área "Como funciona" da página, cole o componente de diagrama da vitrine:

```html
<figure class="diagram" data-diagram>
  <div class="diagram-body">
    <script type="text/plain" class="diagram-src">
flowchart LR
  A[Dockerfile] -->|docker build| B[(Imagem)]
  B -->|docker run| C[Container]
    </script>
    <p class="diagram-fallback">Descrição do mesmo fluxo em texto (aparece se o diagrama não carregar).</p>
  </div>
  <figcaption>Uma frase dizendo o que observar.</figcaption>
</figure>
```

Use [Mermaid](https://mermaid.js.org/) (`flowchart`, `sequenceDiagram`, `gitGraph`…) sem cores fixas: elas vêm do tema. A página precisa incluir `<script src="../js/diagrams.js"></script>` depois do `script.js`. Teste a sintaxe no [Mermaid Live Editor](https://mermaid.live/).

#### Avisos em comandos perigosos

Comandos destrutivos (`rm -rf`, `DROP`, `push --force`, `prune`…) devem vir com um aviso `<aside class="callout" data-kind="danger">`. Não use `style=""` nem `<style>` nas páginas: todo estilo vem do CSS compartilhado.

#### Adicionar uma nova tecnologia

1. Copie uma página em `src/pages/` (ex: `redis.html`), renomeie para `<id>.html` e ajuste `<title>`, `<body data-tech-id="<id>">`, o hero e o conteúdo
2. Adicione uma entrada em `TECHS` no `src/js/registry.js` (`id`, `name`, `icon`, `tagline`, `group`, `page`, `cmds`)

Pronto: a sidebar, a home e as contagens se atualizam sozinhas.

### 3. Testar Localmente

```bash
open index.html  # ou use um servidor HTTP local
```

### 4. Commit & Pull Request

```bash
git add .
git commit -m "feat: Adiciona [X] comandos para [Tecnologia]"
git push origin feature/minha-contribuicao
```

Abra um Pull Request em [github.com/mariaclarasanchez/ByteRef/pulls](https://github.com/mariaclarasanchez/ByteRef/pulls) descrevendo sua mudança.

---

## 💫 FAQ

**P: Posso adicionar uma nova tecnologia?**  
R: Sim! Siga o passo "Adicionar uma nova tecnologia" acima.

**P: Como mudo o tema/cores?**  
R: Edite os tokens em `src/css/tokens.css` (`:root` para o tema escuro, `:root[data-theme="light"]` para o claro). Mantenha contraste ≥ 4.5:1.

**P: Posso hospedar em outro lugar?**  
R: Sim, é 100% estático! Suba o repositório para qualquer host (Vercel, Netlify, etc.).

**P: E sem internet?**  
R: Tudo funciona, exceto o desenho dos diagramas (o Mermaid vem do jsDelivr, versão fixada 12.1.0). No lugar de cada diagrama aparece a descrição em texto.

---

## Licença

MIT © 2026