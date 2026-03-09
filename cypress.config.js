import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/*.cy.{js,jsx}",
    supportFile: "cypress/support/e2e.js",
    video: false,
    screenshotsFolder: "cypress/screenshots",
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });

      return config;
    },
  },
  viewportWidth: 1440,
  viewportHeight: 900,
  chromeWebSecurity: false,
  watchForFileChanges: false,
});
