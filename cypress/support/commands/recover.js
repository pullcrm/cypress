let element = require('../../storage/dataTest.json');

Cypress.Commands.add('recoverPassword', (tel, pass, newPass) => {
    cy.get(element.login)
        .click();
    cy.get(element.loginPopUp)
        .should('be.visible');
    cy.get(element.recoverPassBtn)
        .click();
    cy.contains('Введите номер телефона, чтобы восстановить доступ');
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
        .contains('Пароль изменен!')
        .should('be.visible');
    cy.contains('Войдите в систему, чтобы получить доступ к своей компании')
    cy.get(element.inputPhone)
        .type(tel);
    cy.get(element.inputPass)
        .type(newPass);
    cy.get(element.submitBtn)
        .click();
    cy.get(element.dashboardPage)
        .should('be.visible');
});