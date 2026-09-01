---
applyTo:
  - ".github/workflows/**"
  - "vite.config.*"
  - "src/App.jsx"
  - "src/main.jsx"
  - "src/entry-server.jsx"
  - "src/seo/**"
  - "src/components/seo/**"
---

# GitHub Pages and static deployment instructions

Foodevents is deployed as a static site through GitHub Pages.

## Static-hosting constraints

Do not assume:

- a persistent Node.js server;
- server-side sessions;
- server-side API routes;
- runtime filesystem access;
- private server environment variables.

Preserve compatibility with GitHub Pages.

## Routing

When modifying routing or entry behavior, verify:

- base path handling;
- direct route navigation;
- refresh/deep-link behavior;
- 404 behavior;
- generated asset paths.

Do not introduce routing behavior that requires a traditional application server unless the deployment architecture is explicitly changed.

## Build and deployment

Preserve the existing deployment workflow unless the task explicitly requires changes.

Prefer the repository's existing build scripts.

When deployment behavior changes, validate the production build before completion.

## SEO

Preserve the existing SEO architecture and route metadata behavior.

Before changing SEO route handling, inspect:

- `src/seo/routeSeo.js`;
- `src/components/seo/SeoRouteManager.jsx`;
- relevant pages and routes.

Do not create a second SEO mechanism in parallel.