let element = require('../../storage/dataTest.json');

Cypress.Commands.add('visitWidgetOnHeader', () => {
    cy.get(element.header).find(element.widgetLink).then(widgetLink => {
        cy.visitAuth(widgetLink[0].href);
        cy.contains('Выберите специалиста');
    });
});
Cypress.Commands.add('makeAppointmentInWidget', (specialis, cervice, day, time, client) => {
    cy.visitWidgetOnHeader();
    cy.contains('Выберите специалиста');
    cy.get(element.fullWidgetSpecialistPanel).contains(specialis)
        .click();
    cy.contains('Выберите услуг');
    cy.get(element.baseWidgetProcedurePanel).contains(cervice)
        .click();
    cy.get(element.fullWidgetProceduresPageButton)
        .click();
    cy.get(element.fullWidgetDatePickerItemDate)
        .eq(day).wait(1000).click().wait(1000);
    cy.get(element.timeBtnWidget).should('be.length', 48)
        .contains(time)
        .click();
    cy.get(element.fullWidgetPickDatePageButton)
        .click();
    cy.get(element.inputClientName)
        .type(client.name);
    cy.get(element.inputClientTel)
        .type(client.tel);
    cy.get(element.inputClientСomments)
        .type(client.comments);
    cy.get(element.fullWidgetConfirmationPageButton)
        .click();
    cy.contains('Ваша запись');
    cy.get(element.buttonThemeInfoOutlined)
        .click();

    cy.contains('Выберите специалиста');
    cy.get(element.fullWidgetSpecialistPanel).contains(specialis)
        .click();
    cy.contains('Выберите услуг');
    cy.get(element.baseWidgetProcedurePanel).contains(cervice)
        .click();
    cy.get(element.fullWidgetProceduresPageButton)
        .click();
    cy.get(element.fullWidgetDatePickerItemDate)
        .eq(day).wait(1000).click().wait(1000);
    cy.get(element.timeBtnWidget).should('be.length', 47)
    cy.visitAuth(Cypress.env('CY_BASE_URL') + '/schedule/');
    cy.get(element.schedulePageHeaderTomorrow)
        .click();
    cy.get(element.appointment).contains(client.name)
});