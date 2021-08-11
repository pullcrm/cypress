let element = require('../../storage/dataTest.json');

Cypress.Commands.add('visitWidgetOnHeader', () => {
    cy.get(element.header).find(element.widgetLink).then(widgetLink => {
        cy.visitAuth(widgetLink[0].href);
        cy.contains('Выберите специалиста');
    });
});
Cypress.Commands.add('makeAppointmentInWidget', (specialis, cervice, day, time, client) => {
    cy.contains('Выберите специалиста');
    cy.get(element.fullWidgetSpecialistPanel).contains(specialis)
        .click();
    cy.contains('Выберите услуг');
    cy.get(element.baseWidgetProcedurePanel).contains(cervice)
        .click();
    cy.get(element.fullWidgetProceduresPageButton)
        .click();
    cy.get(element.fullWidgetDatePickerItemDate)
        .eq(day).click();
    cy.get(element.fullWidgetPickDatePageTimePickerGroup)
        .contains(time)
        .click();
    cy.get(element.fullWidgetPickDatePageButton)
        .click();

})