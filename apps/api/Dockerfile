FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TURBO_TELEMETRY_DISABLED=1
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.17.1 --activate

FROM base AS pruner
RUN pnpm add -g turbo
COPY . .
# creates ./out/json and ./out/full  https://turborepo.com/docs/reference/prune
RUN turbo prune api --docker

# copy pnpm lock & workspace along with package.json files
FROM base AS builder
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# copy the pruned source code and run the build
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo build --filter=api
# create standalone unit https://pnpm.io/cli/deploy
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm deploy --filter=api --prod --legacy /app/prod

# create the image that will run in prod
FROM node:22-slim AS runner
WORKDIR /app
USER node
COPY --from=builder --chown=node:node /app/prod .
CMD ["node", "dist/index.js"]
