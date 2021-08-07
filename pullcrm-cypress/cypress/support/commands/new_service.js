let element = require('../../storage/dataTest.json');
Cypress.Commands.add('addСategoryService', (categoryName, ) => {
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
Cypress.Commands.add('addService', (inputServiceName, price, time, description) => {
    cy.get(element.navbarDesktop)
        .find(element.proceduresLink)
        .click();
    cy.get(element.proceduresPage)
        .should('be.visible');
    cy.get('button')
        .contains('Добавить услугу')
        .click();
    cy.get(element.inputServiceName)
        .type(inputServiceName)
    cy.get(element.inputPrice)
        .type(price)
    cy.get(element.inputTime)
        .click();
    cy.get(element.selectBody)
        .contains(time)
        .click();
    cy.get(element.inputDescription)
        .type(description)
    cy.get(element.submitBtn)
        .click().wait(1000);
    cy.get(element.proceduresPageProcedureCard).within(() => {
        cy.contains(inputServiceName);
        cy.contains(price);
        cy.contains(time);
        cy.contains(description);

    });


});