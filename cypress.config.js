const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    downloadsFolder: 'cypress/downloads',
    defaultCommandTimeout: 5000,
    setupNodeEvents(on, config) {
    },
    baseUrl: 'ENTER URL HERE'
  },
});
