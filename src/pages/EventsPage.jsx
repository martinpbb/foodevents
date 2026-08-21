import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import eventsData from "../data/events.json";
import { parseISODate } from "../components/calendar/calendarUtils.js";

function compareByDate(a, b) {
  const dateA = parseISODate(a.dateFrom)?.getTime() || Number.MAX_SAFE_INTEGER;
  const dateB = parseISODate(b.dateFrom)?.getTime() || Number.MAX_SAFE_INTEGER;
  return dateA - dateB;
}

function formatRange(item) {
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

export default function EventsPage() {
  const events = useMemo(
    () =>
      (Array.isArray(eventsData?.items) ? [...eventsData.items] : []).sort(compareByDate),
    []
  );

  return (
    <article className="container pagePad" data-cy="events-page">
      <div className="detailTop">
        <div>
          <div className="eyebrow">Akce</div>
          <h1 className="h1">Prehled akci</h1>
          <p className="lead">
            Vsechny verejne eventy FoodEvents na jednom miste.
          </p>
        </div>
      </div>

      <div className="upcomingGrid" style={{ marginTop: "1.5rem" }}>
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/akce/${event.slug}`}
            className="eventCard eventCardLink"
            data-cy="events-page-card"
          >
            {event.image?.src ? (
              <img
                className="eventCardMedia eventUpcomingMedia"
                src={event.image.src}
                alt={event.image.alt || event.title}
                loading="lazy"
              />
            ) : null}
            <div className="eventCardTop">
              <div className="eventTitle">{event.title}</div>
              <div className="eventTag">{event.eventType || "Akce"}</div>
            </div>
            <div className="muted">
              {formatRange(event)} | {event.place || "Misto neuvedeno"}
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}
