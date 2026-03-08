import galleryData from "../../src/data/gallery.json";
import servicesData from "../../src/data/services.json";
import partnersData from "../../src/data/partners.json";
import siteData from "../../src/data/site.json";

describe("Content sections smoke", () => {
  beforeEach(() => {
    cy.visitHash("/");
  });

  it("renders hero section with headline, CTA and image", () => {
    cy.getByCy("hero-headline").should("be.visible").and("not.be.empty");
    cy.getByCy("hero-cta-events").should("be.visible").click();
    cy.getByCy("section-events").should("be.visible");
    cy.getByCy("hero-image").should("be.visible");
  });

  it("renders about section with team cards", () => {
    cy.getByCy("section-about").scrollIntoView();
    cy.getByCy("section-about-title").should("be.visible");
    cy.getByCy("team-grid").should("be.visible");
    cy.getByCy("team-card").its("length").should("be.greaterThan", 0);
    cy.getByCy("team-image").first().should("be.visible");
  });

  it("renders gallery section and image grid", () => {
    cy.getByCy("section-photos").scrollIntoView();
    cy.getByCy("gallery-grid").should("be.visible");
    cy.getByCy("gallery-item").should("have.length", galleryData.items.length);
  });

  it("renders services and partners sections with data-driven cards", () => {
    cy.getByCy("section-services").scrollIntoView();
    cy.getByCy("services-grid").should("be.visible");
    cy.getByCy("service-card").should("have.length", servicesData.items.length);

    cy.getByCy("section-partners").scrollIntoView();
    cy.getByCy("partners-grid").should("be.visible");
    cy.getByCy("partner-card").should("have.length", partnersData.items.length);
  });

  it("renders contact details, mailto and map iframe", () => {
    cy.getByCy("section-contact").scrollIntoView();

    cy.getByCy("contact-phone")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "tel:");

    cy.getByCy("contact-email")
      .should("be.visible")
      .and("have.attr", "href", `mailto:${siteData.contact.email}`);

    cy.getByCy("contact-address").should("be.visible");
    cy.getByCy("contact-mailto-submit").should("exist");
    cy.getByCy("contact-map-iframe").should("have.attr", "src").and("include", "google.com/maps");
  });
});
