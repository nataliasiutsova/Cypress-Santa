const loginSelectors = require('../fixtures/loginSelectors.json');
const regSelectors = require('../fixtures/registrationSelectors.json');

Cypress.Commands.add('loginUI', (userEmail, userPassword) => {
  cy.contains('Вход и регистрация').click({ force: true });
  cy.get(loginSelectors.emailField).type(userEmail);
  cy.get(loginSelectors.passwordField).type(userPassword);
  cy.get(loginSelectors.loginButton).click();
});

Cypress.Commands.add('regUI', (userName, userEmail) => {
  cy.contains('Вход и регистрация').click({ force: true });
  cy.get(regSelectors.regLink).click();
  cy.get(regSelectors.nameField).type(userName);
  cy.get(regSelectors.emailField).type(userEmail);
  cy.get(regSelectors.regButton).click();
});
