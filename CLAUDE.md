# CLAUDE.md

Claude: read this file before making changes to Manjula.

The authoritative deployment description is `docs/DEPLOYMENT_ARCHITECTURE.md`. The general coding-agent rules are in `AGENTS.md`. Treat both as mandatory project context.

## Implemented architecture now

GitHub `whizyoga-ai/manjula` is the source repo. YOGA-5090 is the self-hosted staging/regression machine and serves `staging.manjulab.com` for human UAT. Regression uses port 18081 and persistent UAT uses 18080. After approval, GitHub promotes the exact tested image to GitLab `KAI-Production / Hosted Customers / Manjula / website-release` without rebuilding it. Promotion creates immutable `release-<short-sha>` plus moving pointer `approved-latest`, and then opens a GitLab pipeline over the API with the release identity in `MANJULA_*` variables. That handoff does not deploy: GEEKOM and gpuserver stay manual jobs in GitLab.

GEEKOM is primary production: candidate test on localhost:18083 -> production Docker container localhost:18082 -> Caddy localhost:8080 -> Cloudflare tunnel -> `geekom-web-origin.kai247.com`.

gpuserver India is DR: K3s namespace `brahmando`, deployment `manjulab-web`, container `web`, service `manjulab-web`, Cloudflare origin `india-web-origin.kai247.com`. The deployment is Nginx/static, not the old Apache/PHP runtime. Both readiness and liveness probes must use `/healthz`.

Production deployment remains manual and uses dedicated GitLab system runners. Both production hosts must consume the same approved artifact.

## Planned / future, NOT implemented yet

Do not describe these as current behavior unless the architecture docs are later updated to say they are implemented:

- deployment pinned directly to GitLab registry `@sha256:<digest>`;
- automatic public-origin health checks as part of each deployment gate;
- automatic Worker failover regression on every release;
- guaranteed Windows-side auto-start of the YOGA-5090 WSL staging environment after reboot;
- formal release retention and operator rollback catalog;
- GitLab source/release manifest snapshots beyond the current registry/release-control role;
- production rollout of the new Manjula logo.

Read the roadmap in `docs/DEPLOYMENT_ARCHITECTURE.md` before proposing architecture work.

## Critical mistakes to avoid

- Do not rebuild on GitLab, GEEKOM, or gpuserver after UAT.
- Do not change the gpuserver liveness probe back to `/index.php`; that previously caused continuous restarts of a healthy Nginx container.
- Do not use non-idempotent JSON Patch `remove` operations for old Apache fields.
- Do not use port 18080 for automated regression; it is the persistent staging/UAT endpoint.
- Do not route production jobs to hosted/shared runners.
- Do not introduce paid Cloudflare Load Balancing.
- Do not expose credentials or runner tokens.
- Do not silently implement roadmap items while doing unrelated application work.

## Brand rollout task

A new approved logo asset is available at `assets/img/manjula-logo-brahmexa.webp`.

When asked to introduce it site-wide, use `docs/CLAUDE_LOGO_ROLLOUT_PROMPT.md` as the task specification. The rollout must first land in GitHub and pass the existing staging pipeline. Do not promote to production until the owner has visually approved `staging.manjulab.com`.

## Documentation

If you materially alter runtime, runners, ports, hostnames, health checks, registries, promotion rules, failover behavior, or the status of a roadmap item, update this file, `AGENTS.md`, `docs/DEPLOYMENT_ARCHITECTURE.md`, and any tool-specific AI instruction files in the same change.
