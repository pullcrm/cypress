let element = require('../../storage/dataTest.json');

Cypress.Commands.add('visitWidgetOnHeader', () => {
    cy.get(element.header).find(element.widgetLink).then(widgetLink => {
        cy.visitAuth(widgetLink[0].href);
        cy.contains('Виберіть спеціаліста');
    });
});

Cypress.Commands.add('disableRecordingForTheWholeDay', (day, numSpecialist, path) => {
    cy.visitAuth(`${Cypress.env('CY_BASE_URL')}/schedule/`);
    if (day == 'tomorrow')
        cy.get(element.schedulePageHeaderTomorrow)
        .click();
    cy.wait(500)
    if (path == 'shortWay') {
        cy.get(element.scheduleColumnSpecialist)
            .eq(numSpecialist).find(element.popover)
            .click({ force: true });
        cy.get(element.dropdownMenuPopover).eq(numSpecialist + 1)
            .contains('Закрити запис')
            .click();
        cy.get(element.scheduleTimeoff)
            .should('be.visible')
    } else if (path == 'longWay') {
        cy.get(element.scheduleColumnGrid).eq(numSpecialist).click(145, 18);
        cy.get(element.scheduleColumnGrid).eq(numSpecialist).click(145, 18);
        cy.get(element.popoverMenuInner)
            .click({ force: true });
        cy.get(element.uiDropdownList)
            .contains('Закрити запис')
            .click();
        cy.get(element.uIswitch)
            .click();
        cy.get(element.submitBtn)
            .click();
    }
    cy.get(element.scheduleColumnGrid).eq(numSpecialist)
        .find(element.scheduleTimeoff)
        .should('be.visible');
});

Cypress.Commands.add('disableRecordingForTime', (day, numSpecialist, timeStart, timeFinish) => {
    cy.wait(500)
    if (day == 'tomorrow')
        cy.get(element.schedulePageHeaderTomorrow)
        .click();
    cy.get(element.scheduleColumnGrid).eq(numSpecialist).click(145, 18);
    cy.get(element.scheduleColumnGrid).eq(numSpecialist).click(145, 18);
    cy.get(element.popoverMenuInner)
        .click({ force: true });
    cy.get(element.uiDropdownList)
        .contains('Закрити запис')
        .click();
    cy.get(element.popup)
        .contains('Час початку')
        .click();
    cy.get(element.uiSelectItems).eq(1)
        .contains(timeStart)
        .click();
    cy.get(element.popup)
        .contains('Час закінчення')
        .click();
    cy.get(element.uiSelectItems).eq(2)
        .contains(timeFinish)
        .click();
    cy.get(element.popup)
        .find(element.submitBtn)
        .click();
    cy.get(element.scheduleColumnGrid).eq(numSpecialist)
        .find(element.scheduleTimeoff)
        .should('be.visible');
})

Cypress.Commands.add('forceMakeAppointmentInWidget', (specialis, procedure, day, time, client) => {
    cy.visitWidgetOnHeader();
    cy.contains('Виберіть спеціаліста');
    cy.get(element.fullWidgetSpecialistPanel).contains(specialis)
        .click();
    cy.contains('Виберіть послуги');
    cy.get(element.baseWidgetProcedurePanel).contains(procedure)
        .click();
    cy.get(element.fullWidgetProceduresPageButton)
        .click();
    cy.get(element.fullWidgetDatePickerItemDate)
        .eq(day).wait(1000).click().wait(1000);
    cy.get(element.timeBtnWidget).eq(0).click()

    cy.url().then(url => {
        let newUrl = url.replace('3A15', '3A00')
        cy.visitAuth(newUrl).wait(1000);
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
        cy.contains('Щось пішло не так, спробуйте повернутись назад і вибрати інший час!')
            .should('be.visible');
    })
});

Cypress.Commands.add('makeAppointmentInWidget', (specialis, procedure, day, time, client) => {
    cy.visitWidgetOnHeader();
    cy.contains('Виберіть спеціаліста');
    cy.get(element.fullWidgetSpecialistPanel).contains(specialis)
        .click();
    cy.contains('Виберіть послуги');
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
        cy.contains('Ваш запис');
        cy.get(element.buttonThemeInfoOutlined)
            .click();
        cy.contains('Виберіть спеціаліста');
        cy.get(element.fullWidgetSpecialistPanel).contains(specialis)
            .click();
        cy.contains('Виберіть послуги');
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
        .contains('Новий запис');
    cy.get(element.inputClientNameAdmin)
        .type(client.name);
    cy.get(element.inputClientTelAdmin)
        .type(client.tel);
    cy.get(element.selectorProcedure)
        .click();
    cy.get(element.selectBody).contains('Наголо')
        .click();
    cy.get(element.appointmentPopupDateTime)
        .contains('Завершується в 09:15')
    cy.get(element.submitBtn).contains('Додати')
        .click();
    cy.get(element.appointmentPopup)
        .should('not.exist');
    cy.get(element.scheduleColumnGrid).eq(numSpecialis)
        .find(element.appointment)
        .contains(client.name)
});