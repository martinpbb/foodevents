describe("Calendar behavior interactions", () => {
  const today = new Date();
  today.setHours(10, 0, 0, 0);

  beforeEach(() => {
    cy.clock(today.getTime(), ["Date"]);
    cy.visitHash("/");
    cy.getByCy("section-events").scrollIntoView();
  });

  it("navigates months and resets using the Dnes action", () => {
    cy.getByCy("calendar-month-title")
      .invoke("text")
      .then((title) => {
        cy.wrap(title.trim()).as("initialMonthTitle");
      });

    cy.getByCy("calendar-next-month").click();

    cy.getByCy("calendar-month-title")
      .invoke("text")
      .then((title) => {
        cy.get("@initialMonthTitle").then((initialTitle) => {
          cy.wrap(title.trim()).should("not.eq", initialTitle);
        });
      });

    cy.getByCy("calendar-prev-month").click();
    cy.getByCy("calendar-month-title")
      .invoke("text")
      .then((title) => {
        cy.get("@initialMonthTitle").then((initialTitle) => {
          cy.wrap(title.trim()).should("eq", initialTitle);
        });
      });

    cy.getByCy("calendar-next-month").click();
    cy.getByCy("calendar-today").click();

    cy.getByCy("calendar-month-title")
      .invoke("text")
      .then((title) => {
        cy.get("@initialMonthTitle").then((initialTitle) => {
          cy.wrap(title.trim()).should("eq", initialTitle);
        });
      });
  });

  it("shows empty-day helper when selecting a day without events", () => {
    cy.getByCy("calendar-day-cell").not(".hasEvents").first().click();

    cy.getByCy("calendar-selected-events").should("not.exist");
    cy.contains(".calendarDayPanel .emptyHint", "V tento den nejsou zadne akce.").should("be.visible");
  });

  it("opens event detail from selected-day panel link", () => {
    cy.get(".calendarCell.hasEvents").first().click();

    cy.getByCy("calendar-event-link")
      .first()
      .invoke("attr", "data-slug")
      .then((slug) => {
        cy.getByCy("calendar-event-link").first().click();
        cy.assertHashPath(`/akce/${slug}`);
      });

    cy.getByCy("detail-page").should("be.visible");
  });
});
