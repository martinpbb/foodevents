Cypress.Commands.add("getByCy", (value, ...args) => {
  return cy.get(`[data-cy="${value}"]`, ...args);
});

Cypress.Commands.add("visitHash", (path = "/") => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  cy.visit(`/#${normalized}`);
});

Cypress.Commands.add("assertHashPath", (path) => {
  cy.location("hash").should("eq", `#${path}`);
});
