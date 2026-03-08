import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import eventsData from "../../data/events.json";
import {
  addDays,
  formatMonthTitle,
  parseISODate,
  startOfCalendarGrid,
  startOfMonth,
  toISODate,
} from "./calendarUtils.js";

const WEEKDAYS = ["Po", "Ut", "St", "Ct", "Pa", "So", "Ne"];

function buildEventIndex(items) {
  const index = new Map();

  for (const event of items) {
    const from = parseISODate(event.dateFrom);
    const to = parseISODate(event.dateTo || event.dateFrom);
    if (!from || !to) continue;

    const end = to.getTime() < from.getTime() ? from : to;
    let current = new Date(from);
    let guard = 0;

    while (current.getTime() <= end.getTime() && guard < 370) {
      const iso = toISODate(current);
      const list = index.get(iso) || [];
      list.push(event);
      index.set(iso, list);

      current = addDays(current, 1);
      guard += 1;
    }
  }

  return index;
}

function resolveInitialMonth(items) {
  const firstWithDate = items.find((item) => parseISODate(item.dateFrom));
  const seedDate = firstWithDate ? parseISODate(firstWithDate.dateFrom) : new Date();
  return startOfMonth(seedDate || new Date());
}

function resolveInitialSelectedISO(items) {
  const firstWithDate = items.find((item) => parseISODate(item.dateFrom));
  const seedDate = firstWithDate ? parseISODate(firstWithDate.dateFrom) : new Date();
  return toISODate(seedDate || new Date());
}

export default function MonthCalendar({ onSelectDay }) {
  const events = useMemo(
    () => (Array.isArray(eventsData.items) ? eventsData.items : []),
    []
  );
  const [month, setMonth] = useState(() => resolveInitialMonth(events));
  const [selectedISO, setSelectedISO] = useState(() => resolveInitialSelectedISO(events));

  const eventIndex = useMemo(() => buildEventIndex(events), [events]);
  const gridStart = useMemo(() => startOfCalendarGrid(month), [month]);
  const days = useMemo(() => Array.from({ length: 42 }, (_, i) => addDays(gridStart, i)), [gridStart]);

  const selectedEvents = eventIndex.get(selectedISO) || [];
  const monthLabel = useMemo(() => formatMonthTitle(month), [month]);

  const monthHasEvents = useMemo(() => {
    const targetMonth = month.getMonth();
    const targetYear = month.getFullYear();

    for (const [iso] of eventIndex.entries()) {
      const date = parseISODate(iso);
      if (!date) continue;
      if (date.getMonth() === targetMonth && date.getFullYear() === targetYear) return true;
    }

    return false;
  }, [eventIndex, month]);

  const goMonth = (delta) => {
    const next = new Date(month);
    next.setMonth(next.getMonth() + delta);
    setMonth(startOfMonth(next));
  };

  const onDayClick = (date) => {
    const iso = toISODate(date);
    const list = eventIndex.get(iso) || [];
    setSelectedISO(iso);
    onSelectDay?.(iso, list);
  };

  return (
    <div className="calendar" data-cy="events-calendar">
      <div className="calendarHead">
        <div className="calendarTitle" data-cy="calendar-month-title">{monthLabel}</div>
        <div className="calendarControls">
          <button data-cy="calendar-prev-month" className="iconBtn" type="button" onClick={() => goMonth(-1)} aria-label="Predchozi mesic">
            &lt;
          </button>
          <button data-cy="calendar-today" className="iconBtn" type="button" onClick={() => setMonth(startOfMonth(new Date()))}>
            Dnes
          </button>
          <button data-cy="calendar-next-month" className="iconBtn" type="button" onClick={() => goMonth(1)} aria-label="Dalsi mesic">
            &gt;
          </button>
        </div>
      </div>

      <div className="calendarGrid" role="grid" aria-label="Kalendar akci">
        {WEEKDAYS.map((dayName) => (
          <div key={dayName} className="calendarDow" role="columnheader">
            {dayName}
          </div>
        ))}

        {days.map((date) => {
          const iso = toISODate(date);
          const inCurrentMonth = date.getMonth() === month.getMonth();
          const count = (eventIndex.get(iso) || []).length;
          const isSelected = selectedISO === iso;

          return (
            <button
              key={iso}
              data-cy="calendar-day-cell"
              data-date={iso}
              type="button"
              role="gridcell"
              className={[
                "calendarCell",
                inCurrentMonth ? "" : "isOutside",
                count ? "hasEvents" : "",
                isSelected ? "isSelected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onDayClick(date)}
              aria-label={`${iso}${count ? `, ${count} akce` : ""}`}
            >
              <span className="calendarDay">{date.getDate()}</span>
              {count ? <span className="calendarBadge" aria-hidden="true">{count}</span> : null}
            </button>
          );
        })}
      </div>

      <div className="calendarDayPanel" aria-live="polite">
        <div className="calendarDayTitle" data-cy="calendar-selected-day">
          Vybrano: <strong>{selectedISO}</strong>
        </div>

        {selectedEvents.length ? (
          <ul className="miniList" data-cy="calendar-selected-events">
            {selectedEvents.map((event) => (
              <li key={event.id}>
                <Link data-cy="calendar-event-link" data-slug={event.slug} to={`/akce/${event.slug}`} className="miniListItemLink">
                  <div className="miniListItem">
                    <div className="miniListTitle">{event.title}</div>
                    <div className="miniListMeta">{event.place || "Misto neuvedeno"}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="emptyHint">V tento den nejsou zadne akce.</div>
        )}

        {!monthHasEvents ? <div className="emptyHint subtle">V tomto mesici nejsou naplanovane akce.</div> : null}
      </div>
    </div>
  );
}
