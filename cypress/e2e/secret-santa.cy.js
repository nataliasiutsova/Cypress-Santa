/// <reference types="cypress" />

describe('Santa-secret UI testing', () => {
  beforeEach(() => {
    cy.visit('https://santa-secret.ru/');
  });

  it('Check "Вход и регистрация" link', () => {
    cy.get('.header').should('be.visible');

    cy.get('.header__items').contains('Вход и регистрация');

    cy.get('[href="/login"]').each(($a, index) => {
      if (index < 1) {
        cy.wrap($a).click({ force: true });
      }
    });
    cy.url().should('eq', 'https://santa-secret.ru/login');
  });
});
