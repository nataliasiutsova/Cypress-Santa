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
    pageLoadTimeout: 20000,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      on('task', {
        save1: (x) => {
          return (config.env.val1 = x);
        },
        load1: () => {
          return config.env.val1 || null;
        },
      }),
        on('task', {
          save2: (y) => {
            return (config.env.val2 = y);
          },
          load2: () => {
            return config.env.val2 || null;
          },
        });
    },
  },
});
