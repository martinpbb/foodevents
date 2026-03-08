const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "mobile", width: 390, height: 844 },
];

describe("Responsive smoke checks", () => {
  viewports.forEach((viewport) => {
    it(`renders key blocks on ${viewport.name}`, () => {
      cy.viewport(viewport.width, viewport.height);
      cy.visitHash("/");

      cy.getByCy("hero-section").should("be.visible");
      cy.getByCy("section-events").should("be.visible");
      cy.getByCy("section-photos").scrollIntoView().should("be.visible");
      cy.getByCy("section-services").scrollIntoView().should("be.visible");
      cy.getByCy("section-contact").scrollIntoView().should("be.visible");
    });
  });
});
