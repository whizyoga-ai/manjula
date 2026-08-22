# Manjula Bite & Brew

Manjula Bite & Brew is a bilingual Bengali/English restaurant site for Uttarpara, Hooghly.

## AI coding agents — read this first

This repository has a live staging/production release pipeline. Before changing Docker, CI/CD, Cloudflare, health checks, production deployment, or site-wide branding, read:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/DEPLOYMENT_ARCHITECTURE.md`

The approved new Manjula identity asset is:

`assets/img/manjula-logo-brahmexa.webp`

For the site-wide logo rollout task, use:

`docs/CLAUDE_LOGO_ROLLOUT_PROMPT.md`

## Deployment summary

Source lives in GitHub. YOGA-5090 is the self-hosted staging/regression host and `staging.manjulab.com` is the human-UAT gate. After approval, the exact tested image is promoted to GitLab `KAI-Production / Hosted Customers / Manjula / website-release` without rebuilding. GEEKOM is primary production and gpuserver India/K3s is DR. Both consume the same approved release artifact. See `docs/DEPLOYMENT_ARCHITECTURE.md` for the authoritative topology, ports, runners, health checks, and fail-safe deployment rules.

## Health contract

The production image must expose:

`/healthz`

and return HTTP 200 with body:

`ok`

Do not reintroduce `/index.php` health probes in the Nginx/static deployment.
