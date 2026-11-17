# dovheller.com · Astro 4 review build

Run Node 20 or 22.

```sh
npm ci
npm run check
npm run build
npm run preview -- --host 127.0.0.1
```

Open http://127.0.0.1:4321/he or /en. The package includes compiled output in dist for review. The personal homepage and current profile were carried over from the deployed site. The separate profile proposal is outside this build. The editable bilingual engineering copy is in src/content.

Before production, confirm named project credits, the scope and dates of the Hong Kong and Moscow work, and optional integrations in src/lib/site.ts. The draft gives an email contact and does not load analytics. Analytics integration, including Consent Mode verification, is separate from setting identifiers.

Render's static-site dashboard controls HTTP headers and redirects. The portable public/_headers and public/_redirects files do not by themselves configure the current Render service. The index fallback resolves legacy query links. Verify the real / to /he status, query forwarding and security headers on the target hosting environment before cutover.
