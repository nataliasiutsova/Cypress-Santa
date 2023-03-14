export class LoginPage {
  elements = {
    emailField: () => cy.get(':nth-child(3) > .frm'),
    passwordField: () => cy.get(':nth-child(4) > .frm'),
    loginButton: () => cy.get('.btn-main'),
  };
  login(userEmail, userPassword) {
    this.elements.emailField().type(userEmail);
    this.elements.passwordField().type(userPassword);
    this.elements.loginButton().click();
  }
}
