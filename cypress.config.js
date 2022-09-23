/* eslint-disable */
import { defineConfig } from 'cypress'

const { lighthouse, pa11y, prepareAudit } = require('cypress-audit')

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      CLOUDINARY_MAX_RESULTS: 10,
    },
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions)
      })

      on('task', {
        lighthouse: lighthouse(), // calling the function is important
        pa11y: pa11y(), // calling the function is important
      })
    },
  },
})
