import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import eventsData from "../../data/events.json";
import partnersData from "../../data/partners.json";
import servicesData from "../../data/services.json";
import { getSeoForPath } from "../../seo/routeSeo.js";

function upsertMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    document.head.appendChild(node);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });
}

function upsertCanonical(href) {
  let node = document.head.querySelector('link[rel="canonical"]');
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", "canonical");
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
}

function upsertEventJsonLd(jsonLd) {
  const id = "event-jsonld";
  let script = document.getElementById(id);

  if (!jsonLd) {
    if (script) script.remove();
    return;
  }

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(jsonLd);
}

export default function SeoRouteManager() {
  const location = useLocation();

  const collections = useMemo(
    () => ({
      events: Array.isArray(eventsData?.items) ? eventsData.items : [],
      partners: Array.isArray(partnersData?.items) ? partnersData.items : [],
      services: Array.isArray(servicesData?.items) ? servicesData.items : [],
    }),
    []
  );

  useEffect(() => {
    const meta = getSeoForPath(location.pathname, collections);

    document.title = meta.title;
    upsertMeta('meta[name="description"]', { name: "description", content: meta.description });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: meta.noindex ? "noindex, nofollow" : "index, follow",
    });
    upsertCanonical(meta.canonical);

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: meta.ogType || "website" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: meta.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: meta.description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: meta.canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: meta.image });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: meta.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: meta.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: meta.image });

    upsertEventJsonLd(meta.jsonLd || null);
  }, [collections, location.pathname]);

  return null;
}
