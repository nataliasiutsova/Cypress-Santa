const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'bp6ou6',
  env: {
    userName: 'Tester',
    userEmail: 'test-email2023@mail.ru',
    userPassword: 'qwerty',
  },
  e2e: {
    baseUrl: 'https://staging.lpitko.ru',
    pageLoadTimeout: 20000,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      on('task', {
        save: (userName) => {
          return (config.env.userName = userName);
        },
        load: () => {
          return config.env.userName || null;
        },
      });
    },
    // implement node event listeners here
  },
});
