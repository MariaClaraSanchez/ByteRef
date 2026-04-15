# ByteRef — DevOps & Backend Reference

> Referência técnica rápida para engenheiros: comandos reais, erros comuns e fixes direto ao ponto.

![Dark/Light Mode](https://img.shields.io/badge/Tema-Dark%20%2F%20Light-f0a500?style=flat-square)
![Tecnologias](https://img.shields.io/badge/Tecnologias-11-3dd68c?style=flat-square)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?style=flat-square)
[![Contribuições](https://img.shields.io/badge/Contribuições-Bem%20vindas-brightgreen?style=flat-square)](https://github.com/mariaclarasanchez/ByteRef/blob/main/CONTRIBUTING.md)

---

## 📖 Descrição

**ByteRef** é uma referência técnica rápida para engenheiros **DevOps & Backend**, com foco em consulta eficiente e sem enrolação. Layout de **tabela densa** com comandos reais, erros comuns e fixes direto ao ponto.

### ✨ Features

- **📍 Página Inicial**: Cards visuais para navegação rápida às tecnologias
- **📊 Tabelas Densas**: Descrição ↔ Código com botão de cópia (⧉) em cada linha
- **🔍 Busca Real-time**: Encontra comandos em toda a documentação
- **🌓 Dark/Light Mode**: Alterável com um clique, tema persistente
- **⚙️ Seções Colapsáveis**: Expanda/retraia categorias conforme necessário
- **📱 Responsivo**: Funciona em desktop, tablet e mobile
- **⌨️ Atalhos**: `/` para buscar, `Esc` para limpar
- **🚀 Production-ready**: Static HTML/CSS/JS, zero dependências

🌐 **Acesse online:** [https://mariaclarasanchez.github.io/ByteRef/](https://mariaclarasanchez.github.io/ByteRef/)

---

## 🛠 Tecnologias Cobertas

| #  | Tecnologia     | Tema                          | Categorias                                                     |
|----|----------------|-------------------------------|----------------------------------------------------------------|
| 1  | ☁️ GCP          | Cloud / IaaS                  | gcloud CLI, IAM, Cloud Run, Compute Engine, Storage, Build    |
| 2  | 🚢 Kubernetes   | Container Orchestration       | kubectl, Pods, Deployments, Services, Secrets, ConfigMaps     |
| 3  | 🐳 Docker       | Containerization              | Build, Images, Containers, Registry, Compose                  |
| 4  | 💻 CLI / Bash   | Terminal Productivity         | grep, find, ssh, scp, tar, top, awk, sed                      |
| 5  | 🧪 Flask        | Web Framework / Python        | Routes, Blueprints, Database, Auth, Deploy, Testing           |
| 6  | 🐘 PostgreSQL   | Relational Database           | DDL, Queries, Window Functions, Performance, Backup           |
| 7  | 🐬 MySQL        | Relational Database           | DDL, Queries, JSON, Replication, Admin, Optimization          |
| 8  | ⚡ Redis        | Cache / In-Memory DB          | Keys, Hashes, Lists, Sets, Pub/Sub, Persistence               |
| 9  | 📦 Poetry       | Dependency Management / Python | Setup, Add/Remove, Environments, Build, Publish              |
| 10 | 🐼 Pandas       | Data Analysis / Python        | DataFrames, Groupby, Joins, Statistics, Export                |
| 11 | 🌿 Git          | Version Control               | Commits, Branches, Merge, Rebase, Stash, Tags                 |

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
│  │  └─ style.css          Estilos unificados (dark/light, responsivo)
│  ├─ js/
│  │  └─ script.js          Busca, tema, sidebar, navegação
│  └─ pages/                Subpáginas por tecnologia
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

Cada página em `src/pages/` é **isolada e autônoma**: referencia o CSS e JS centralizados, possui link "← Home" no topo e a sidebar marca a página atual.

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

#### Adicionar uma nova seção

Dentro de `<div class="ref-grid">`, copie um `<div class="ref-block">` e adapte:

```html
<div class="ref-block">
  <div class="ref-block-title">🤔 Sua Nova Seção</div>
  <table class="cmd-table">
    <!-- linhas de comando aqui -->
  </table>
</div>
```

#### Adicionar uma nova tecnologia

1. Copie um arquivo em `src/pages/` (ex: `bash.html`) e renomeie
2. Altere o `<title>`, `data-tech`, emoji e conteúdo
3. Adicione o card no `index.html` em `<div class="tech-grid">`
4. Adicione o link na sidebar `<nav class="nav">` com um novo `<a class="nav-link">`

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
R: Edite as variáveis CSS em `src/css/style.css` em `:root { --bg: ..., --amber: ... }`.

**P: Posso hospedar em outro lugar?**  
R: Sim, é 100% estático! Suba o repositório para qualquer host (Vercel, Netlify, etc.).

---

## Licença

MIT © 2026