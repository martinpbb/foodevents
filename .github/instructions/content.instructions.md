---
applyTo:
  - "src/data/**/*.json"
  - "src/pages/**/*.jsx"
  - "src/components/sections/**/*.jsx"
---

# Content and event data instructions

Foodevents stores site and event-oriented content in repository data files and renders it through React pages and sections.

## Data changes

Before changing a JSON structure:

1. locate its consumers;
2. preserve the current shape unless the task requires a schema change;
3. update every directly affected consumer;
4. verify rendered behavior.

Do not introduce duplicate sources of truth.

Prefer extending existing data structures over creating parallel content stores.

## Events

For event changes, inspect the current event consumers before modifying the event schema.

Pay attention to:

- identifiers and route compatibility;
- dates and date formatting;
- titles and descriptions;
- locations;
- images and asset paths;
- SEO data where applicable.

Do not silently rename or remove existing fields used by the UI.

## Site content

Changes to `site.json`, services, partners, gallery, or related content should preserve the existing component contracts unless the task explicitly requires a structural change.

Avoid embedding content directly into components when an established data file already owns that content.