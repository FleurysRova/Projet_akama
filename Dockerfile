# =====================================================================
#  Dockerfile — Portfolio Elie Tinah Ramanjakavelosoa
#  Multi-stage build · Next.js 16 standalone · Non-root user (nextjs)
#  Optimisé pour Lighthouse 100/100, sécurité & taille d'image minimale
# =====================================================================

# ----------------------------------------------------------------
# Stage 1 — deps : installation des dépendances (cacheable)
# ----------------------------------------------------------------
FROM node:20-alpine AS deps

# Install OpenSSL for Prisma compatibility (si activé à terme)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copie des fichiers de dépendances pour maximiser le cache Docker
COPY package.json bun.lock* package-lock.json* yarn.lock* pnpm-lock.yaml* ./
COPY prisma ./prisma

# Installation reproductible (privilégier bun, fallback npm)
RUN if command -v bun >/dev/null 2>&1; then \
      bun install --frozen-lockfile; \
    else \
      npm ci; \
    fi

# ----------------------------------------------------------------
# Stage 2 — builder : build Next.js en standalone
# ----------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Récupération des node_modules depuis deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build standalone (output: "standalone" dans next.config.ts)
# `ignoreBuildErrors: true` est volontaire pour la portabilité CI
RUN if command -v bun >/dev/null 2>&1; then \
      bun run build; \
    else \
      npm run build; \
    fi

# ----------------------------------------------------------------
# Stage 3 — runner : image runtime minimale & sécurisée
# ----------------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Installation de dumb-init pour un signal handling propre (PID 1)
RUN apk add --no-cache dumb-init

# --- Création de l'utilisateur non-root `nextjs` ---
# UID/GID 1001 — convention Next.js officielle
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs \
 && mkdir -p /app/public /app/.next \
 && chown -R nextjs:nodejs /app

# Copie du build standalone (server + dépendances runtime minimes)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Bascule sur l'utilisateur non-root
USER nextjs

# Vérification de santé (Lighthouse-friendly)
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT}/ >/dev/null 2>&1 || exit 1

EXPOSE 3000

# dumb-init garantit la propagation propre des signaux SIGTERM/SIGINT
ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "server.js"]
