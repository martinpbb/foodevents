import servicesData from "../../src/data/services.json";

describe("Requested user interaction flows", () => {
  beforeEach(() => {
    cy.visitHash("/");
    cy.assertHashPath("/");
  });

  it("A: opens gallery modal from Momentky and closes it via close button", () => {
    cy.getByCy("section-photos").scrollIntoView();

    cy.getByCy("gallery-item").first().click();

    cy.getByCy("modal").should("be.visible");
    cy.getByCy("modal-title").should("not.be.empty");
    cy.getByCy("modal").find("img").should("be.visible");

    cy.getByCy("modal-close").click();
    cy.getByCy("modal").should("not.exist");
  });

  it("B: opens first service detail via Detail button and returns to homepage", () => {
    const firstService = servicesData.items[0];

    cy.getByCy("section-services").scrollIntoView();

    cy.getByCy("service-card").first().within(() => {
      cy.getByCy("service-detail-link").should("exist").click();
    });

    cy.assertHashPath(`/sluzby/${firstService.slug}`);
    cy.getByCy("detail-page").should("be.visible");
    cy.getByCy("detail-title").should("contain", firstService.title);
    cy.getByCy("detail-image").should("be.visible");

    cy.contains("a", "Zpet na hlavni stranku").first().click();

    cy.assertHashPath("/");
    cy.getByCy("hero-section").should("be.visible");
  });

  it("C: hero CTA Prozkoumat akce shows events/calendar section", () => {
    cy.getByCy("hero-cta-events").click();

    cy.assertHashPath("/");
    cy.getByCy("section-events").should("be.visible");
    cy.getByCy("events-calendar").should("be.visible");
  });

  it("D: header menu items show correct sections", () => {
    cy.getByCy("nav-about").click();
    cy.assertHashPath("/");
    cy.getByCy("section-about").should("be.visible");

    cy.getByCy("nav-events").click();
    cy.assertHashPath("/");
    cy.getByCy("section-events").should("be.visible");

    cy.getByCy("nav-photos").click();
    cy.assertHashPath("/");
    cy.getByCy("section-photos").should("be.visible");

    cy.getByCy("nav-contact").click();
    cy.assertHashPath("/");
    cy.getByCy("section-contact").should("be.visible");
  });
});
