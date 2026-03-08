export function parseISODate(value) {
  if (!value || typeof value !== "string") return null;

  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) return null;

  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
}

export function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function startOfCalendarGrid(monthDate) {
  const firstDay = startOfMonth(monthDate);
  const day = firstDay.getDay();
  const mondayIndex = (day + 6) % 7;
  firstDay.setDate(firstDay.getDate() - mondayIndex);
  return firstDay;
}

export function addDays(date, value) {
  const next = new Date(date);
  next.setDate(next.getDate() + value);
  return next;
}

export function formatMonthTitle(date, locale = "cs-CZ") {
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(date);
}
