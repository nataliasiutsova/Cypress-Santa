const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'bp6ou6',
  env: {
    userName: 'Tester',
    email: 'test-email2023@mail.ru',
    password: 'qwerty',
  },
  e2e: {
    baseUrl: 'https://staging.lpitko.ru',
    pageLoadTimeout: 20000,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
