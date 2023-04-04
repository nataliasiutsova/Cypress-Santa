import { faker } from '@faker-js/faker';
import { LoginPage } from '../../pages/loginPage';
import { UserProfilePage } from '../../pages/userProfilePage';

const loginSelectors = require('../../fixtures/loginSelectors.json');

describe('Change user password', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const newPassword = faker.internet.password(6);
  const oldPassword = Cypress.env('userPassword');
  let loginPage = new LoginPage();
  let userProfilePage = new UserProfilePage();

  it('Change user password', () => {
    cy.contains('Вход и регистрация').click({ force: true });
    loginPage.login(Cypress.env('userEmail'), Cypress.env('userPassword'));

    cy.contains('Коробки').should('exist'),
      cy.contains(Cypress.env('userName')).should('exist');

    cy.contains(Cypress.env('userName')).click({ force: true });
    userProfilePage.changePassword(newPassword);
    cy.log(newPassword);

    cy.get(
      ':nth-child(4) > .form-page-group__main > .quick-notification > .quick-notification__text-wrapper'
    )
      .wait(500)
      .should('be.visible')
      .and('contain.text', 'Ваш пароль сохранен')
      .and(
        'have.css',
        'background',
        'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box'
      );

    userProfilePage.logout();
    cy.url().should('include', '/');
  });

  it('Login with old password', () => {
    cy.contains('Вход и регистрация').click({ force: true });
    loginPage.login(Cypress.env('userEmail'), oldPassword);

    cy.get(loginSelectors.formError)
      .should('contain.text', 'Неверное имя пользователя или пароль')
      .and('have.css', 'background-color', 'rgb(255, 239, 243)');
  });

  it('Login with new password', () => {
    cy.contains('Вход и регистрация').click({ force: true });
    loginPage.login(Cypress.env('userEmail'), newPassword);

    cy.contains('Коробки').should('exist'),
      cy.contains(Cypress.env('userName')).should('exist');

    cy.contains(Cypress.env('userName')).click({ force: true });
    userProfilePage.changePassword(oldPassword);
  });
});
