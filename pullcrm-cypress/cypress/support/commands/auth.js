let element = require('../../storage/dataTest.json');

Cypress.Commands.add('auth', (tel, pass) => {
    cy.get(element.login)
        .click();
    cy.get(element.loginPopUp)
        .should('be.visible');
    cy.get(element.inputPhone)
        .type(tel);
    cy.get(element.inputPass)
        .type(pass);
    cy.get(element.submit)
        .click();
    cy.get(element.navbarDesktop)
        .should('be.visible');
});