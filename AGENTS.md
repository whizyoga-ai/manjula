# AGENTS.md — instructions for AI coding agents

This repository has a live staging/production pipeline. Do not guess its topology.

## Read first

Before changing application structure, Docker, CI/CD, hosting, health checks, Cloudflare, or deployment scripts, read:

1. `docs/DEPLOYMENT_ARCHITECTURE.md`
2. `.github/workflows/staging-image.yml`
3. `.github/workflows/promote-gitlab.yml`

If your planned change conflicts with the architecture document, stop and explain the conflict before editing.

## Source of truth

- Source code: GitHub `whizyoga-ai/manjula`.
- Staging/regression: YOGA-5090 self-hosted GitHub runner.
- UAT: `https://staging.manjulab.com`.
- Production release registry/project: GitLab `KAI-Production / Hosted Customers / Manjula / website-release`.
- Primary production: GEEKOM.
- DR production: gpuserver India / K3s namespace `brahmando`.
- Production artifacts are promoted, not rebuilt.

## Non-negotiable deployment rules

- Build once on staging; promote the exact tested image.
- Human/UAT approval precedes production promotion.
- `/healthz` must return HTTP 200 and body `ok`.
- YOGA-5090 regression uses port 18081; persistent UAT uses 18080.
- GEEKOM production container uses localhost:18082; candidate validation may use 18083; Caddy exposes localhost:8080 to its Cloudflare tunnel.
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

It contains the food-focused Manjula identity and a subtle `Powered by Brahmexa` credit. For the planned site-wide rollout, follow `docs/CLAUDE_LOGO_ROLLOUT_PROMPT.md` and preserve page accessibility/performance.

## Documentation responsibility

Any architectural change must update `docs/DEPLOYMENT_ARCHITECTURE.md`, this file, and `CLAUDE.md` together.
