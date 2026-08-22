# Manjula deployment architecture

Last revised: 2026-08-21/22

This document is the authoritative deployment model for this repository. AI coding tools and human contributors must read it before changing build, release, hosting, health checks, Cloudflare routing, or CI/CD.

## Principles

1. GitHub `whizyoga-ai/manjula` is the source repository.
2. Build once. Never rebuild the application during promotion or production deployment.
3. YOGA-5090 is staging and regression only.
4. A human approves staging before production promotion.
5. GitLab `KAI-Production / Hosted Customers / Manjula / website-release` is the production release registry/project.
6. GEEKOM is the US primary web production host.
7. `gpuserver` in India is the DR web production host.
8. Both production hosts consume the same approved artifact.
9. Production services must expose `/healthz` and return exactly `ok` with HTTP 200.
10. Cloudflare tunnels publish origins; the Cloudflare Worker selects between origins. Do not introduce paid Cloudflare Load Balancing unless explicitly requested.

## Current flow

```text
Developer / GitHub main
        |
        v
GitHub Actions
self-hosted YOGA-5090 runner
(labels: self-hosted, Linux, X64, staging, regression, yoga-5090)
        |
        +--> build Docker image once
        +--> automated regression on localhost:18081
        +--> push exact tested image to GHCR
        |
        v
YOGA-5090 persistent UAT container
localhost:18080
        |
Cloudflare tunnel: laptop-staging
        |
https://staging.manjulab.com
        |
     HUMAN APPROVAL
        |
        v
GitHub promotion workflow
NO REBUILD
        |
        +--> immutable GitLab tag: release-<source-short-sha>
        +--> moving approved pointer: approved-latest
        |
        v
GitLab Container Registry
registry.gitlab.com/kai-production/hosted-customers/manjula/website-release
        |
        +--------------------------+
        |                          |
        v                          v
GEEKOM primary                 gpuserver India DR
Docker                         K3s namespace brahmando
manjula-production             deployment manjulab-web
localhost:18082                container name web
        |                          |
Caddy localhost:8080              existing K3s service/ingress
        |                          |
Cloudflare tunnel                 Cloudflare tunnel
        |                          |
geekom-web-origin.kai247.com   india-web-origin.kai247.com
        +-------------+------------+
                      |
                      v
              Cloudflare Worker
              website routing / failover
```

## Staging

### YOGA-5090

- Ubuntu WSL staging runner is installed as a systemd service.
- GitHub Actions runner is intended to be persistent while the WSL instance is running.
- Regression port: `127.0.0.1:18081`.
- Persistent UAT port: `127.0.0.1:18080`.
- Never bind regression to `18080`; that port belongs to the persistent staging site.
- Public staging URL: `https://staging.manjulab.com` via the `laptop-staging` Cloudflare tunnel.
- A successful build is not production approval. Human/UAT approval is a separate gate.

## GitHub workflows

### Staging workflow

`.github/workflows/staging-image.yml`

Responsibilities:

- Checkout source.
- Build the exact Docker image locally on YOGA-5090.
- Run regression on port 18081.
- Verify `/healthz` and important pages.
- Push the exact tested image to GHCR as `sha-<short-sha>` and `staging-latest`.
- No GitHub-hosted runner should be required; jobs are pinned to the self-hosted staging runner.

### Promotion workflow

`.github/workflows/promote-gitlab.yml`

Responsibilities:

- Input is a GHCR staging tag that has passed regression and UAT, e.g. `sha-ca51542`.
- Pull the tested image.
- Push it to GitLab without rebuilding.
- Create immutable `release-<short-sha>`.
- Update `approved-latest` to the same approved artifact.
- Verify source/destination artifact identity.
- Refuse to silently overwrite an immutable `release-*` tag.

## GitLab production release project

GitLab hierarchy:

```text
KAI-Production
└── Hosted Customers
    └── Manjula
        └── website-release
```

Container registry:

```text
registry.gitlab.com/kai-production/hosted-customers/manjula/website-release
```

Production CI is deliberately manual. A promotion to GitLab does not automatically deploy production.

## GEEKOM primary

GitLab system runner:

```text
geekom-prod-web-system
```

Tags:

```text
geekom, production, web, system
```

Runner requirements:

- system-mode GitLab Runner daemon
- shell executor
- `gitlab-runner` user is in the Docker group
- project-locked, protected runner

Runtime topology:

```text
GitLab approved image
 -> candidate container localhost:18083
 -> health check
 -> manjula-production localhost:18082
 -> Caddy localhost:8080
 -> Cloudflare Tunnel
 -> geekom-web-origin.kai247.com
```

Caddy configuration intent:

```caddy
:8080 {
    bind 127.0.0.1
    reverse_proxy 127.0.0.1:18082
}
```

Production deployment should test a candidate before replacing `manjula-production` and should attempt rollback to the previous image when cutover health fails.

## gpuserver India DR

GitLab system runner:

```text
gpuserver-prod-web-system
```

Tags:

```text
gpuserver, production, web, system, dr
```

Runtime:

- K3s cluster on gpuserver.
- Namespace: `brahmando`.
- Deployment: `manjulab-web`.
- Container: `web`.
- Service: `manjulab-web` on port 80.
- Production image comes from the GitLab registry.

The deployment used to be Apache/PHP and contained old Apache command/args, host-path mounts, and `/index.php` probes. The current image is Nginx/static. Those old Apache settings must never be reintroduced.

Mandatory probes for `web`:

```text
readinessProbe: /healthz
livenessProbe:  /healthz
```

The old `/index.php` liveness probe caused an otherwise healthy Nginx container to be killed and restarted repeatedly. Treat `/healthz` as a non-negotiable invariant.

Use Kubernetes strategic merge patch for repeatable normalization of the `web` container. Do not use JSON Patch `remove` operations for fields that may already be absent; those are not idempotent and previously caused production CI failures.

## Cloudflare routing

Known web origins:

```text
geekom-web-origin.kai247.com
india-web-origin.kai247.com
```

The Cloudflare Worker handles website origin selection/failover. The desired cost model is to use the existing Workers Paid Plan and avoid paid Cloudflare Load Balancing.

For ATOM-hosted application services, DR can be a manual switch. This document is specifically the Manjula website hosting pipeline.

## Health and release invariants

Any AI/model changing CI/CD must preserve all of these:

- `/healthz` exists in the image and returns `ok`.
- Staging regression does not take over port 18080.
- Production is never rebuilt after UAT approval.
- GEEKOM and gpuserver deploy the same approved artifact.
- gpuserver liveness and readiness both use `/healthz`.
- Production jobs are manual and tied to dedicated self-hosted/system runners.
- Do not send production jobs to shared/hosted runners.
- Do not publish registry credentials or runner tokens.
- Do not add `latest` as the only production identity. Keep immutable `release-<sha>` tags.
- `approved-latest` is a pointer only; an immutable release tag/digest is the audit identity.
- Prefer deployment by digest when extending the pipeline further.

## When modifying the architecture

Update this file, `AGENTS.md`, and `CLAUDE.md` in the same change. If an AI assistant discovers a mismatch between live infrastructure and this document, it must stop and surface the mismatch rather than silently inventing a new topology.
