describe("Extended responsive smoke", () => {
  it("supports mobile menu open/close and section navigation", () => {
    cy.viewport(390, 844);
    cy.visitHash("/");

    cy.getByCy("mobile-menu-toggle").click();
    cy.getByCy("mobile-menu").should("have.class", "open");
    cy.getByCy("mobile-nav-events").click();

    cy.getByCy("section-events").should("be.visible");

    cy.getByCy("mobile-menu-toggle").click();
    cy.getByCy("mobile-menu-close").click();
    cy.getByCy("mobile-menu").should("not.have.class", "open");
  });
});
