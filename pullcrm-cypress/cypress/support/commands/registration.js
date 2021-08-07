let element = require('../../storage/dataTest.json');

Cypress.Commands.add('deleteUser', () => {
    cy.request('GET', `${Cypress.env('CY_BASE_URL')}/api/tests/rdu`).then((response) => {
        console.log(response.body)
    });
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
    cy.get(element.inputSmsCodeZ)
        .type(pass)
    cy.contains('Создание компании');
});