# 🚀 Portfolio — Elie Tinah Ramanjakavelosoa

> **Développeur de Logiciels & Spécialiste en Médias Créatifs**
> Portfolio web ultra-moderne, thématique **IA & Automatisation**.
> Conçu pour les recruteurs : double profil Tech + Créatif, terminal IA interactif, mode Recruteur 1-clic, thème clair/sombre persistant.

---

## ✨ Fonctionnalités phares

| # | Fonctionnalité | Description |
|---|---|---|
| 1 | **Double profil Tech + Créatif** | Hero scindé en deux : code snippet + badges (gauche/cyan) et aperçus multimédia colorés (droite/violet). |
| 2 | **Assistant IA — Terminal interactif** | Widget type terminal sci-fi avec effet **typewriter**, suggestions cliquables, son optionnel. |
| 3 | **Mode Recruteur 1 clic** | Popup synthèse condensée : identité, points clés, langues, formation, contact direct + download CV PDF. |
| 4 | **Live Status Badge** | Point vert pulsé `"Ouvert aux opportunités internationales & remote"` dans le header. |
| 5 | **Thème clair/sombre persistant** | Bouton toggle (`next-themes`), système + choix manuel, animé, sans flash. |
| 6 | **Micro-interactions audio (option)** | Toggle volume : sons sci-fi (clic, hover, ouverture, succès, frappe). |
| 7 | **SEO / Open Graph complet** | OG Meta + Twitter Card, manifest, favicon SVG, og-image 1200×630 générée. |
| 8 | **100% Responsive** | Mobile-first, breakpoints `sm/md/lg/xl`, menu mobile, footer sticky. |
| 9 | **DevOps prêt à l'emploi** | `Dockerfile` multi-stage non-root, `docker-compose.yml`, CI/CD GitHub Actions. |

---

## 🧱 Stack technique

- **Framework** : Next.js 16 (App Router, Server Components, output `standalone`)
- **Langage** : TypeScript 5 strict
- **Styling** : Tailwind CSS 4 + shadcn/ui (New York)
- **Animations** : Framer Motion
- **Thème** : `next-themes` (persistant, sans flash)
- **Polices** : Inter (sans) + JetBrains Mono (mono) via `next/font`
- **Icônes** : lucide-react
- **Runtime** : Node.js 20 (Alpine) en production

### 🎨 Palette « IA & Automatisation »

| Rôle | Couleur | Hex |
|---|---|---|
| Fond sombre profond | slate-950 | `#030712` |
| Fond clair épuré | slate-50 | `#f8fafc` |
| Cyan néon (Tech) | cyan-500 | `#06b6d4` |
| Violet cyberpunk (Créatif) | violet-500 | `#8b5cf6` |
| Vert automation (Live/Dispo) | emerald-500 | `#10b981` |

---

## 📂 Arborescence du projet

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml              # Pipeline CI/CD (lint, build, Docker multi-arch)
├── .dockerignore
├── Dockerfile                      # Multi-stage sécurisé, user non-root `nextjs`
├── docker-compose.yml              # Lancement instantané
├── tailwind.config.ts              # Palette IA + animations
├── next.config.ts                  # output: "standalone"
├── public/
│   ├── CV-Elie-Tinah-Ramanjakavelosoa.pdf
│   ├── favicon.svg
│   ├── og-image.png                # 1200×630 LinkedIn/Discord
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── app/
    │   ├── globals.css             # Design system + thème clair/sombre + animations
    │   ├── layout.tsx              # Inter + JetBrains Mono, SEO/OG metadata, ThemeProvider
    │   └── page.tsx                # Composition finale + state des modals
    ├── lib/
    │   ├── profile-data.ts         # Source unique (profil, expertises, langues, Q&A IA)
    │   ├── db.ts
    │   └── utils.ts
    └── components/
        ├── theme-provider.tsx     # Wrapper next-themes
        ├── ThemeToggle.tsx         # Dropdown Clair/Sombre/Système
        ├── AudioProvider.tsx       # Hook audio pour micro-interactions sci-fi
        ├── Header.tsx              # Nav sticky + mobile menu
        ├── HeroDual.tsx            # Hero double profil + Live Badge + CTA
        ├── About.tsx               # Profil pro + carte identité
        ├── Expertise.tsx           # 3 pôles d'expertise
        ├── Skills.tsx              # Stack + marquee
        ├── LanguagesSection.tsx   # 4 langues avec barres animées
        ├── EducationInterests.tsx # Formation + centres d'intérêt
        ├── Footer.tsx             # CTA + contact + sticky bottom
        ├── AIChatbotTerminal.tsx   # Terminal IA + typewriter
        ├── RecruiterQuickView.tsx  # Popup synthèse recruteur
        └── ui/                     # Composants shadcn/ui
```

---

## 🐳 Lancement via Docker (recommandé)

### Pré-requis
- Docker Engine 24+
- Docker Compose v2

### Démarrage en 1 commande

```bash
docker compose up --build -d
```

Le portfolio est accessible sur **http://localhost:3000**.

### Vérifier l'état

```bash
docker compose ps
docker compose logs -f portfolio
```

### Arrêter

```bash
docker compose down
```

### Build manuel (sans compose)

```bash
docker build -t elie-tinah/portfolio:latest .
docker run --rm -p 3000:3000 elie-tinah/portfolio:latest
```

### Sécurité

- ✅ Image basée sur `node:20-alpine` (minimale)
- ✅ Utilisateur non-root **`nextjs`** (UID 1001)
- ✅ `dumb-init` pour un signal handling propre (PID 1)
- ✅ `HEALTHCHECK` intégré
- ✅ `cap_drop: ALL` + `no-new-privileges` dans compose
- ✅ Multi-arch `linux/amd64` + `linux/arm64` via CI

---

## 💻 Lancement en local (dev)

### Avec Bun (recommandé)

```bash
bun install
bun run dev
```

### Avec npm

```bash
npm install
npm run dev
```

 puis ouvrir **http://localhost:3000**.

### Scripts disponibles

| Script | Action |
|---|---|
| `bun run dev` | Démarre le serveur de dev (port 3000) |
| `bun run build` | Build production standalone |
| `bun run start` | Démarre le serveur de prod |
| `bun run lint` | ESLint + règles Next.js |

---

## 🔁 Pipeline CI/CD GitHub Actions

Le workflow `.github/workflows/deploy.yml` se déclenche :

- À chaque `git push` sur `main`/`master`
- À chaque création de tag `v*.*.*`
- Sur pull request vers `main`/`master`
- Manuellement via `workflow_dispatch`

### Étapes du pipeline

1. **🧪 Quality** — Checkout → Setup Bun → Cache → Install → Lint → Build Next.js
2. **🐳 Docker** — Login GHCR → Metadata (tags semver) → Buildx multi-arch → Push sur `ghcr.io/<user>/<repo>:latest` + attestation SBOM
3. **📢 Notify** — Résumé du pipeline dans le job summary

### Activer la CI/CD

1. Poussez le repo sur GitHub
2. Le `GITHUB_TOKEN` par défaut a déjà les droits `packages:write` — aucune config supplémentaire
3. Pour déployer sur Vercel/coolify/k8s : ajoutez vos secrets et un job `deploy` après `docker`

### Récupérer l'image publiée

```bash
docker pull ghcr.io/<votre-user>/<votre-repo>:latest
docker run --rm -p 3000:3000 ghcr.io/<votre-user>/<votre-repo>:latest
```

---

## 🎯 Personnalisation

### Modifier les données du profil

Tout est centralisé dans **`src/lib/profile-data.ts`** :
- `PROFILE` — nom, titre, email, téléphone, dispo…
- `EXPERTISES` — 3 pôles d'expertise
- `LANGUAGES` — 4 langues + niveaux
- `EDUCATION`, `INTERESTS`
- `AI_QA` — questions/réponses du terminal IA

### Changer la palette

Éditez les variables CSS dans **`src/app/globals.css`** (blocs `:root` et `.dark`).

### Ajouter une vraie IA

Remplacez la logique `fuzzyMatch` dans `AIChatbotTerminal.tsx` par un appel à votre API LLM (z-ai-web-dev-sdk, OpenAI, Anthropic…).

---

## 📊 Performance & SEO

| Métrique | Cible |
|---|---|
| Lighthouse Performance | **100/100** |
| Lighthouse Accessibility | 95+ |
| Lighthouse SEO | 100 |
| Core Web Vitals | Tous verts |
| Taille image Docker | ~150 MB (alpine + standalone) |
| First Load JS | < 200 KB |

### Bonnes pratiques appliquées

- ✅ `next/font` self-hosted (aucune requête Google Fonts)
- ✅ `output: "standalone"` (bundle minimal)
- ✅ Server Components par défaut, `'use client'` ciblé
- ✅ Images optimisées via `sharp`
- ✅ Métadonnées dynamiques + Open Graph + Twitter Card
- ✅ `manifest.json` + favicon SVG
- ✅ `theme-color` adaptatif clair/sombre
- ✅ Lang `fr` + structure sémantique (`header`/`main`/`footer`/`section`/`article`)

---

## 📄 Licence

MIT © 2026 RAMANJAKAVELOSOA Elie Tinah.

---

## 📬 Contact

- **Email** : elie.tinah.r@gmail.com
- **Localisation** : Belo sur Tsiribihina, Madagascar
- **Mobilité** : Opérations & Achats Internationaux
- **Statut** : 🟢 Ouvert aux opportunités internationales & remote
