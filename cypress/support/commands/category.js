let element = require('../../storage/dataTest.json');

Cypress.Commands.add('addСategoryProcedure', (categoryName) => {
    cy.get(element.navbarDesktop)
        .find(element.proceduresLink)
        .click();
    cy.get(element.proceduresPage)
        .should('be.visible')
    cy.get('button')
        .contains('Добавить категорию')
        .click();
    cy.get(element.inputCategogyName)
        .type(categoryName);
    cy.get(element.submitBtn)
        .click();
});