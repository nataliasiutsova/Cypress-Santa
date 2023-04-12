const { faker } = require('@faker-js/faker');
const loginSelectors = require('../fixtures/loginSelectors.json');
const regTestData = require('../fixtures/regTestData.json');

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const fakePas = faker.internet.password(6);

  it('Successful Login', () => {
    cy.loginUI(Cypress.env('userEmail'), Cypress.env('userPassword'));

    cy.get(loginSelectors.header)
      .should('contain.text', 'Коробки')
      .and('contain.text', 'Уведомления');
  });

  it('Login with wrong user password', () => {
    cy.loginUI(Cypress.env('userEmail'), fakePas);
    cy.get(loginSelectors.formError)
      .should('be.visible')
      .and('contain.text', 'Неверное имя пользователя или пароль')
      .and('have.css', 'background-color', 'rgb(255, 239, 243)');
  });

  it('Removing user profile', () => {
    cy.loginUI(Cypress.env('userEmail'), Cypress.env('userPassword'));
    cy.get(loginSelectors.userIcon).click({ force: true });
    cy.get(loginSelectors.deleteField).type('Удалить профиль');
    cy.get(loginSelectors.deleteButton).click();
    cy.url().should('include', '/');
  });

  it('Login after removing user profile', () => {
    cy.loginUI(Cypress.env('userEmail'), Cypress.env('userPassword'));

    cy.get(loginSelectors.formError)
      .should('be.visible')
      .and('contain.text', 'Мы не нашли пользователя с таким email.')
      .and('have.css', 'background-color', 'rgb(255, 239, 243)');

    cy.contains('Зарегистрироваться?').click();
    cy.url().should('include', '/register');
  });

  it('Login with blank fields', () => {
    cy.contains('Вход и регистрация').click({ force: true });
    cy.get(loginSelectors.loginButton).click();

    cy.get(loginSelectors.formError)
      .should('be.visible')
      .and('contain.text', 'В форме допущены ошибки')
      .and('have.css', 'background-color', 'rgb(255, 239, 243)');

    cy.get(loginSelectors.fieldEmailError)
      .should('be.visible')
      .and('contain.text', 'Обязательное поле');
    cy.get(loginSelectors.emailField).should(
      'have.css',
      'border',
      '1px solid rgb(237, 64, 106)'
    );
    cy.get(loginSelectors.fieldPasswordError)
      .should('be.visible')
      .and('contain.text', 'Обязательное поле');
    cy.get(loginSelectors.passwordField).should(
      'have.css',
      'border',
      '1px solid rgb(237, 64, 106)'
    );
  });

  it('Login with blank user email field', () => {
    cy.contains('Вход и регистрация').click({ force: true });
    cy.get(loginSelectors.passwordField).type(Cypress.env('userPassword'));
    cy.get(loginSelectors.loginButton).click();

    cy.get(loginSelectors.formError)
      .should('be.visible')
      .and('contain.text', 'В форме допущены ошибки')
      .and('have.css', 'background-color', 'rgb(255, 239, 243)');
    cy.get(loginSelectors.fieldEmailError)
      .should('be.visible')
      .and('contain.text', 'Обязательное поле');
    cy.get(loginSelectors.emailField).should(
      'have.css',
      'border',
      '1px solid rgb(237, 64, 106)'
    );
  });

  it('Login with blank user password field', () => {
    cy.contains('Вход и регистрация').click({ force: true });
    cy.get(loginSelectors.emailField).type(Cypress.env('userEmail'));
    cy.get(loginSelectors.loginButton).click();

    cy.get(loginSelectors.formError)
      .should('be.visible')
      .and('contain.text', 'В форме допущены ошибки')
      .and('have.css', 'background-color', 'rgb(255, 239, 243)');
    cy.get(loginSelectors.fieldPasswordError)
      .should('be.visible')
      .and('contain.text', 'Обязательное поле');
    cy.get(loginSelectors.passwordField).should(
      'have.css',
      'border',
      '1px solid rgb(237, 64, 106)'
    );
  });

  it('Login with incorrect email format', () => {
    cy.wrap(regTestData.invalidEmail).each(($item) => {
      cy.contains('Вход и регистрация').click({ force: true });
      cy.get(loginSelectors.emailField).clear().type($item);
      cy.get(loginSelectors.passwordField)
        .clear()
        .type(Cypress.env('userPassword'));

      cy.get(loginSelectors.fieldEmailError)
        .should('be.visible')
        .and('contain.text', 'Некорректный email')
        .and('have.css', 'border', '0px none rgb(237, 64, 106)');
    });
  });
});
