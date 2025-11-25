FROM node:22-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY packages/db-schema ./packages/db-schema
COPY packages/indexers ./packages/indexers

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build
RUN pnpm --filter @nexusmutual/indexers build

FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/db-schema/package.json ./packages/db-schema/
COPY packages/indexers/package.json ./packages/indexers/

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/packages/db-schema/dist ./packages/db-schema/dist
COPY --from=builder /app/packages/indexers/dist ./packages/indexers/dist

WORKDIR /app/packages/indexers

# Default to products processor, can be overridden
CMD ["node", "dist/products/index.js"]
