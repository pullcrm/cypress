let element = require('../../storage/dataTest.json');

Cypress.Commands.add('visitWidgetOnHeader', () => {
    cy.get(element.header).find(element.widgetLink).then(widgetLink => {
        cy.visitAuth(widgetLink[0].href);
        cy.contains('Выберите специалиста');
    });
});

Cypress.Commands.add('disableRecordingForTheWholeDay', (isTomorrow, numSpecialist) => {
    cy.visitAuth(`${Cypress.env('CY_BASE_URL')}/schedule/`);
    if (isTomorrow)
        cy.get(element.schedulePageHeaderTomorrow)
        .click();
    cy.get(element.scheduleColumnSpecialist)
        .eq(numSpecialist).find(element.popover)
        .click();
    cy.get(element.dropdownMenuPopover).eq(numSpecialist + 1)
        .contains('Закрыть запись')
        .click();
    cy.get(element.scheduleTimeoff)
        .should('be.visible')
});

Cypress.Commands.add('forceMakeAppointmentInWidget', (specialis, procedure, day, time, client) => {
    cy.visitWidgetOnHeader();
    cy.contains('Выберите специалиста');
    cy.get(element.fullWidgetSpecialistPanel).contains(specialis)
        .click();
    cy.contains('Выберите услуг');
    cy.get(element.baseWidgetProcedurePanel).contains(procedure)
        .click();
    cy.get(element.fullWidgetProceduresPageButton)
        .click();
    cy.get(element.fullWidgetDatePickerItemDate)
        .eq(day).wait(1000).click().wait(1000);
    cy.get(element.timeBtnWidget).eq(0).click()

    cy.url().then(url => {
        let newUrl = url.replace('3A15', '3A00')
        cy.visitAuth(newUrl);
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
        cy.contains('Что-то пошло не так, попробуйте вернутся назад и выбрать другое время!')
            .should('be.visible');
    })
});

Cypress.Commands.add('makeAppointmentInWidget', (specialis, procedure, day, time, client) => {
    cy.visitWidgetOnHeader();
    cy.contains('Выберите специалиста');
    cy.get(element.fullWidgetSpecialistPanel).contains(specialis)
        .click();
    cy.contains('Выберите услуг');
    cy.get(element.baseWidgetProcedurePanel).contains(procedure)
        .click();
    cy.get(element.fullWidgetProceduresPageButton)
        .click();
    cy.get(element.fullWidgetDatePickerItemDate)
        .eq(day).wait(1000).click().wait(1000);
    cy.get(element.timeBtnWidget).then(timeWidget => {
        let timeBtnLength = timeWidget.length
        cy.get(element.timeBtnWidget)
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
        cy.get(element.baseWidgetProcedurePanel).contains(procedure)
            .click();
        cy.get(element.fullWidgetProceduresPageButton)
            .click();
        cy.get(element.fullWidgetDatePickerItemDate)
            .eq(day).wait(1000).click().wait(1000);
        cy.get(element.timeBtnWidget).should('be.length', timeBtnLength - 1)
    });
    cy.visitAuth(Cypress.env('CY_BASE_URL') + '/schedule/');
    cy.get(element.schedulePageHeaderTomorrow)
        .click();
    cy.get(element.appointment).contains(client.name)
});


Cypress.Commands.add('makeAppointmentInAdmin', (isTomorrow, numSpecialis, client) => {
    cy.visitAuth(`${Cypress.env('CY_BASE_URL')}/schedule/`);
    if (isTomorrow)
        cy.get(element.schedulePageHeaderTomorrow)
        .click();
    cy.get(element.scheduleColumnGrid).eq(numSpecialis)
        .dblclick(100, 10);
    cy.get(element.appointmentPopup)
        .contains('Новая запись');
    cy.get(element.inputClientNameAdmin)
        .type(client.name);
    cy.get(element.inputClientTelAdmin)
        .type(client.tel);
    cy.get(element.selectorProcedure)
        .click();
    cy.get(element.selectBody).contains('Наголо')
        .click();
    cy.get(element.appointmentPopupDateTime)
        .contains('Завершение в 09:15')
    cy.get(element.submitBtn).contains('Добавить')
        .click();
    cy.get(element.appointmentPopup)
        .should('not.exist');
    cy.get(element.scheduleColumnGrid).eq(numSpecialis)
        .find(element.appointment)
        .contains(client.name)
});