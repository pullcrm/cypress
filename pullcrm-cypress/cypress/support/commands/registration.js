let element = require('../../storage/dataTest.json');

Cypress.Commands.add('deleteUser', (tel, pass) => {
    //there will be a function here that deletes the user
    cy.log('there will be a function here that deletes the user')
});
Cypress.Commands.add('registrationUser', (tel, pass, name) => {
    cy.get(element.login)
        .click();
    cy.get(element.loginPopUp)
        .should('be.visible');
    cy.get(element.registratioBtn)
        .click();
    cy.get(element.policyBlok)
        .should('be.visible');
    cy.contains('Регистрация');
    cy.go('back');
    cy.go('back');
    cy.get(element.registratioBtnMain)
        .click();
    cy.get(element.policyBlok)
        .should('be.visible');
    cy.contains('Регистрация');
    cy.get(element.inputPhone)
        .type(tel);
    cy.get(element.inputPass)
        .type(pass);
    cy.get(element.inputName)
        .type(name);
    cy.get(element.submitBtn)
        .click();
    cy.get(element.popup)
        .type(pass)
    cy.contains('Создание компании');
});