import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Section from "../ui/Section.jsx";
import MonthCalendar from "../calendar/MonthCalendar.jsx";
import eventsData from "../../data/events.json";
import { parseISODate } from "../calendar/calendarUtils.js";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll.js";

function compareByUpcoming(a, b) {
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

export default function EventsSection() {
  const { ref, revealed } = useRevealOnScroll({ threshold: 0.15 });
  const events = useMemo(
    () => (Array.isArray(eventsData.items) ? eventsData.items : []),
    []
  );

  const upcoming = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return [...events]
      .filter((event) => {
        const endDate = parseISODate(event.dateTo || event.dateFrom);
        if (!endDate) return false;
        endDate.setHours(23, 59, 59, 999);
        return endDate.getTime() >= now.getTime();
      })
      .sort(compareByUpcoming)
      .slice(0, 9);
  }, [events]);

  return (
    <Section id="events" kicker="Akce" title="Kalendar a nadchazejici terminy">
      <div ref={ref} data-cy="events-layout" className={`eventsLayout reveal ${revealed ? "isIn" : ""}`}>
        <div className="card eventsCalendarCard">
          <MonthCalendar />
        </div>

        <div className="card subtle eventsUpcomingCard" data-cy="upcoming-events-section">
          <h3 className="h3">Nadchazejici akce</h3>
          {upcoming.length ? (
            <div className="upcomingGrid" data-cy="upcoming-grid">
              {upcoming.map((event) => (
                <Link
                  key={event.id}
                  data-cy="upcoming-event-card"
                  data-slug={event.slug}
                  to={`/akce/${event.slug}`}
                  className="eventCard eventCardLink"
                >
                  {event.image?.src ? (
                    <img
                      className="eventCardMedia eventUpcomingMedia"
                      data-cy="upcoming-event-image"
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
          ) : (
            <div className="emptyHint">Zatim nejsou naplanovane zadne dalsi akce.</div>
          )}
        </div>
      </div>
    </Section>
  );
}
