#!/usr/bin/env bash
# Publish a PREVIEW deployment of this site, with the project's standing rules enforced rather
# than remembered. See BUILD-REPORT.md section 8.
#
#   1. never a production deployment
#   2. never the v1 Vercel project (prj_nX56I20mK34TOOyN9YZi73S22LZf)
#   3. never a domain or DNS change; jrew.co.in is untouched
#
# Usage:  scripts/deploy-preview.sh
# Needs:  a logged-in Vercel CLI (`vercel login`) or VERCEL_TOKEN in the environment.

set -euo pipefail
cd "$(dirname "$0")/.."

FORBIDDEN_PROJECT="prj_nX56I20mK34TOOyN9YZi73S22LZf"

for arg in "$@"; do
  if [[ "$arg" == "--prod" || "$arg" == "--production" ]]; then
    echo "refused: this script only ever publishes a preview. Deploying to production is Raghav's call." >&2
    exit 1
  fi
done

if [[ -f .vercel/project.json ]] && grep -q "$FORBIDDEN_PROJECT" .vercel/project.json; then
  echo "refused: .vercel/project.json points at the v1 project ($FORBIDDEN_PROJECT)." >&2
  echo "Remove the .vercel directory and re-run so a separate project is created." >&2
  exit 1
fi

if ! npx --yes vercel whoami >/dev/null 2>&1; then
  echo "not signed in to Vercel. Run 'npx vercel login' in a terminal, or export VERCEL_TOKEN, then re-run." >&2
  exit 1
fi

echo "==> building locally first, so a broken build never reaches a URL"
pnpm build >/dev/null

echo "==> publishing a preview deployment"
url=$(npx --yes vercel deploy --yes "$@")
echo "$url"

echo
echo "Preview: $url"
echo
echo "Next, in the Vercel project's settings, and then redeploy for them to take effect:"
echo "  NEXT_PUBLIC_SITE_URL = $url"
echo "  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_EMAIL, CAREERS_EMAIL"
echo
echo "Until SMTP is set the forms refuse visibly with a 500 and an on-screen message, by design."
echo "ALLOW_CONSOLE_DELIVERY has no effect on Vercel and must not be set there."
