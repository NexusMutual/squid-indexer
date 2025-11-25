# Agents Instructions

## Overview
This is a monorepo for NexusMutual backend services monorepo.

## Structure
- `packages/api`: Express-based REST API service
- `packages/indexers`: Indexers for product metadata and updates.
- `packages/db-schema`: Database schema definitions, shared ABI definitions, and TypeORM models.

## Setup & Tools
- **Package Manager**: `pnpm` (v10.17.1+).
- **Build Tool**: `turbo` repo.
- **Database**: PostgreSQL (managed using `typeorm` via `packages/db-schema`).

## Instructions
- Never run the git commit command
- Do not add deps manually to package.json - use the package manager
