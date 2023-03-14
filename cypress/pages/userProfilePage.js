export class UserProfilePage {
  elements = {
    nameField: () =>
      cy.get(
        ':nth-child(1) > .form-page-group__main > :nth-child(2) > .frm-wrapper > .frm'
      ),
    emailField: () =>
      cy.get('.layout-column-start > .layout-row-start > .frm-wrapper > .frm'),
    saveNameButton: () => cy.get(':nth-child(2) > .btn-service'),
    saveEmailButton: () =>
      cy.get('.layout-column-start > .layout-row-start > .btn-service'),
    emailCheckbox: () => cy.get(':nth-child(1) > .switch-panel__toggle-wrap'),
    vkCheckbox: () => cy.get(':nth-child(2) > .switch-panel__toggle-wrap'),
    telegramCheckbox: () =>
      cy.get(':nth-child(3) > .switch-panel__toggle-wrap'),
    googleButton: () => cy.get(':nth-child(1) > .social-button'),
    vkButton: () => cy.get(':nth-child(2) > .social-button'),
    facebookButton: () => cy.get(':nth-child(3) > .social-button'),
    telegramButton: () => cy.get(':nth-child(4) > .social-button'),
    newPasswordField: () =>
      cy.get('.layout-column-start > :nth-child(1) > .frm'),
    confirmPasswordField: () =>
      cy.get(
        ':nth-child(4) > .form-page-group__main > .layout-column-start > :nth-child(2) > .frm'
      ),
    savePasswordButton: () => cy.get('.layout-row-end > .btn-service'),
    removeProfileField: () =>
      cy.get(
        ':nth-child(5) > .form-page-group__main > .layout-column-start > .frm-wrapper > .frm'
      ),
    removeButton: () =>
      cy.get(
        ':nth-child(3) > .layout-column-start > .layout-row-end > .btn-service'
      ),
    mainPageLink: () => cy.get('[href="/"] > :nth-child(1)'),
    boxLink: () => cy.get('[href="/account/boxes"] > .header-item'),
    notificationLink: () =>
      cy.get('.header__items > .layout-row-start > :nth-child(2)'),
    logoutLink: () => cy.get('.base--clickable > .txt--med'),
  };

  returnMainPage() {
    this.elements.mainPageLink().click();
  }
  openBoxesPage() {
    this.elements.boxLink().click();
  }
  openNotificationPage() {
    this.elements.notificationLink().click();
  }
  logout() {
    this.elements.logoutLink().click();
  }

  changeUserName(userName) {
    this.elements.nameField().clear().type(userName);
    this.elements.saveNameButton().click();
  }
  changeUserEmail(userEmail) {
    this.elements.emailField().clear().type(userEmail);
    this.elements.saveEmailButton().click();
  }

  actionEmailCheckbox() {
    this.elements.emailCheckbox().check();
  }
  actionVkCheckbox() {
    this.elements.vkCheckbox().check();
  }
  actionTelegramCheckbox() {
    this.elements.telegramCheckbox().check();
  }

  linkGoogleAccount() {
    this.elements.googleButton().click();
  }
  linkVkAccount() {
    this.elements.vkButton().click();
  }
  linkFacebookAccount() {
    this.elements.facebookButton().click();
  }
  linkTelegramAccount() {
    this.elements.telegramButton().click();
  }

  changePassword(userPassword) {
    this.elements.newPasswordField().type(userPassword);
    this.elements.confirmPasswordField().type(userPassword);
    this.elements.savePasswordButton().click();
  }

  removeUserProfile() {
    this.elements.removeProfileField().type('Удалить профиль');
    this.elements.removeButton().click();
  }
}
