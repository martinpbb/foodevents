import eventsData from "../../src/data/events.json";
import partnersData from "../../src/data/partners.json";
import servicesData from "../../src/data/services.json";

describe("Extended navigation and route coverage", () => {
  it("navigates from detail route to home contact through mobile menu", () => {
    cy.viewport(390, 844);
    cy.visitHash(`/akce/${eventsData.items[0].slug}`);

    cy.assertHashPath(`/akce/${eventsData.items[0].slug}`);
    cy.getByCy("mobile-menu-toggle").click();
    cy.getByCy("mobile-menu").should("have.class", "open");

    cy.getByCy("mobile-nav-contact").click();

    cy.assertHashPath("/");
    cy.getByCy("section-contact").should("be.visible");
    cy.getByCy("mobile-menu").should("not.have.class", "open");
  });

  it("opens partner and service detail routes from cards", () => {
    cy.visitHash("/");

    cy.getByCy("section-partners").scrollIntoView();
    cy.getByCy("partner-card").first().click();
    cy.assertHashPath(`/partneri/${partnersData.items[0].slug}`);
    cy.getByCy("detail-title").should("contain", partnersData.items[0].title);

    cy.visitHash("/");

    cy.getByCy("section-services").scrollIntoView();
    cy.getByCy("service-card").first().within(() => {
      cy.getByCy("service-detail-link").click();
    });
    cy.assertHashPath(`/sluzby/${servicesData.items[0].slug}`);
    cy.getByCy("detail-title").should("contain", servicesData.items[0].title);
  });

  it("renders 404 route and allows returning home", () => {
    cy.visitHash("/neexistujici-route");

    cy.getByCy("not-found-page").should("be.visible");
    cy.contains("a", "Zpet na hlavni stranku").click();

    cy.assertHashPath("/");
    cy.getByCy("hero-section").should("be.visible");
  });
});
