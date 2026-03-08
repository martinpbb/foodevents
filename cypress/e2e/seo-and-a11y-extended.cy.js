describe("Extended SEO and accessibility smoke", () => {
  beforeEach(() => {
    cy.visitHash("/");
  });

  it("includes social metadata and parseable structured data", () => {
    cy.get('meta[property="og:title"]').should("have.attr", "content").and("not.be.empty");
    cy.get('meta[property="og:description"]').should("have.attr", "content").and("not.be.empty");
    cy.get('meta[name="twitter:card"]').should("have.attr", "content", "summary_large_image");

    cy.get('script[type="application/ld+json"]')
      .should("exist")
      .invoke("text")
      .then((value) => {
        const data = JSON.parse(value);
        cy.wrap(data["@type"]).should("eq", "LocalBusiness");
        cy.wrap(data.name).should("eq", "FoodEvents");
      });
  });

  it("has core landmarks, skip-link target and accessible nav labels", () => {
    cy.get('a.skipLink[href="#main"]').should("exist");
    cy.get("main#main").should("be.visible");
    cy.get('nav[aria-label="Hlavni navigace"]').should("exist");

    cy.getByCy("section-events").scrollIntoView();
    cy.get('.calendarGrid[role="grid"]').should("have.attr", "aria-label", "Kalendar akci");
  });

  it("ensures visible images expose non-empty alt text", () => {
    cy.get("img:visible").each(($img) => {
      cy.wrap($img).should("have.attr", "alt").and("not.be.empty");
    });
  });
});
