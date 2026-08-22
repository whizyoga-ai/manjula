# Claude prompt — introduce the new Manjula logo on every page

Use this prompt with Claude Code from the root of `whizyoga-ai/manjula`.

---

You are updating the live Manjula Bite & Brew website.

Before editing anything, read these files completely:

- `CLAUDE.md`
- `AGENTS.md`
- `docs/DEPLOYMENT_ARCHITECTURE.md`
- `README.md`
- `index.html`
- `assets/css/site.css`

Then inspect every top-level HTML page in the repository, including at minimum:

- `index.html`
- `bulk.html`
- `dish.html`
- `movies.html`
- `origins.html`
- `uttarpara.html`

Also discover any other user-facing `.html` pages and include them.

## New brand asset

Use this exact repository asset:

`assets/img/manjula-logo-brahmexa.webp`

This is the new Manjula visual identity. It contains:

- the Manjula name
- a food-oriented visual identity
- the line `Food that comforts, nourishes & connects`
- a subtle `Powered by Brahmexa` attribution

Do not redraw, replace, AI-regenerate, crop away, or alter the words inside the approved logo asset unless explicitly requested later.

## Goal

Introduce the logo elegantly and consistently across every public page without overwhelming the existing design.

The site must still feel like Manjula Bite & Brew, not like a corporate Brahmexa site. `Powered by Brahmexa` should remain subtle. Food, warmth, Uttarpara, and Manjula remain the dominant identity.

## Required implementation

1. Add the new logo to the site-wide header/brand area on every page.
2. Use responsive markup so the logo is legible on desktop, tablet, and mobile.
3. Keep the existing Bengali/English language experience working.
4. Do not remove useful existing text labels if they are needed for accessibility, navigation, or language context; visually reorganize them if needed.
5. Add appropriate `alt` text. A reasonable default is `Manjula Bite & Brew — Powered by Brahmexa`.
6. Avoid layout shift by setting intrinsic image width/height or an aspect-ratio.
7. Use CSS rather than page-specific inline styles wherever possible.
8. Reuse a shared class/pattern consistently across all pages.
9. Do not make the header excessively tall. The full artwork can appear more prominently on the home page, while interior pages may use a restrained header version of the same asset.
10. On the home page, consider using the full logo as a strong brand moment near the hero/header, but do not destroy the existing editorial feel of the hero.
11. Keep `Powered by Brahmexa` visible somewhere on every page through the approved logo and/or an accessible textual fallback, but do not duplicate it aggressively.
12. Preserve existing navigation links, page anchors, theme controls, language controls, structured data, SEO metadata, and accessibility behavior.

## Social/SEO cleanup

Where appropriate, update the default Open Graph/Twitter share image from the current generic/slate image to the new brand asset, provided doing so does not create an incorrect absolute URL. Use:

`https://manjulab.com/assets/img/manjula-logo-brahmexa.webp`

Do not fabricate reviews, ratings, coordinates, opening hours, prices, or menu facts. Existing source-backed content rules remain unchanged.

## Performance

- The logo is already optimized as WebP. Do not convert it to a larger format.
- Use eager/high priority loading only where it is truly above the fold on the home page.
- Interior-page instances may use normal/lazy behavior if appropriate.
- Do not add a new JavaScript framework or UI dependency for this task.

## Regression expectations

Before committing, verify at minimum:

- `/`
- `/origins.html`
- `/dish.html`
- `/bulk.html`
- `/movies.html`
- `/uttarpara.html`
- `/healthz`

Check for broken image paths at both root and nested/anchor navigation contexts.

Validate mobile widths and make sure the logo does not overlap navigation/language/theme controls.

## Deployment rules — mandatory

Do NOT deploy directly to GEEKOM or gpuserver.

The change must follow the documented pipeline:

1. Commit to GitHub.
2. Let the YOGA-5090 self-hosted staging workflow build and regress the image.
3. Verify the new image at `https://staging.manjulab.com`.
4. STOP and wait for explicit human approval.
5. Only after approval may the existing promotion workflow copy the exact tested image to GitLab without rebuilding.
6. Production deployment is then manually triggered for GEEKOM primary and gpuserver India DR.

Do not bypass the UAT approval gate.

## Deliverable

Make the implementation, then report:

- files changed
- how the logo is used on home vs interior pages
- responsive/accessibility decisions
- any metadata updated
- regression checks performed
- exact Git commit SHA
- staging image tag produced if available

Do not promote or deploy production unless separately instructed after visual approval.

---
