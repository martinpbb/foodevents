import eventsData from "../../src/data/events.json";

describe("Navigation and hash routing", () => {
  beforeEach(() => {
    cy.visitHash("/");
  });

  it("scrolls to core sections from desktop nav", () => {
    cy.getByCy("nav-about").click();
    cy.getByCy("section-about").should("be.visible");

    cy.getByCy("nav-events").click();
    cy.getByCy("section-events").should("be.visible");

    cy.getByCy("nav-photos").click();
    cy.getByCy("section-photos").should("be.visible");

    cy.getByCy("nav-services").click();
    cy.getByCy("section-services").should("be.visible");

    cy.getByCy("nav-partners").click();
    cy.getByCy("section-partners").should("be.visible");

    cy.getByCy("nav-contact").click();
    cy.getByCy("section-contact").should("be.visible");
  });

  it("supports direct hash route and refresh for event detail", () => {
    const target = eventsData.items[0];
    cy.visitHash(`/akce/${target.slug}`);
    cy.assertHashPath(`/akce/${target.slug}`);
    cy.getByCy("event-detail-page").should("be.visible");
    cy.getByCy("detail-title").should("contain", target.title);

    cy.reload();
    cy.getByCy("event-detail-page").should("be.visible");
    cy.getByCy("detail-title").should("contain", target.title);
  });
});
