const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'bp6ou6',
  viewportWidth: 2048,
  viewportHeight: 1152,
  reporter: 'cypress-mochawesome-reporter',
  env: {
    userName: 'Santa',
    userEmail: 'test-email2024+1@mail.ru',
    userPassword: 'asdfgh',
  },
  e2e: {
    baseUrl: 'https://santa-secret.ru',
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
