Cypress.Commands.add('loginUI', (email, password) => {
  cy.get(
    '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med'
  ).click();
  cy.get(':nth-child(3) > .frm').type(email);
  cy.get(':nth-child(4) > .frm').type(password);
  cy.get('.btn-main').click();
});
