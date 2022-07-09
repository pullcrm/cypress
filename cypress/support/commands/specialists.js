let element = require('../../storage/dataTest.json');
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
}); //отключить отслеживание ошибок в консоле
Cypress.Commands.add('regNewSpecialists', (companyName, specialists) => {
    console.log(specialists)
    cy.get(element.navbarDesktop)
        .find(element.specialistsLink)
        .click();
    cy.get(element.specialistsPage).contains(companyName)
        .should('be.visible');
    cy.get('button').contains('Додати співробітника')
        .click();
    cy.get(element.popup)
        .find(element.inputPhone)
        .type(specialists.tel)
    cy.get(element.popup)
        .find(element.inputName)
        .type(specialists.name);
    cy.get(element.submitBtn)
        .click();
    cy.wait(1000)
    cy.get(element.specialistsPageCard)
       .contains(specialists.name)
});

Cypress.Commands.add('addProfilePhoto', (filepath) => {
    cy.get(element.navbarDesktop)
        .find(element.specialistsLink)
        .click();
    cy.get(element.specialistsPageCardEdit)
    cy.get(element.specialistsPageCard)
        .find('img')
        .should('not.exist');
    cy.get(element.specialistsPageCardEdit)
        .click();
    cy.get(element.specialistAboutPageAvatars)
        .find('img')
        .should('not.exist');
    cy.get(element.inputFile)
        .attachFile(filepath).wait(1000)
    cy.get(element.specialistAboutPageAvatars)
        .wait(1000)
    cy.get('img')
        .should('be.visible');
    cy.get(element.back)
        .click();
    cy.get(element.specialistsPageCard)
        .find('img')
        .should('be.visible');
});
