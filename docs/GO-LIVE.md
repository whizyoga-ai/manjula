# Going live on manjulab.com

The site is built, pushed and serving at
**<https://whizyoga-ai.github.io/manjula/>**. Two steps remain, and they must
happen in this order.

---

## Step 1 — Cloudflare DNS

`manjulab.com` is on Cloudflare (`kelly.ns.cloudflare.com` /
`vick.ns.cloudflare.com`). The API token in `C:\whizyoga\cloudflare-brahmexa.txt`
is **zone-scoped to brahmexa.com only** — verified against
`/client/v4/zones`, which returns that one zone — so this cannot be done from
here. Either do it in the dashboard, or issue a token with `Zone:DNS:Edit` on
the `manjulab.com` zone and it can be done for you.

### What is there now

The apex and `www` are **proxied** (orange cloud) to Cloudflare IPs
`104.21.95.79` / `172.67.169.223`, in front of an origin serving the
*"Creating a brand network — stay tuned"* placeholder. That origin is not
GitHub Pages, and it is not in any repository I could find. Replacing the
records replaces what is served.

### What to change

Delete the existing apex `A`/`AAAA` records and create these four, all
**grey cloud (DNS only)** — GitHub Pages issues its own certificate and cannot
do so through Cloudflare's proxy:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

And point `www` at Pages:

| Type | Name | Value | Proxy |
|---|---|---|---|
| CNAME | `www` | `whizyoga-ai.github.io` | DNS only |

### Do not touch

- **`MX` → `mail.manjulab.com`**
- **the `A` record for `mail`** → `112.196.183.116`

These carry the corporate mailboxes — `whizyoga@`, `support@`, `hello@`,
`yogabrata@`, `hi@`. Commit `fc0d7d4` in the MANJULAB repo kept **31 addresses**
on this domain deliberately, and they are still advertised on live pages
elsewhere. Mail records are independent of the website records, so the site can
move without mail noticing. Only if you also want to retire the mailboxes does
anything here change — say so and it can be planned properly, because dropping
MX silently black-holes every one of those addresses.

---

## Step 2 — restore the CNAME file

The repository holds `CNAME.pending` (containing `manjulab.com`) rather than
`CNAME`, and `.gitignore` keeps it out of the build. This is deliberate: GitHub
Pages redirects `whizyoga-ai.github.io/manjula` to the custom domain the moment
a `CNAME` file exists, so committing it before DNS moves would make the site
unreachable at *both* addresses instead of one.

Once the records above have propagated:

```bash
cd C:/whizyoga/repos/manjula && git mv CNAME.pending CNAME && sed -i '/CNAME.pending/,+5d' .gitignore && git commit -am "Point Pages at manjulab.com" && git push
```

Then in the repo's Pages settings, set the custom domain to `manjulab.com` and
tick **Enforce HTTPS** once the certificate is issued — it usually takes a few
minutes and can take up to 24 hours.

---

## Step 3 — ingest the assistant's knowledge

The `manjula` tenant is committed to `Brahmando-ai/brahmando-chatbot`
(`orchestrator/config/tenants.yaml`) with its knowledge pack at
`knowledge/manjula/`. A tenant is only real once its knowledge is in Qdrant:

```bash
python ingestion/ingest.py --tenant manjula --source ./knowledge/manjula/ --url https://chat.brahmando.com --api-key sk-mj-manjula-2026
```

Or through the admin UI at <https://chat.brahmando.com/admin/> — Knowledge
base → `manjula` → Ingest tenant.

Until that happens the assistant answers *"not enabled for this address yet"*
rather than hanging, which is the intended failure mode: a broken tenant and a
slow one must not look the same.

---

## Verifying

```bash
curl -sI https://manjulab.com/ | head -3
```

Expect `server: GitHub.com`. If it still says `server: cloudflare`, the records
are still proxied — grey-cloud them.

```bash
curl -s https://manjulab.com/ | grep -o '<title>[^<]*'
```

Expect the Bengali title. And confirm mail survived:

```bash
nslookup -type=MX manjulab.com 1.1.1.1
```

Expect `mail.manjulab.com` at preference 10, unchanged.

---

## One loose end worth deciding

The `manjulab` corporate tenant in `tenants.yaml` still lists `manjulab.com`
and `www.manjulab.com` as its only allowed domains. With the domain repurposed
for the shop, that tenant becomes inert — it has nowhere left to be embedded.
It was left exactly as it was rather than edited, because it may be referenced
somewhere outside these repositories. Worth a decision, not urgent.
