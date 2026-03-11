import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Modal from "../components/ui/Modal.jsx";
import { parseISODate } from "../components/calendar/calendarUtils.js";
import events from "../data/events.json";

function formatDateLabel(item) {
  if (item.when) return item.when;
  const from = parseISODate(item.dateFrom);
  const to = parseISODate(item.dateTo || item.dateFrom);

  if (!from) return "Termín bude upřesněn";

  const format = (date) =>
    new Intl.DateTimeFormat("cs-CZ", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(date);

  if (!to || from.getTime() === to.getTime()) return format(from);
  return `${format(from)} - ${format(to)}`;
}

function EventDetailPageContent({ slug }) {
  const item = useMemo(() => {
    const source = Array.isArray(events?.items) ? events.items : [];
    return source.find((entry) => entry.slug === slug) || null;
  }, [slug]);

  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const facts = Array.isArray(item?.facts) ? item.facts : [];
  const tags = Array.isArray(item?.tags) ? item.tags : [];
  const program = Array.isArray(item?.program) ? item.program : [];
  const practicalInfo = Array.isArray(item?.practicalInfo) ? item.practicalInfo : [];
  const faq = Array.isArray(item?.faq) ? item.faq : [];
  const gallery = Array.isArray(item?.gallery) ? item.gallery : [];
  const content = Array.isArray(item?.content) ? item.content : [];

  useEffect(() => {
    const hasLightbox = lightboxIndex !== null;
    if (!hasLightbox) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => {
          if (current === null || gallery.length <= 1) return current;
          return (current + 1) % gallery.length;
        });
      }

      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => {
          if (current === null || gallery.length <= 1) return current;
          return (current - 1 + gallery.length) % gallery.length;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, gallery.length]);

  if (!item) {
    return (
      <div className="container pagePad" data-cy="detail-not-found">
        <h1 className="h2">Položka nenalezena</h1>
        <p className="muted">Zkontrolujte odkaz nebo se vraťte na hlavní stránku.</p>
        <Link className="btn primary lg" to="/">
          Zpět na hlavní stránku
        </Link>
      </div>
    );
  }

  const typeLabel = item.typeLabel || item.eventType || "Akce";
  const dateLabel = formatDateLabel(item);
  const placeLabel = item.where || item.place || "Místo bude upřesněno";
  const currentGalleryItem = lightboxIndex !== null ? gallery[lightboxIndex] : null;

  return (
    <article className="container pagePad eventDetailPage" data-cy="event-detail-page">
      <section className="eventHero" data-cy="event-hero">
        <div className="eventHeroLeft">
          <div className="eyebrow">{typeLabel}</div>
          <h1 className="h1" data-cy="detail-title">{item.title}</h1>
          {item.subtitle ? <p className="lead eventSubtitle">{item.subtitle}</p> : null}
          {item.summary ? <p className="eventSummary">{item.summary}</p> : null}

          <div className="detailMeta eventMetaRow">
            <span className="pill" data-cy="detail-date">Termín: {dateLabel}</span>
            <span className="pill" data-cy="detail-place">Místo: {placeLabel}</span>
            {item.eventType ? <span className="pill">Formát: {item.eventType}</span> : null}
          </div>

          {tags.length ? (
            <div className="eventTags" data-cy="event-tags">
              {tags.map((tag, index) => (
                <span key={`${tag}-${index}`} className="eventTagChip">{tag}</span>
              ))}
            </div>
          ) : null}

          <div className="eventHeroCtas">
            {item.mailto ? (
              <a className="btn primary" href={item.mailto}>
                Poptat e-mailem
              </a>
            ) : null}
            {item.ctaUrl ? (
              <a className="btn ghost" href={item.ctaUrl} target="_blank" rel="noreferrer">
                Odkaz
              </a>
            ) : null}
          </div>
        </div>

        {item.image?.src ? (
          <div className="eventHeroImageWrap">
            <img
              className="eventHeroImage"
              data-cy="detail-image"
              src={item.image.src}
              alt={item.image.alt || item.title}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="eventHeroImageWrap eventHeroImagePlaceholder" aria-hidden="true" />
        )}
      </section>

      {facts.length ? (
        <section className="eventSection" data-cy="event-facts">
          <h2 className="h3">Klíčové informace</h2>
          <div className="eventFactsGrid">
            {facts.map((fact, index) => (
              <article className="eventFactCard" key={`${fact.label || "fact"}-${index}`}>
                <div className="eventFactLabel">{fact.label}</div>
                <div className="eventFactValue">{fact.value}</div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {content.length ? (
        <section className="eventSection eventContentSection" data-cy="event-content">
          <div className="rich eventRich">
            {content.map((block, index) => {
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
        </section>
      ) : null}

      {program.length ? (
        <section className="eventSection" data-cy="event-program">
          <h2 className="h3">Program akce</h2>
          <ol className="eventProgramList">
            {program.map((entry, index) => (
              <li key={`${entry.time || "time"}-${index}`} className="eventProgramItem">
                <span className="eventProgramTime">{entry.time}</span>
                <span className="eventProgramTitle">{entry.title}</span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {practicalInfo.length ? (
        <section className="eventSection" data-cy="event-practical-info">
          <h2 className="h3">Praktické informace</h2>
          <ul className="eventPracticalList">
            {practicalInfo.map((line, index) => (
              <li key={`practical-${index}`}>{line}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {faq.length ? (
        <section className="eventSection" data-cy="event-faq">
          <h2 className="h3">FAQ</h2>
          <div className="eventFaqList">
            {faq.map((entry, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <article className={`eventFaqItem${isOpen ? " isOpen" : ""}`} key={`${entry.question}-${index}`}>
                  <button
                    type="button"
                    className="eventFaqTrigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex((current) => (current === index ? -1 : index))}
                  >
                    <span>{entry.question}</span>
                    <span className="eventFaqIcon" aria-hidden="true">{isOpen ? "-" : "+"}</span>
                  </button>
                  {isOpen ? <p className="eventFaqAnswer">{entry.answer}</p> : null}
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {gallery.length ? (
        <section className="eventSection" data-cy="event-gallery">
          <h2 className="h3">Galerie</h2>
          <div className="eventGalleryGrid">
            {gallery.map((image, index) => (
              <button
                type="button"
                key={`${image.thumb || image.full}-${index}`}
                className="eventGalleryItem"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Otevřít galerii: ${image.alt || `obrázek ${index + 1}`}`}
              >
                <img
                  src={image.thumb || image.full}
                  alt={image.alt || item.title}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <div className="detailCtas eventBottomCtas">
        <Link className="btn primary lg" to="/">
          Zpět na hlavní stránku
        </Link>
        {item.mailto ? (
          <a className="btn ghost" href={item.mailto}>
            Poptat e-mailem
          </a>
        ) : null}
      </div>

      <Modal
        open={lightboxIndex !== null}
        title={currentGalleryItem ? `Galerie (${lightboxIndex + 1}/${gallery.length})` : "Galerie"}
        onClose={() => setLightboxIndex(null)}
      >
        {currentGalleryItem ? (
          <figure className="eventLightboxFigure">
            <img src={currentGalleryItem.full || currentGalleryItem.thumb} alt={currentGalleryItem.alt || item.title} />
            <figcaption className="eventLightboxCaption">{currentGalleryItem.alt || item.title}</figcaption>
            {gallery.length > 1 ? (
              <div className="eventLightboxControls">
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => setLightboxIndex((current) => (current - 1 + gallery.length) % gallery.length)}
                >
                  Předchozí
                </button>
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => setLightboxIndex((current) => (current + 1) % gallery.length)}
                >
                  Další
                </button>
              </div>
            ) : null}
          </figure>
        ) : null}
      </Modal>
    </article>
  );
}

export default function EventDetailPage() {
  const { slug } = useParams();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  return <EventDetailPageContent key={slug} slug={slug} />;
}
