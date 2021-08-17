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

Cypress.Commands.add('forceMakeAppointmentInWidget', (specialis, cervice, day, time, client) => {
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
        cy.get(element.baseWidgetProcedurePanel).contains(cervice)
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

Cypress.Commands.add('clearTheRecordLock', (tel) => {
    cy.task('queryDb', `SELECT * FROM pullcrm_dev.users where phone = ${tel};`).then((user) => {
        let userId = user[0].id;
        cy.task('queryDb', `SELECT * FROM pullcrm_dev.specialists where userId = ${userId};`).then((specialists) => {
            let specialistId = specialists[0].id;
            console.log(specialistId);
            cy.task('queryDb', `DELETE FROM pullcrm_dev.time_offs where specialistId = ${specialistId};`).then((time_offs) => {});
        });
    });
});

Cypress.Commands.add('deleteAllAppointmentsFoTtheCompany', (tel) => {
    cy.task('queryDb', `SELECT * FROM pullcrm_dev.users where phone = ${tel};`).then((user) => {
        let userId = user[0].id;
        console.log(userId)
        cy.task('queryDb', `SELECT * FROM pullcrm_dev.companies where userId = ${userId};`).then((companies) => {
            let companiesId = companies[0].id;
            console.log(companiesId)
            cy.task(
                'queryDb',
                `DELETE FROM pullcrm_dev.appointments where companyId = ${companiesId};`)
        });
    });
});
Cypress.Commands.add('deleteAllspecialistsForTheCompany', (tel) => {
    cy.task('queryDb', `SELECT * FROM pullcrm_dev.users where phone = ${tel};`).then((user) => {
        let userId = user[0].id;
        console.log(userId)
        cy.task('queryDb', `SELECT * FROM pullcrm_dev.companies where userId = ${userId};`).then((companies) => {
            let companyId = companies[0].id;
            console.log(companyId)
            cy.task('queryDb', `SELECT * FROM pullcrm_dev.specialists where companyId = ${companyId} AND roleId = 3;`).then((specialists) => {

                if (specialists[0]) {
                    for (let ci = 0; ci < specialists.length; ci++) {

                        console.log(specialists[ci].userId);
                        cy.task('queryDb', `DELETE FROM pullcrm_dev.users where id = ${specialists[ci].userId}`).then((userSpecialists) => {
                            console.log(userSpecialists);
                        });
                        cy.log(`the specialist ${specialists[ci].userId}\`) has been removed`)
                    }
                } else {
                    cy.log('the specialist for the removal was not found')
                }
            });
        });
    });
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
    cy.get(element.selectorService)
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