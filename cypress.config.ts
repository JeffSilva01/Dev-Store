import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1400,
  viewportHeight: 850,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
})
