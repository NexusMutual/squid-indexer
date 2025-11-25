FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---
FROM base AS pruner
RUN pnpm add -g turbo
COPY . .
RUN turbo prune @nexusmutual/api --docker

# ---
FROM base AS builder
# Install dependencies first (changes less often)
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo build --filter=@nexusmutual/api

# ---
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser
USER appuser

COPY --from=builder --chown=appuser:nodejs /app/packages/db-schema/package.json ./packages/db-schema/
COPY --from=builder --chown=appuser:nodejs /app/packages/db-schema/dist ./packages/db-schema/dist
COPY --from=builder --chown=appuser:nodejs /app/packages/api/package.json ./packages/api/
COPY --from=builder --chown=appuser:nodejs /app/packages/api/dist ./packages/api/dist
COPY --from=builder --chown=appuser:nodejs /app/package.json ./
COPY --from=builder --chown=appuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:nodejs /app/packages/api/node_modules ./packages/api/node_modules
COPY --from=builder --chown=appuser:nodejs /app/packages/db-schema/node_modules ./packages/db-schema/node_modules

WORKDIR /app/packages/api

CMD ["node", "dist/index.js"]
