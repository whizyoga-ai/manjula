# AGENTS.md — instructions for AI coding agents

This repository has a live staging/production pipeline. Do not guess its topology, and do not confuse roadmap items with implemented behavior.

## Read first

Before changing application structure, Docker, CI/CD, hosting, health checks, Cloudflare, or deployment scripts, read completely:

1. `docs/DEPLOYMENT_ARCHITECTURE.md`
2. `.github/workflows/staging-image.yml`
3. `.github/workflows/promote-gitlab.yml`
4. `CLAUDE.md`

If your planned change conflicts with the architecture document, stop and explain the conflict before editing.

## Implemented now

- Source code: GitHub `whizyoga-ai/manjula`.
- Staging/regression: YOGA-5090 self-hosted GitHub runner.
- Regression port: `127.0.0.1:18081`.
- Persistent UAT port: `127.0.0.1:18080`.
- UAT: `https://staging.manjulab.com`.
- Build happens once on YOGA-5090.
- Tested image is pushed to GHCR as `sha-<short-sha>`.
- Human approval precedes production promotion.
- GitHub promotion pushes the exact tested artifact to GitLab without rebuilding.
- Promotion then opens a GitLab pipeline over the API using the existing Actions secret, carrying the release tag, digest, immutable ref and source SHA as `MANJULA_*` variables. It hands off; it does not deploy.
- GitLab project: `KAI-Production / Hosted Customers / Manjula / website-release`.
- Promotion creates immutable `release-<short-sha>` plus moving pointer `approved-latest`.
- Primary production: GEEKOM Docker + Caddy + Cloudflare tunnel.
- DR production: gpuserver India / K3s namespace `brahmando`.
- Both production targets consume the same approved artifact.
- Production jobs are manual and run only on dedicated self-hosted/system runners.
- GEEKOM job candidate-tests on port 18083 before replacing production on 18082 and attempts rollback on failure.
- gpuserver job uses idempotent strategic merge patching, rollout validation, `/healthz` probes and restart checking.

## Not implemented yet / roadmap

Do not state or assume these are already live:

- digest-pinned `@sha256:` production deployment;
- automatic post-deploy public origin checks as a release gate;
- automatic Worker failover regression on every release;
- guaranteed Windows-side unattended startup of YOGA-5090 WSL after reboot;
- formal release-retention/rollback catalog;
- GitLab source/release manifest snapshot beyond the current release registry/control role;
- production rollout of the new Manjula logo.

The authoritative roadmap details are in `docs/DEPLOYMENT_ARCHITECTURE.md`.

## Non-negotiable deployment rules

- Build once on staging; promote the exact tested image.
- Human/UAT approval precedes production promotion.
- `/healthz` must return HTTP 200 and body `ok`.
- YOGA-5090 regression uses port 18081; persistent UAT uses 18080.
- GEEKOM production container uses localhost:18082; candidate validation uses 18083; Caddy exposes localhost:8080 to its Cloudflare tunnel.
- gpuserver uses K3s deployment `brahmando/manjulab-web`, container `web`.
- gpuserver readiness AND liveness probes must target `/healthz`, never `/index.php`.
- Do not reintroduce old Apache/PHP command, args, or site/config host-path mounts into the Nginx/static deployment.
- Prefer idempotent Kubernetes strategic merge patches. Do not use JSON Patch `remove` for fields that may already be absent.
- Production jobs remain manual unless the owner explicitly changes that policy.
- Never expose runner registration tokens, registry tokens, passwords, or other secrets in code, docs, logs, examples, or chat.
- Do not add paid Cloudflare Load Balancing. Website origin routing/failover is handled by the existing Cloudflare Worker strategy.

## Release naming

Staging images use `sha-<short-sha>`.

Promotion creates:

- immutable `release-<short-sha>`
- moving approved pointer `approved-latest`

The immutable tag/digest is the audit identity. Do not treat a mutable pointer as proof of what was deployed.

## Branding

The new Manjula brand artwork is stored at:

`assets/img/manjula-logo-brahmexa.webp`

Its site-wide rollout is pending staging implementation and owner approval. Follow `docs/CLAUDE_LOGO_ROLLOUT_PROMPT.md` when asked to implement it. Do not promote the logo change to production automatically.

## Documentation responsibility

Any architectural change must update `docs/DEPLOYMENT_ARCHITECTURE.md`, this file, `CLAUDE.md`, and any tool-specific instruction files such as `.cursor/rules/deployment-architecture.mdc` or `.github/copilot-instructions.md` in the same change.
