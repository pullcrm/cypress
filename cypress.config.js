const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,
  viewportHeight: 768,
  viewportWidth: 1280,
  pageLoadTimeout: 15000,
  video: false,
  responseTimeout: 30000,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
