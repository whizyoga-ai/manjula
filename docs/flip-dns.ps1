<#
.SYNOPSIS
  Point manjulab.com at the GitHub Pages site for Manjula Bite & Brew.

.DESCRIPTION
  Replaces the apex A/AAAA records with GitHub Pages' four addresses and points
  www at whizyoga-ai.github.io, all unproxied. Everything else in the zone is
  left exactly as it is.

  MAIL IS PROTECTED BY A HARD GUARD, NOT BY CARE.
  manjulab.com carries corporate mailboxes — whizyoga@, support@, hello@,
  yogabrata@, hi@ — behind MX -> mail.manjulab.com. Commit fc0d7d4 in the
  MANJULAB repo kept 31 such addresses on this domain deliberately, and they
  are still advertised on live pages. This script will refuse to delete any MX
  record and any record named 'mail', even if a future edit tells it to. Web
  records and mail records are independent, so the site can move without mail
  noticing — provided nobody tidies the MX away while they are in there.

  Idempotent. Run it twice and the second run reports "already correct".

.PARAMETER WhatIf
  Show every change without making one. Run this first.

.EXAMPLE
  # 1. Create a token at https://dash.cloudflare.com/profile/api-tokens
  #    Template "Edit zone DNS", Zone Resources -> Include -> Specific zone ->
  #    manjulab.com. Nothing else.
  $env:CLOUDFLARE_API_TOKEN = 'paste-it-here'
  .\flip-dns.ps1 -WhatIf     # look at what it intends to do
  .\flip-dns.ps1             # do it
#>

[CmdletBinding(SupportsShouldProcess)]
param(
  [string]$ZoneName = 'manjulab.com',
  [string]$PagesHost = 'whizyoga-ai.github.io'
)

$ErrorActionPreference = 'Stop'

# ------------------------------------------------------------------ safety
# This script was validated by dry-running it against brahmexa.com, and that
# dry-run showed it planning to delete brahmexa.com's apex tunnel CNAME and
# replace it with GitHub Pages addresses — which would take the Brahmexa site
# down. A script that can do that to the wrong zone by way of one mistyped
# argument should not be able to. -WhatIf on another zone is still allowed,
# because inspecting is how the bug above was found.
if ($ZoneName -ne 'manjulab.com' -and -not $WhatIfPreference) {
  throw @"
Refusing to modify '$ZoneName'. This script exists to point manjulab.com at
GitHub Pages and nothing else. brahmexa.com in particular serves through a
Cloudflare Tunnel and would go down.

To inspect another zone without changing it, add -WhatIf.
"@
}

# GitHub Pages apex addresses. Current as of 2026-08; if Pages ever reports a
# certificate error after this runs, check these against GitHub's own docs
# rather than assuming the script is at fault.
$PagesA = @('185.199.108.153', '185.199.109.153', '185.199.110.153', '185.199.111.153')

$token = $env:CLOUDFLARE_API_TOKEN
if (-not $token) {
  throw "CLOUDFLARE_API_TOKEN is not set. See the examples in this file's header."
}
$headers = @{ Authorization = "Bearer $token"; 'Content-Type' = 'application/json' }

function Invoke-CF {
  param([string]$Method, [string]$Path, $Body)
  $uri = "https://api.cloudflare.com/client/v4$Path"
  $args = @{ Method = $Method; Uri = $uri; Headers = $headers }
  if ($Body) { $args.Body = ($Body | ConvertTo-Json -Depth 8 -Compress) }
  $r = Invoke-RestMethod @args
  if (-not $r.success) { throw "Cloudflare API said no: $($r.errors | ConvertTo-Json -Compress)" }
  return $r
}

Write-Host "== Resolving zone '$ZoneName' ==" -ForegroundColor Cyan
$zone = (Invoke-CF GET "/zones?name=$ZoneName").result
if (-not $zone) {
  throw "Zone '$ZoneName' is not on this token's account. The token must be scoped to $ZoneName specifically."
}
$zoneId = $zone[0].id
Write-Host "  zone id $($zoneId.Substring(0,8))..., status $($zone[0].status)"

$records = (Invoke-CF GET "/zones/$zoneId/dns_records?per_page=200").result

Write-Host "`n== Zone before ==" -ForegroundColor Cyan
$records | Sort-Object type, name | ForEach-Object {
  '{0,-6} {1,-28} {2,-42} proxied={3}' -f $_.type, $_.name, $_.content, $_.proxied
} | Write-Host

# ---------------------------------------------------------------- the guard
# Anything this returns true for is untouchable. The check is on the record,
# not on the intent of the caller, so it holds even if the logic below is
# later edited by someone in a hurry.
function Test-Protected {
  param($rec)
  if ($rec.type -eq 'MX') { return $true }
  if ($rec.name -eq "mail.$ZoneName") { return $true }
  if ($rec.type -eq 'TXT') { return $true }   # SPF, DKIM, DMARC and verifications
  return $false
}

$protected = $records | Where-Object { Test-Protected $_ }
Write-Host "`n== Protected, will not be touched ==" -ForegroundColor Yellow
if ($protected) {
  $protected | ForEach-Object { '  {0,-6} {1,-28} {2}' -f $_.type, $_.name, $_.content } | Write-Host
} else {
  Write-Host "  (none found — if you expected MX here, stop and check the zone before continuing)" -ForegroundColor Red
}

# ----------------------------------------------------------------- the apex
# CNAME belongs in this list, and finding that out is the reason this was
# dry-run first. The sibling zone brahmexa.com does not use apex A records at
# all — its apex is a proxied CNAME to a cfargotunnel address, and manjulab.com
# has the same fingerprint (proxied, cf-cache-status DYNAMIC, origin hidden).
# An apex rule that only replaced A and AAAA would have reported success and
# changed nothing, because there was no A record there to replace.
$apexOld = @($records | Where-Object {
  $_.name -eq $ZoneName -and $_.type -in @('A', 'AAAA', 'CNAME') -and -not (Test-Protected $_)
})
$apexWanted = @($PagesA | Sort-Object)
$apexHave = @($apexOld | Where-Object { $_.type -eq 'A' } | Select-Object -ExpandProperty content | Sort-Object)
$apexOther = @($apexOld | Where-Object { $_.type -in @('AAAA', 'CNAME') })
# Compare-Object throws on a null side, which is exactly what an apex with no
# A records produces. Both sides are forced to arrays above; guard the count
# here so an empty zone is "not correct" rather than an exception.
$apexMatches = ($apexHave.Count -eq $apexWanted.Count) -and
               (@(Compare-Object $apexWanted $apexHave -SyncWindow 0).Count -eq 0)
$apexCorrect = $apexMatches -and ($apexOther.Count -eq 0) -and
               (-not ($apexOld | Where-Object { $_.proxied }))

if ($apexCorrect) {
  Write-Host "`n== Apex already correct ==" -ForegroundColor Green
} else {
  Write-Host "`n== Apex -> GitHub Pages ==" -ForegroundColor Cyan
  foreach ($r in $apexOld) {
    if ($PSCmdlet.ShouldProcess("$($r.type) $($r.name) -> $($r.content)", 'DELETE')) {
      Invoke-CF DELETE "/zones/$zoneId/dns_records/$($r.id)" | Out-Null
      Write-Host "  deleted $($r.type) $($r.content)"
    }
  }
  foreach ($ip in $PagesA) {
    $body = @{ type = 'A'; name = $ZoneName; content = $ip; ttl = 1; proxied = $false }
    if ($PSCmdlet.ShouldProcess("A $ZoneName -> $ip (DNS only)", 'CREATE')) {
      Invoke-CF POST "/zones/$zoneId/dns_records" $body | Out-Null
      Write-Host "  created A $ip (grey cloud)"
    }
  }
}

# ---------------------------------------------------------------------- www
# Grey cloud is not a preference. GitHub Pages issues its own certificate for
# the custom domain and cannot complete that handshake through Cloudflare's
# proxy, so an orange cloud here produces a TLS error rather than a slow site.
$wwwName = "www.$ZoneName"
$wwwOld = $records | Where-Object { $_.name -eq $wwwName -and $_.type -in @('A','AAAA','CNAME') }
$wwwCorrect = ($wwwOld.Count -eq 1) -and ($wwwOld[0].type -eq 'CNAME') -and
              ($wwwOld[0].content -eq $PagesHost) -and (-not $wwwOld[0].proxied)

if ($wwwCorrect) {
  Write-Host "`n== www already correct ==" -ForegroundColor Green
} else {
  Write-Host "`n== www -> $PagesHost ==" -ForegroundColor Cyan
  foreach ($r in $wwwOld) {
    if ($PSCmdlet.ShouldProcess("$($r.type) $($r.name) -> $($r.content)", 'DELETE')) {
      Invoke-CF DELETE "/zones/$zoneId/dns_records/$($r.id)" | Out-Null
      Write-Host "  deleted $($r.type) $($r.content)"
    }
  }
  $body = @{ type = 'CNAME'; name = $wwwName; content = $PagesHost; ttl = 1; proxied = $false }
  if ($PSCmdlet.ShouldProcess("CNAME $wwwName -> $PagesHost (DNS only)", 'CREATE')) {
    Invoke-CF POST "/zones/$zoneId/dns_records" $body | Out-Null
    Write-Host "  created CNAME -> $PagesHost (grey cloud)"
  }
}

if ($WhatIfPreference) {
  Write-Host "`n-WhatIf: nothing was changed." -ForegroundColor Yellow
  return
}

Write-Host "`n== Zone after ==" -ForegroundColor Cyan
(Invoke-CF GET "/zones/$zoneId/dns_records?per_page=200").result |
  Sort-Object type, name | ForEach-Object {
    '{0,-6} {1,-28} {2,-42} proxied={3}' -f $_.type, $_.name, $_.content, $_.proxied
  } | Write-Host

Write-Host @"

Next, and not before now:

  cd C:\whizyoga\repos\Manjula
  git mv CNAME.pending CNAME
  git commit -am "Point Pages at manjulab.com"
  git push

Then set the custom domain to $ZoneName in the repo's Pages settings and tick
Enforce HTTPS once the certificate is issued.

Check it landed:
  curl -sI https://$ZoneName/ | Select-String -Pattern 'server'    # expect GitHub.com
  nslookup -type=MX $ZoneName 1.1.1.1                              # expect mail.$ZoneName, unchanged

"@ -ForegroundColor Green
