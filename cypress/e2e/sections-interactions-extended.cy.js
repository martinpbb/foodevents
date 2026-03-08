import galleryData from "../../src/data/gallery.json";

describe("Gallery, services, partners and contact interactions", () => {
  beforeEach(() => {
    cy.visitHash("/");
  });

  it("filters gallery by category and opens/closes modal", () => {
    const kitchenItems = galleryData.items.filter((item) => item.category === "Kitchen");

    cy.getByCy("section-photos").scrollIntoView();
    cy.getByCy("gallery-filter-kitchen").click();
    cy.getByCy("gallery-item").should("have.length", kitchenItems.length);

    cy.getByCy("gallery-item").first().click();
    cy.getByCy("modal").should("be.visible");
    cy.getByCy("modal-title").should("not.be.empty");

    cy.get("body").type("{esc}");
    cy.getByCy("modal").should("not.exist");
  });

  it("opens service detail and verifies service poptat link", () => {
    cy.getByCy("section-services").scrollIntoView();

    cy.getByCy("service-card").first().within(() => {
      cy.getByCy("service-mailto-link").should("have.attr", "href").and("include", "mailto:");
      cy.getByCy("service-detail-link").click();
    });

    cy.getByCy("detail-page").should("be.visible");
    cy.getByCy("detail-date").should("contain", "Termin:");
  });

  it("opens partner detail from partner card", () => {
    cy.getByCy("section-partners").scrollIntoView();
    cy.getByCy("partner-card").first().click();

    cy.getByCy("detail-page").should("be.visible");
    cy.getByCy("detail-title").should("not.be.empty");
    cy.getByCy("detail-place").should("contain", "Misto:");
  });

  it("keeps contact submit disabled until form is valid and then builds mailto", () => {
    cy.getByCy("section-contact").scrollIntoView();

    cy.getByCy("contact-mailto-submit")
      .should("have.attr", "aria-disabled", "true")
      .and("have.attr", "href", "#");

    cy.getByCy("contact-input-name").type("Jan Novak");
    cy.getByCy("contact-input-email").type("jan.novak@example.com");
    cy.getByCy("contact-input-message").type("Dobry den, mam zajem o catering na firemni akci.");

    cy.getByCy("contact-mailto-submit")
      .should("have.attr", "aria-disabled", "false")
      .and("have.attr", "href")
      .and("include", "mailto:")
      .and("include", "subject=")
      .and("include", "Jmeno%3A%20Jan%20Novak")
      .and("include", "Email%3A%20jan.novak%40example.com");
  });
});
