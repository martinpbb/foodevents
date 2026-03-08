import eventsData from "../../src/data/events.json";

function getUpcomingItems(referenceDate) {
  return [...eventsData.items]
    .filter((event) => {
      const endDate = new Date(event.dateTo || event.dateFrom);
      endDate.setHours(23, 59, 59, 999);
      return endDate.getTime() >= referenceDate.getTime();
    })
    .sort(
      (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
    )
    .slice(0, 9);
}

describe("Events section, calendar and detail routes", () => {
  const today = new Date();
  today.setHours(10, 0, 0, 0);

  beforeEach(() => {
    cy.clock(today.getTime(), ["Date"]);
    cy.visitHash("/");
    cy.getByCy("section-events").scrollIntoView();
  });

  it("renders calendar and event-highlighted days", () => {
    cy.getByCy("events-calendar").should("be.visible");
    cy.getByCy("calendar-day-cell").should("have.length", 42);
    cy.get(".calendarCell.hasEvents").its("length").should("be.greaterThan", 0);
  });

  it("shows selected-day events inside calendar panel after day click", () => {
    cy.get(".calendarCell.hasEvents").eq(1).click();
    cy.getByCy("calendar-selected-day").should("contain", "Vybrano:");
    cy.getByCy("calendar-selected-events").should("exist");
    cy.getByCy("calendar-event-link")
      .first()
      .should("have.attr", "href")
      .and("include", "#/akce/");
  });

  it("renders upcoming events grid and opens detail from clicked card", () => {
    const referenceDate = new Date(today);
    referenceDate.setHours(0, 0, 0, 0);
    const expectedUpcoming = getUpcomingItems(referenceDate);

    cy.getByCy("upcoming-grid")
      .find('[data-cy="upcoming-event-card"]')
      .should("have.length", expectedUpcoming.length);

    cy.getByCy("upcoming-event-card")
      .first()
      .invoke("attr", "data-slug")
      .then((slug) => {
        cy.wrap(slug).as("slug");
      });

    cy.getByCy("upcoming-event-card").first().click();

    cy.get("@slug").then((slug) => {
      cy.assertHashPath(`/akce/${slug}`);
    });

    cy.getByCy("detail-page").should("be.visible");
    cy.getByCy("detail-title").should("not.be.empty");
    cy.getByCy("detail-date").should("contain", "Termin:");
    cy.getByCy("detail-place").should("contain", "Misto:");
    cy.getByCy("detail-image").should("be.visible");
  });

  it("shows not-found state for invalid event slug", () => {
    cy.visitHash("/akce/neexistujici-slug");
    cy.getByCy("detail-not-found").should("be.visible");
  });
});
