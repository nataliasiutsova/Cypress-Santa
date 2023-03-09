describe('Check the main links of santa-secrer app', () => {
  beforeEach('Login', () => {
    cy.visit('/');
    cy.loginUI(Cypress.env('email'), Cypress.env('password'));
  });

  it('Check "Коробки" link', () => {
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item'
    ).click();
    cy.url().should('include', '/account/boxes');
    cy.get('.toggle-menu')
      .should('contain.text', 'Архив')
      .and('contain.text', 'Мои Коробки');
  });

  it('Check "Создать коробку" link', () => {
    cy.get('.home-page-buttons > [href="/box/new"] > .btn-main').click();
    cy.url().should('include', '/box/new');
    cy.get('.form-card')
      .should('be.visible')
      .and('contain.text', 'Придумайте название коробке')
      .and('contain.text', 'Название коробки')
      .and('contain.text', 'Идентификатор');
  });

  it('Check "Быстрая жеребьевка" link', () => {
    cy.get('[href="/randomizer"] > .btn-secondary').click();
    cy.url().should('include', '/randomizer');
    cy.get('.form-card')
      .should('be.visible')
      .and('contain.text', 'Быстрая жеребьевка');
    cy.get(':nth-child(2) > .frm-wrapper > .frm').should(
      'have.value',
      Cypress.env('email')
    );
    cy.get(':nth-child(1) > .frm-wrapper > .frm').should(
      'have.value',
      Cypress.env('userName')
    );
  });

  it('Check "Profile" link', () => {
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account"] > .header-item > .header-item__text > .txt--med'
    ).click();
    cy.url().should('include', '/account');
    cy.get('.form-page__header')
      .should('be.visible')
      .and('contain.text', 'Настройки профиля');
    cy.get(
      ':nth-child(1) > .form-page-group__main > :nth-child(2) > .frm-wrapper > .frm'
    ).should('have.value', Cypress.env('userName'));
    cy.get(
      '.layout-column-start > .layout-row-start > .frm-wrapper > .frm'
    ).should('have.value', Cypress.env('email'));
  });
});
