let element = require('../../storage/dataTest.json');

Cypress.Commands.add('authorization', (user) => {
    cy.get(element.login)
        .click();
    cy.get(element.loginPopUp)
        .should('be.visible');
    cy.contains('Авторизация');
    cy.get(element.inputPhone)
        .type(user.tel);
    cy.get(element.inputPass)
        .type(user.pass);
    cy.get(element.submitBtn)
        .click();
    cy.get(element.navbarDesktop)
        .should('be.visible');
});