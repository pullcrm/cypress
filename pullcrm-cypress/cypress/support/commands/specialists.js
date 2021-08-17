let element = require('../../storage/dataTest.json');

Cypress.Commands.add('regNewSpecialists', (companyName, specialists) => {
    console.log(specialists)
    cy.get(element.navbarDesktop)
        .find(element.specialistsLink)
        .click();
    cy.get(element.specialistsPage).contains(companyName)
        .should('be.visible');
    cy.get('button').contains('Добавить сотрудника')
        .click();
    cy.get(element.popup)
        .find(element.inputPhone)
        .type(specialists.tel)
    cy.get(element.popup)
        .find(element.inputName)
        .type(specialists.name);
    cy.get(element.submitBtn)
        .click();
    cy.get(element.inputSmsCodeZ)
        .type(specialists.pass).wait(1000)
    cy.get(element.specialistsPageCard)
        .contains(specialists.name)
});