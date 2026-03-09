import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/*.cy.{js,jsx}",
    supportFile: "cypress/support/e2e.js",
    video: false,
    screenshotsFolder: "cypress/screenshots",
  },
  viewportWidth: 1440,
  viewportHeight: 900,
  chromeWebSecurity: false,
  watchForFileChanges: false,
});
