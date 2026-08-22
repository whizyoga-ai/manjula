# Manjula deployment architecture

Last revised: 2026-08-21/22
Status: **implemented and operational**, with hardening items tracked below.

This document is the authoritative deployment model for this repository. AI coding tools and human contributors must read it before changing build, release, hosting, health checks, Cloudflare routing, or CI/CD.

## 1. What is implemented now

The following is live and working today.

### Source, staging, and UAT

- GitHub `whizyoga-ai/manjula` is the source repository.
- YOGA-5090 is the dedicated self-hosted GitHub Actions staging/regression runner.
- The runner is installed as a systemd service inside Ubuntu/WSL.
- Automated regression uses `127.0.0.1:18081`.
- Persistent staging/UAT uses `127.0.0.1:18080`.
- `https://staging.manjulab.com` is published through the `laptop-staging` Cloudflare tunnel.
- A build must pass regression before its image is published to GHCR.
- Human visual/UAT approval is a separate production gate.

### Artifact promotion

- The application is built **once** on YOGA-5090.
- The exact tested image is pushed to GHCR as `sha-<short-sha>` and `staging-latest`.
- `.github/workflows/promote-gitlab.yml` promotes the exact tested GHCR artifact to GitLab **without rebuilding**.
- Promotion creates an immutable `release-<short-sha>` tag.
- Promotion also updates the moving pointer `approved-latest`.
- The workflow verifies artifact identity between GHCR and GitLab and refuses to silently overwrite an existing immutable release tag.
- Re-running promotion for a release whose manifest is already identical is treated as already-promoted rather than as an overwrite, so the handoff below stays reachable. A tag that exists with a *different* digest is still a hard failure.

### Release handoff to GitLab

Promotion does not stop at pushing the image. Using the GitHub Actions secret
`GITLAB_KAI_PROD_TOKEN_BRAHMANDO`, the workflow calls the GitLab API and opens
a pipeline in the release project carrying the release identity as variables:

```text
MANJULA_RELEASE_TAG        release-<short-sha>
MANJULA_RELEASE_DIGEST     sha256:<manifest digest>
MANJULA_RELEASE_IMAGE      <registry>/website-release:release-<short-sha>
MANJULA_IMMUTABLE_REF      <registry>/website-release@sha256:<digest>
MANJULA_SOURCE_SHA         the GitHub commit that was tested
MANJULA_SOURCE_REPO        whizyoga-ai/manjula
MANJULA_APPROVED_BY        the actor who ran the promotion
MANJULA_UAT_URL            https://staging.manjulab.com
MANJULA_PROMOTION_RUN      the GitHub Actions run that promoted it
```

Nobody retypes a release value. **The handoff opens the pipeline; it does not
deploy.** GEEKOM and gpuserver remain manual jobs inside GitLab, which is the
intended production-approval gate.

The credential is only ever an HTTP header inside the runner. It is never
echoed, never written to disk and never passed to anything but `curl`.

### Production release registry

GitLab hierarchy:

```text
KAI-Production
└── Hosted Customers
    └── Manjula
        └── website-release
```

Registry:

```text
registry.gitlab.com/kai-production/hosted-customers/manjula/website-release
```

Production deployment remains manual.

### GEEKOM primary production

- GitLab Runner: `geekom-prod-web-system`.
- Runner mode: system daemon, shell executor.
- Runner tags: `geekom, production, web, system`.
- Runner can control local Docker.
- Production container: `manjula-production`.
- Production container port: `127.0.0.1:18082 -> 80`.
- Candidate validation port: `127.0.0.1:18083 -> 80`.
- Caddy listens on `127.0.0.1:8080` and reverse-proxies to `127.0.0.1:18082`.
- Cloudflare origin hostname: `geekom-web-origin.kai247.com`.
- The deployment job performs candidate health validation before replacing production and attempts rollback to the previous image if the new production container fails health checks.

Caddy intent:

```caddy
:8080 {
    bind 127.0.0.1
    reverse_proxy 127.0.0.1:18082
}
```

### gpuserver India DR

- GitLab Runner: `gpuserver-prod-web-system`.
- Runner mode: system daemon, shell executor.
- Runner tags: `gpuserver, production, web, system, dr`.
- K3s namespace: `brahmando`.
- Deployment: `manjulab-web`.
- Container: `web`.
- Service: `manjulab-web`, port 80.
- Cloudflare origin hostname: `india-web-origin.kai247.com`.
- The old Apache/PHP runtime has been replaced by the same Nginx/static production artifact used by GEEKOM.
- Old Apache command/args and old site/config volume mounts are removed from the active container specification.
- Both readiness and liveness probes use `/healthz`.
- Deployment normalization uses an idempotent Kubernetes strategic merge patch.
- The production job waits for rollout, validates probes, waits through a liveness cycle, checks restart count, and reports deployment state.

### Health contract

Every production/staging image must provide:

```text
GET /healthz
HTTP 200
body: ok
```

This is a hard invariant. The previous `/index.php` liveness probe caused Kubernetes to repeatedly kill a healthy Nginx container and must never return.

### Cloudflare

Known origins:

```text
geekom-web-origin.kai247.com
india-web-origin.kai247.com
```

Cloudflare tunnels publish the origins. A Cloudflare Worker handles website origin selection/failover. The architecture intentionally avoids paid Cloudflare Load Balancing.

## 2. Current end-to-end flow

```text
Developer / GitHub main
        |
        v
GitHub Actions on YOGA-5090
        |
        +--> build Docker image ONCE
        +--> regression on localhost:18081
        +--> publish exact tested image to GHCR
        |
        v
Persistent UAT container localhost:18080
        |
        v
staging.manjulab.com
        |
     HUMAN APPROVAL
        |
        v
GitHub promotion workflow
NO REBUILD
        |
        +--> release-<short-sha>     immutable
        +--> approved-latest         moving approved pointer
        |
        v
GitLab Container Registry
   + handoff pipeline carrying the release identity
        |
   MANUAL PRODUCTION APPROVAL (in GitLab)
        |
        +-------------------------------+
        |                               |
        v                               v
GEEKOM primary                     gpuserver India DR
Docker                             K3s / brahmando
candidate :18083                   deployment manjulab-web
production :18082                  container web
Caddy :8080                        service/ingress
        |                               |
geekom-web-origin                  india-web-origin
        +---------------+---------------+
                        |
                        v
                Cloudflare Worker
```

## 3. Production CI behavior implemented now

The GitLab production CI is designed to be repeatable and fail-safe.

### GEEKOM job

The job must:

1. verify Docker, curl, registry variables and Docker daemon access;
2. authenticate to GitLab Registry;
3. pull the approved release without rebuilding;
4. start `manjula-candidate` on port 18083;
5. require `/healthz == ok` before touching production;
6. remember the previously running production image;
7. replace `manjula-production` only after candidate validation;
8. verify the new production container on 18082;
9. verify the Caddy path on 8080;
10. attempt rollback to the prior image if cutover health fails;
11. clean up candidate containers and registry sessions.

A `resource_group` prevents concurrent GEEKOM production deployments.

### gpuserver job

The job must:

1. verify kubectl, Docker, KUBECONFIG and cluster access;
2. verify the release image exists before changing K3s;
3. capture the currently deployed image for rollback;
4. create/update the GitLab registry pull secret idempotently;
5. normalize the `web` container with a **strategic merge patch**;
6. ensure old Apache/PHP command, args, and mounts are absent;
7. force readiness and liveness to `/healthz`;
8. set the approved release image;
9. wait for rollout completion;
10. restore the previous image if rollout fails;
11. wait through a liveness cycle and verify restart count remains zero;
12. report the final image and probe state.

A `resource_group` prevents concurrent gpuserver production deployments.

## 4. Things that are NOT implemented yet / roadmap

These are planned hardening or automation steps. AI agents must not describe them as already live.

### A. Digest-pinned production deployment — NEXT

Current production CI may consume the approved pointer/tag. The next hardening step is to resolve the approved artifact to its immutable registry digest and deploy:

```text
registry.gitlab.com/.../website-release@sha256:<digest>
```

instead of relying on a mutable tag at deployment time.

Goal: the exact manifest digest becomes the runtime identity on both production hosts.

### B. Automated post-deploy public checks

Planned:

- verify `geekom-web-origin.kai247.com/healthz` after GEEKOM deploy;
- verify `india-web-origin.kai247.com/healthz` after gpuserver deploy;
- optionally test the public website route after both are healthy.

These checks should fail deployment reporting without creating a rebuild.

### C. Automated failover regression

The Worker/origin mechanism exists, but automated production failover regression is not yet part of every release pipeline.

Planned controlled test:

1. verify normal routing to GEEKOM;
2. make primary health unavailable in a controlled way;
3. verify Worker routes to India DR;
4. restore GEEKOM;
5. verify primary routing returns.

This must be implemented carefully so CI does not create unnecessary customer-visible outages.

### D. Windows/WSL unattended startup hardening

The YOGA-5090 GitHub runner is a systemd daemon inside WSL. Future hardening may make Windows start the required WSL instance automatically after host reboot/login so staging is fully unattended.

### E. Release retention and rollback catalog

Planned:

- retain a defined number of immutable `release-*` artifacts;
- record which digest was deployed to each production target;
- provide an explicit operator rollback action to a selected prior immutable release.

### F. GitLab repository release record

The GitLab project currently serves primarily as the production release/registry control point. A future enhancement may store a concise release manifest/source snapshot per promotion for auditability, without turning GitLab into a second independent build source.

### G. Logo rollout

The new logo exists at:

```text
assets/img/manjula-logo-brahmexa.webp
```

The site-wide logo rollout is **not yet production-approved**. It must first be implemented in GitHub, pass YOGA-5090 regression, and be visually approved at `staging.manjulab.com`. Only then may the exact tested artifact be promoted and deployed to GEEKOM and gpuserver.

## 5. Architecture principles

1. GitHub is the source of truth for application source.
2. Build once; promote the tested artifact.
3. Staging and production are separate gates.
4. Production deployment is manual until explicitly changed.
5. GEEKOM is primary; gpuserver is DR.
6. Both production targets consume the same approved artifact.
7. `/healthz` is mandatory everywhere.
8. Do not send production jobs to hosted/shared runners.
9. Do not expose credentials or runner tokens.
10. Do not introduce paid Cloudflare Load Balancing unless explicitly requested.
11. Use idempotent deployment operations.
12. Prefer immutable digests as the final runtime identity.

## 6. AI-agent rules

Any AI coding model working in this repository must distinguish between:

- **implemented now** — sections 1–3 above;
- **planned/future** — section 4 above.

Do not silently implement roadmap items while doing unrelated application work.

Before modifying CI/CD, Docker, Kubernetes, Cloudflare, health checks, ports, runner labels, registry behavior, or production topology, read this file completely.

If live infrastructure appears inconsistent with this document, stop and report the mismatch instead of inventing a new architecture.

Any material architecture change must update, in the same change:

- `docs/DEPLOYMENT_ARCHITECTURE.md`
- `AGENTS.md`
- `CLAUDE.md`
- `.cursor/rules/deployment-architecture.mdc` when present
- `.github/copilot-instructions.md` when present
