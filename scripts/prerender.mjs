import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { buildSeoHeadTags, getPublicRoutes, getSeoForPath } from "../src/seo/routeSeo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");

function stripManagedHead(template) {
  return template
    .replace(/<!--prerender-head-->[\s\S]*?<!--\/prerender-head-->/g, "<!--prerender-head-->")
    .replace(/<!--default-seo-start-->[\s\S]*?<!--default-seo-end-->/g, "");
}

async function loadData() {
  const [eventsRaw, partnersRaw, servicesRaw] = await Promise.all([
    readFile(path.resolve(projectRoot, "src/data/events.json"), "utf8"),
    readFile(path.resolve(projectRoot, "src/data/partners.json"), "utf8"),
    readFile(path.resolve(projectRoot, "src/data/services.json"), "utf8"),
  ]);

  return {
    events: JSON.parse(eventsRaw).items || [],
    partners: JSON.parse(partnersRaw).items || [],
    services: JSON.parse(servicesRaw).items || [],
  };
}

function routeToOutputFile(routePath) {
  if (routePath === "/") return path.resolve(distDir, "index.html");
  const relative = routePath.replace(/^\//, "");
  return path.resolve(distDir, relative, "index.html");
}

function withSeo(html, seo) {
  const headTags = buildSeoHeadTags(seo);
  const jsonLd = seo.jsonLd
    ? `\n    <script type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>`
    : "";

  return html.replace(
    "<!--prerender-head-->",
    `<!--prerender-head-->\n    ${headTags}${jsonLd}\n    <!--/prerender-head-->`
  );
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function writeSitemap(routes) {
  const now = new Date().toISOString();
  const urls = routes
    .map((routePath) => {
      const normalized = routePath === "/" ? "" : routePath;
      return `  <url>\n    <loc>${escapeXml(`https://www.foodevents.cz${normalized}`)}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(path.resolve(distDir, "sitemap.xml"), xml, "utf8");
}

async function writeRobots() {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: https://www.foodevents.cz/sitemap.xml\n`;
  await writeFile(path.resolve(distDir, "robots.txt"), robots, "utf8");
}

async function prerender() {
  const dataCollections = await loadData();
  const routes = getPublicRoutes(dataCollections);
  const templateRaw = await readFile(path.resolve(distDir, "index.html"), "utf8");
  const template = stripManagedHead(templateRaw);

  const serverEntryUrl = pathToFileURL(path.resolve(distDir, "server/entry-server.js")).href;
  const serverEntry = await import(serverEntryUrl);
  const render = serverEntry.render;

  if (typeof render !== "function") {
    throw new Error("SSR render function was not found in dist/server/entry-server.js");
  }

  for (const routePath of routes) {
    const appHtml = render(routePath);
    const seo = getSeoForPath(routePath, dataCollections);
    const pageHtml = withSeo(
      template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
      seo
    );

    const outFile = routeToOutputFile(routePath);
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, pageHtml, "utf8");
  }

  await writeSitemap(routes);
  await writeRobots();
  await rm(path.resolve(distDir, "server"), { recursive: true, force: true });
}

prerender().catch((error) => {
  console.error(error);
  process.exit(1);
});
