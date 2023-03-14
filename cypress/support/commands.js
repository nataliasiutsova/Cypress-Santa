const loginSelectors = require('../fixtures/loginSelectors.json');
const regSelectors = require('../fixtures/registrationSelectors.json');
const userProfileSelectors = require('../fixtures/userProfileSelectors.json');

Cypress.Commands.add('loginUI', (userEmail, userPassword) => {
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

Cypress.Commands.add('changePassword', (newPassword) => {
  cy.contains(Cypress.env('userName')).click({ force: true });
  cy.get(userProfileSelectors.newPasswordField).type(newPassword);
  cy.get(userProfileSelectors.confirmPasswordField).type(newPassword);
  cy.get(userProfileSelectors.savePasswordButton).click();
});
