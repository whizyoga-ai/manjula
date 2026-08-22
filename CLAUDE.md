# CLAUDE.md

Claude: read this file before making changes to Manjula.

The authoritative deployment description is `docs/DEPLOYMENT_ARCHITECTURE.md`. The general coding-agent rules are in `AGENTS.md`. Treat both as mandatory project context.

## Current architecture in one paragraph

GitHub `whizyoga-ai/manjula` is the source repo. YOGA-5090 is the self-hosted staging/regression machine and serves `staging.manjulab.com` for human UAT. After approval, GitHub promotes the exact tested image to GitLab `KAI-Production / Hosted Customers / Manjula / website-release` without rebuilding it. GEEKOM is primary production (Docker -> localhost:18082 -> Caddy localhost:8080 -> Cloudflare tunnel) and gpuserver India is DR (K3s namespace `brahmando`, deployment `manjulab-web`, container `web`). Both production targets must use the same approved image. Both K3s readiness and liveness probes must use `/healthz`.

## Critical mistakes to avoid

- Do not rebuild on GitLab, GEEKOM, or gpuserver after UAT.
- Do not change the gpuserver liveness probe back to `/index.php`; that previously caused continuous restarts of a healthy Nginx container.
- Do not use non-idempotent JSON Patch `remove` operations for old Apache fields.
- Do not use port 18080 for automated regression; it is the persistent staging/UAT endpoint.
- Do not route production jobs to hosted/shared runners.
- Do not introduce paid Cloudflare Load Balancing.
- Do not expose credentials or runner tokens.

## Brand rollout task

A new approved logo asset is available at `assets/img/manjula-logo-brahmexa.webp`.

When asked to introduce it site-wide, use `docs/CLAUDE_LOGO_ROLLOUT_PROMPT.md` as the task specification. The rollout must first land in GitHub and pass the existing staging pipeline. Do not promote to production until the owner has visually approved `staging.manjulab.com`.

## Documentation

If you materially alter runtime, runners, ports, hostnames, health checks, registries, promotion rules, or failover behavior, update this file, `AGENTS.md`, and `docs/DEPLOYMENT_ARCHITECTURE.md` in the same change.
