let element = require('../../storage/dataTest.json');

Cypress.Commands.add('regNewSpecialists', (companyName, specialistsName, specialistsTel, pass) => {
    cy.get(element.navbarDesktop)
        .find(element.specialistsLink)
        .click();
    cy.get(element.specialistsPage).contains(companyName)
        .should('be.visible');
    cy.get('button').contains('Добавить сотрудника')
        .click();
    cy.get(element.popup)
        .find(element.inputPhone)
        .type(specialistsTel)
    cy.get(element.popup)
        .find(element.inputName)
        .type(specialistsName);
    cy.get(element.submitBtn)
        .click();
    cy.get(element.inputSmsCodeZ)
        .type(pass).wait(3000)





})