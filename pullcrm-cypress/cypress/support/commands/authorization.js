let element = require('../../storage/dataTest.json');

Cypress.Commands.add('authorization', (tel, pass) => {
    cy.get(element.login)
        .click();
    cy.get(element.loginPopUp)
        .should('be.visible');
    cy.contains('Авторизация');
    cy.get(element.inputPhone)
        .type(tel);
    cy.get(element.inputPass)
        .type(pass);
    cy.get(element.submitBtn)
        .click();
    cy.get(element.navbarDesktop)
        .should('be.visible');
});