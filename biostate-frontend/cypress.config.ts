import { defineConfig } from "cypress";
import { configureVisualRegression } from "cypress-visual-regression";

export default defineConfig({
  e2e: {
    env: {
      visualRegressionType: "regression",
    },
    screenshotsFolder: "./cypress/snapshots/actual",
    setupNodeEvents(on, config) {
      configureVisualRegression(on);
    },
  },
});
