# GitHub Copilot instructions — Manjula

Read `docs/DEPLOYMENT_ARCHITECTURE.md`, `AGENTS.md`, and `CLAUDE.md` before proposing or editing deployment-related code.

## Current implemented architecture

- GitHub `whizyoga-ai/manjula` is source of truth.
- YOGA-5090 is self-hosted staging/regression.
- Regression: `127.0.0.1:18081`; persistent UAT: `127.0.0.1:18080`.
- UAT URL: `https://staging.manjulab.com`.
- Build once; promote exact tested artifact after human approval.
- GitLab release project: `KAI-Production / Hosted Customers / Manjula / website-release`.
- Promotion creates immutable `release-<short-sha>` and moving pointer `approved-latest`, then opens a GitLab pipeline over the API with `MANJULA_*` release variables. The handoff does not deploy.
- GEEKOM primary: candidate `18083`, production `18082`, Caddy `8080`, Cloudflare origin `geekom-web-origin.kai247.com`.
- gpuserver DR: K3s namespace `brahmando`, deployment `manjulab-web`, container `web`, origin `india-web-origin.kai247.com`.
- Both gpuserver readiness and liveness probes use `/healthz`.
- Production jobs are manual and run only on dedicated self-hosted/system runners.

## Planned, not yet implemented

- direct `@sha256:` digest-pinned deployment;
- automated public-origin deployment gates;
- automated Worker failover regression every release;
- guaranteed Windows-side WSL auto-start;
- formal release retention/rollback catalog;
- production rollout of the new logo.

## Safety rules

Do not rebuild after UAT. Do not use `/index.php` probes. Do not reintroduce old Apache/PHP command/args/mounts. Do not use JSON Patch `remove` for optional old fields. Do not use port 18080 for regression. Do not expose secrets. Do not route production to shared runners. Do not introduce paid Cloudflare Load Balancing unless explicitly requested.

If implementation and documentation disagree, stop and report the discrepancy.
