const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'bp6ou6',
  env: {
    userName: 'test1',
    userEmail: 'test-email2024+1@mail.ru',
    userPassword: 'LR2832',
  },
  e2e: {
    baseUrl: 'https://staging.lpitko.ru',
    watchForFileChanges: false,
    setupNodeEvents(on, config) {},
  },
});
