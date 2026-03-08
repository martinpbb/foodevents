import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import events from "../data/events.json";
import partners from "../data/partners.json";
import services from "../data/services.json";
import { parseISODate } from "../components/calendar/calendarUtils.js";

const dataSources = { events, partners, services };

function getItems(dataKey) {
  const source = dataSources[dataKey];
  return Array.isArray(source?.items) ? source.items : [];
}

function formatDateLabel(item) {
  if (item.when) return item.when;
  const from = parseISODate(item.dateFrom);
  const to = parseISODate(item.dateTo || item.dateFrom);

  if (!from) return "Termin bude upresnen";

  const format = (date) =>
    new Intl.DateTimeFormat("cs-CZ", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(date);

  if (!to || from.getTime() === to.getTime()) return format(from);
  return `${format(from)} - ${format(to)}`;
}

export default function DetailPage({ dataKey }) {
  const { slug } = useParams();

  const item = useMemo(() => {
    const items = getItems(dataKey);
    return items.find((entry) => entry.slug === slug) || null;
  }, [dataKey, slug]);

  if (!item) {
    return (
      <div className="container pagePad" data-cy="detail-not-found">
        <h1 className="h2">Polozka nenalezena</h1>
        <p className="muted">Zkontrolujte odkaz nebo se vratte na hlavni stranku.</p>
        <Link className="btn primary lg" to="/">
          Zpet na hlavni stranku
        </Link>
      </div>
    );
  }

  const typeLabel = item.typeLabel || item.eventType || "Detail";
  const dateLabel = formatDateLabel(item);
  const placeLabel = item.where || item.place || "Misto bude upresneno";

  return (
    <article className="container pagePad" data-cy="detail-page">
      <div className="detailTop">
        <div>
          <div className="eyebrow">{typeLabel}</div>
          <h1 className="h1" data-cy="detail-title">{item.title}</h1>
          {item.subtitle ? <p className="lead">{item.subtitle}</p> : null}

          <div className="detailMeta">
            <span className="pill" data-cy="detail-date">Termin: {dateLabel}</span>
            <span className="pill" data-cy="detail-place">Misto: {placeLabel}</span>
            {item.ctaUrl ? (
              <a className="pill linkPill" href={item.ctaUrl} target="_blank" rel="noreferrer">
                Odkaz
              </a>
            ) : null}
          </div>
        </div>

        {item.image?.src ? (
          <img
            className="detailImage"
            data-cy="detail-image"
            src={item.image.src}
            alt={item.image.alt || item.title}
            loading="lazy"
          />
        ) : (
          <div className="detailImage placeholder" aria-hidden="true" />
        )}
      </div>

      {Array.isArray(item.content) && item.content.length ? (
        <div className="rich">
          {item.content.map((block, index) => {
            if (block.type === "p") return <p key={index}>{block.text}</p>;
            if (block.type === "h2") return <h2 key={index} className="h3">{block.text}</h2>;
            if (block.type === "ul") {
              return (
                <ul key={index}>
                  {(block.items || []).map((line, lineIndex) => (
                    <li key={lineIndex}>{line}</li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <p className="muted">Obsah bude doplnen.</p>
      )}

      <div className="detailCtas">
        <Link className="btn primary lg" to="/">
          Zpet na hlavni stranku
        </Link>
        {item.mailto ? (
          <a className="btn ghost" href={item.mailto}>
            Poptat emailem
          </a>
        ) : null}
      </div>
    </article>
  );
}
