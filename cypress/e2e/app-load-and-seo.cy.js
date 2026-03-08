describe("App load and SEO smoke", () => {
  it("loads home route correctly under HashRouter", () => {
    cy.visitHash("/");
    cy.assertHashPath("/");
    cy.getByCy("main-content").should("be.visible");
    cy.getByCy("hero-section").should("be.visible");
  });

  it("has core SEO tags in document head", () => {
    cy.visitHash("/");

    cy.title().should("contain", "FoodEvents");
    cy.get('meta[name="description"]').should("have.attr", "content").and("not.be.empty");
    cy.get('link[rel="canonical"]')
      .should("have.attr", "href")
      .and("include", "https://www.foodevents.cz");
  });
});
