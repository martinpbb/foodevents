# SEO Prerender Architecture

## What was implemented
- Routing moved from hash URLs to history URLs (`BrowserRouter`), so public pages resolve as real paths.
- Build now runs in 3 phases:
  1. `vite build` (client bundle)
  2. `vite build --ssr src/entry-server.jsx --outDir dist/server`
  3. `node scripts/prerender.mjs` (renders static HTML per public route)
- Prerendered routes:
  - `/`
  - `/akce`
  - `/akce/:slug` for every event in `src/data/events.json`
  - `/partneri/:slug`
  - `/sluzby/:slug`
- Route-level SEO metadata is centralized in `src/seo/routeSeo.js`.
- Event detail pages include Event JSON-LD generated only from real event JSON fields.
- `sitemap.xml` and `robots.txt` are generated into `dist/` during prerender.

## Why prerender/static generation
- Website content comes from local JSON and is known at build time.
- Prerendering produces crawlable HTML with route-specific metadata before JavaScript runs.
- Output stays compatible with static hosting (plain HTML files in route folders).
- No dynamic rendering layer or bot-specific serving is required.

## Validation checklist
- Search Console:
  - Use URL Inspection for `/`, `/akce`, and one `/akce/:slug`.
  - Confirm canonical is self-referencing and coverage is "Indexed" after recrawl.
- Rich Results Test:
  - Test at least one `/akce/:slug` URL.
  - Confirm Event schema is detected and valid.
- GTM Preview:
  - Open site via GTM Preview and navigate between SPA routes.
  - Verify `virtual_page_view` is fired on every route change.
- GA4 Realtime:
  - In Realtime, navigate `/ -> /akce -> /akce/:slug`.
  - Confirm page views appear with correct `page_path`.
