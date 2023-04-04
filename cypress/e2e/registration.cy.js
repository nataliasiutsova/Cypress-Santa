const { faker } = require('@faker-js/faker');
const regSelectors = require('../fixtures/registrationSelectors.json');
const regTestData = require('../fixtures/regTestData.json');

describe('Registration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const userName = faker.name.firstName();

  it('Successful user registration', () => {
    cy.regUI(userName, Cypress.env('userEmail'));
    cy.get(regSelectors.message).should('have.text', 'Письмо отправлено!');
    cy.get(regSelectors.signInButton).should('exist').click();
    cy.url().should('include', '/login');
  });

  it('Repeated registration', () => {
    const existUser = userName;
    cy.regUI(existUser, Cypress.env('userEmail'));
    cy.get(regSelectors.formError)
      .should('be.visible')
      .and('contain.text', 'Такой пользователь уже зарегистрирован.')
      .and('have.css', 'background-color', 'rgb(255, 239, 243)');
    cy.contains('Войти?').click({ force: true });
    cy.url().should('include', '/login');
  });

  it('Registration with blank fields', () => {
    cy.contains('Вход и регистрация').click({ force: true });
    cy.get(regSelectors.regLink).click();
    cy.get(regSelectors.regButton).click();

    cy.get(regSelectors.formError)
      .should('be.visible')
      .and('contain.text', 'Некорректное поле')
      .and('have.css', 'background-color', 'rgb(255, 239, 243)');
  });

  it('Registration with blank user name field', () => {
    cy.contains('Вход и регистрация').click({ force: true });
    cy.get(regSelectors.regLink).click();
    cy.get(regSelectors.emailField).type(Cypress.env('userEmail'));
    cy.get(regSelectors.regButton).click();

    cy.get(regSelectors.formError)
      .should('be.visible')
      .and('contain.text', 'Некорректное поле')
      .and('have.css', 'background-color', 'rgb(255, 239, 243)');
  });

  it('Registration with blank user email field', () => {
    cy.contains('Вход и регистрация').click({ force: true });
    cy.get(regSelectors.regLink).click();
    cy.get(regSelectors.nameField).type(userName);
    cy.get(regSelectors.regButton).click();

    cy.get(regSelectors.formError)
      .should('be.visible')
      .and('contain.text', 'Некорректное поле')
      .and('have.css', 'background-color', 'rgb(255, 239, 243)');
  });

  it('Registration with incorrect email format', () => {
    cy.wrap(regTestData.invalidEmail).each(($item) => {
      cy.contains('Вход и регистрация').click({ force: true });
      cy.get(regSelectors.regLink).click();
      cy.get(regSelectors.emailField).clear().type($item);
      cy.get(regSelectors.nameField).clear().type(userName);
    });

    cy.get(regSelectors.fieldEmailError)
      .should('be.visible')
      .and('contain.text', 'Некорректный email');
    cy.get(regSelectors.emailField).should(
      'have.css',
      'border',
      '1px solid rgb(237, 64, 106)'
    );
  });

  it('User name field does not accept invalid format data', () => {
    cy.contains('Вход и регистрация').click({ force: true });
    cy.get(regSelectors.regLink).click();
    cy.get(regSelectors.nameField).type(regTestData.invalidName[0]);
    cy.get(regSelectors.emailField).type('t');
    cy.get(regSelectors.fieldNameError)
      .should('be.visible')
      .and('contain.text', 'Обязательное поле');
    cy.get(regSelectors.nameField).should(
      'have.css',
      'border',
      '1px solid rgb(237, 64, 106)'
    );

    cy.get(regSelectors.nameField).clear().type(regTestData.invalidName[1]);
    cy.get(regSelectors.emailField).type('t');
    cy.get(regSelectors.fieldNameError)
      .should('be.visible')
      .and('contain.text', 'Имя должно быть более 2 символов');
    cy.get(regSelectors.nameField).should(
      'have.css',
      'border',
      '1px solid rgb(237, 64, 106)'
    );

    cy.get(regSelectors.nameField).clear().type(regTestData.invalidName[2]);
    cy.get(regSelectors.emailField).type('t');
    cy.get(regSelectors.fieldNameError)
      .should('be.visible')
      .and('contain.text', 'Имя должно быть не более 64 символов');
    cy.get(regSelectors.nameField).should(
      'have.css',
      'border',
      '1px solid rgb(237, 64, 106)'
    );
  });
});
