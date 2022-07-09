let element = require('../../storage/dataTest.json');

// Cypress.Commands.add('deleteUser', () => {
//     cy.request('GET', `${Cypress.env('CY_BASE_URL')}/api/tests/rdu`).then((response) => {
//         console.log(response.body)
//     });
// });
Cypress.Commands.add('registrationUser', (user) => {
    cy.get(element.loginPopUp)
        .should('be.visible');
    cy.get(element.registrationBtn)
        .click();
    cy.get(element.policyBlock)
        .should('be.visible');
    cy.go('back');
    cy.get(element.registrationBtn)
        .click();
    cy.get(element.policyBlock)
        .should('be.visible');
    cy.get(element.inputPhone)
        .type(user.tel);
    cy.get(element.inputPass)
        .type(user.pass);
    cy.get(element.inputName)
        .type(user.name);
    cy.get(element.submitBtn)
        .click();
    cy.get(element.inputSmsCodeZ)
        .type(user.pass)
    cy.get(element.companyCreatePage)
        .should('be.visible');
});
