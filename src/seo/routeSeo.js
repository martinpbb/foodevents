const SITE_URL = "https://www.foodevents.cz";
const DEFAULT_IMAGE = `${SITE_URL}/images/social-preview.jpg`;

function ensureLeadingSlash(pathname) {
  if (!pathname) return "/";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function trimText(value, max = 160) {
  if (!value) return "";
  const normalized = String(value).replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

function toAbsolute(urlOrPath) {
  if (!urlOrPath) return DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
  return `${SITE_URL}${urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`}`;
}

function resolveMetaForPath(pathname, collections = {}) {
  const normalizedPath = ensureLeadingSlash(pathname);
  const { events = [], partners = [], services = [] } = collections;

  const homeMeta = {
    title: "FoodEvents | Street food catering a eventy v Ceske republice",
    description:
      "FoodEvents pripravi street food catering, firemni eventy i festivalove realizace po cele Ceske republice.",
    canonical: `${SITE_URL}/`,
    ogType: "website",
    image: DEFAULT_IMAGE,
  };

  if (normalizedPath === "/") return homeMeta;

  if (normalizedPath === "/akce") {
    return {
      title: "Akce | FoodEvents",
      description:
        "Prehled pripravovanych a realizovanych akci FoodEvents. Termin, misto a detail kazde udalosti.",
      canonical: `${SITE_URL}/akce`,
      ogType: "website",
      image: DEFAULT_IMAGE,
    };
  }

  const eventMatch = normalizedPath.match(/^\/akce\/([^/]+)$/);
  if (eventMatch) {
    const event = events.find((item) => item.slug === eventMatch[1]);
    if (event) {
      return {
        title: `${event.title} | FoodEvents`,
        description: trimText(event.summary || event.subtitle || event.title),
        canonical: `${SITE_URL}/akce/${event.slug}`,
        ogType: "event",
        image: toAbsolute(event.image?.src),
        jsonLd: buildEventJsonLd(event),
      };
    }
  }

  const partnerMatch = normalizedPath.match(/^\/partneri\/([^/]+)$/);
  if (partnerMatch) {
    const partner = partners.find((item) => item.slug === partnerMatch[1]);
    if (partner) {
      return {
        title: `${partner.title} | Partneri FoodEvents`,
        description: trimText(partner.summary || partner.title),
        canonical: `${SITE_URL}/partneri/${partner.slug}`,
        ogType: "article",
        image: toAbsolute(partner.logo?.src),
      };
    }
  }

  const serviceMatch = normalizedPath.match(/^\/sluzby\/([^/]+)$/);
  if (serviceMatch) {
    const service = services.find((item) => item.slug === serviceMatch[1]);
    if (service) {
      return {
        title: `${service.title} | Sluzby FoodEvents`,
        description: trimText(service.summary || service.title),
        canonical: `${SITE_URL}/sluzby/${service.slug}`,
        ogType: "article",
        image: toAbsolute(service.image?.src),
      };
    }
  }

  return {
    title: "Stranka nenalezena | FoodEvents",
    description: "Pozadovana stranka nebyla nalezena.",
    canonical: `${SITE_URL}${normalizedPath}`,
    ogType: "website",
    image: DEFAULT_IMAGE,
    noindex: true,
  };
}

export function buildEventJsonLd(event) {
  if (!event || !event.slug || !event.title) return null;

  const startDate = event.dateFrom || null;
  const endDate = event.dateTo || event.dateFrom || null;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: trimText(event.summary || event.subtitle || event.title, 400),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    startDate,
    endDate,
    url: `${SITE_URL}/akce/${event.slug}`,
    image: event.image?.src ? [toAbsolute(event.image.src)] : undefined,
    location: event.where || event.place
      ? {
          "@type": "Place",
          name: event.where || event.place,
          address: {
            "@type": "PostalAddress",
            addressCountry: "CZ",
          },
        }
      : undefined,
    organizer: {
      "@type": "Organization",
      name: "FoodEvents",
      url: SITE_URL,
    },
  };
}

export function getPublicRoutes(collections = {}) {
  const { events = [], partners = [], services = [] } = collections;
  const baseRoutes = ["/", "/akce"];
  const eventRoutes = events.map((item) => `/akce/${item.slug}`);
  const partnerRoutes = partners.map((item) => `/partneri/${item.slug}`);
  const serviceRoutes = services.map((item) => `/sluzby/${item.slug}`);

  return [...baseRoutes, ...eventRoutes, ...partnerRoutes, ...serviceRoutes];
}

export function getSeoForPath(pathname, collections = {}) {
  return resolveMetaForPath(pathname, collections);
}

export function buildSeoHeadTags(meta) {
  const robots = meta.noindex ? "noindex, nofollow" : "index, follow";
  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}">`,
    `<meta name="robots" content="${robots}">`,
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}">`,
    `<meta property="og:locale" content="cs_CZ">`,
    `<meta property="og:type" content="${escapeHtml(meta.ogType || "website")}">`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}">`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}">`,
    `<meta property="og:url" content="${escapeHtml(meta.canonical)}">`,
    `<meta property="og:image" content="${escapeHtml(meta.image || DEFAULT_IMAGE)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(meta.image || DEFAULT_IMAGE)}">`,
  ].join("\n    ");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
