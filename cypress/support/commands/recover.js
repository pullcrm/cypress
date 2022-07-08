let element = require('../../storage/dataTest.json');

Cypress.Commands.add('recoverPassword', (tel, pass, newPass) => {
    cy.get(element.loginPopUp)
        .should('be.visible');
    cy.get(element.recoverPassBtn)
        .click();
    cy.contains('Введіть номер телефону, щоб відновити доступ');
    cy.get(element.inputPhone)
        .type(tel);
    cy.get(element.submitBtn)
        .click();
    cy.get(element.inputPass)
        .type(newPass)
    cy.get(element.inputRepeatPassword)
        .type(newPass);
    cy.get(element.inputSmsCode)
        .type(pass)
    cy.get(element.submitBtn)
        .click();
    cy.get(element.toast)
        .contains('Пароль змінено!')
        .should('be.visible');
    cy.contains('Увійдіть у систему, щоб отримати доступ до своєї компанії')
    cy.get(element.inputPhone)
        .type(tel);
    cy.get(element.inputPass)
        .type(newPass);
    cy.get(element.submitBtn)
        .click();
    cy.get(element.dashboardPage)
        .should('be.visible');
});
