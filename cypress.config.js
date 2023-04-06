const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'bp6ou6',
  env: {
    userName: 'Tester',
    userEmail: 'test-email2023new@mail.ru',
    userPassword: 'qwerty',
  },
  e2e: {
    baseUrl: 'https://staging.lpitko.ru',
    watchForFileChanges: false,
    setupNodeEvents(on, config) {},
  },
});
