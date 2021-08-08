let element = require('../../storage/dataTest.json');
Cypress.Commands.add('addService', (inputServiceName, price, time, description) => {
    cy.get(element.navbarDesktop)
        .find(element.proceduresLink)
        .click();
    cy.get(element.proceduresPage)
        .should('be.visible');
    cy.get('button')
        .contains('Добавить услугу')
        .click();
    cy.get(element.inputServiceName)
        .type(inputServiceName)
    cy.get(element.inputPrice)
        .type(price)
    cy.get(element.inputTime)
        .click();
    cy.get(element.selectBody)
        .contains(time)
        .click();
    cy.get(element.inputDescription)
        .type(description)
    cy.get(element.submitBtn)
        .click().wait(1000);
    cy.get(element.proceduresPageProcedureCard).within(() => {
        cy.contains(inputServiceName);
        cy.contains(price);
        cy.contains(time);
        cy.contains(description);
    });
});

Cypress.Commands.add('addServiceInCategiry', (inputServiceName, price, time, description, category, btn) => {
    cy.get(element.navbarDesktop)
        .find(element.proceduresLink)
        .click();
    cy.get(element.proceduresPage)
        .should('be.visible');
    if (btn == 'btnOutCategory') {
        cy.get('button')
            .contains('Добавить услугу')
            .click();
        cy.get(element.inputCategoryName)
            .click();
        cy.get(element.selectBody)
            .contains(category)
            .click();
    } else if (btn == 'btnInCategory') {
        cy.get(element.proceduresPage)
            .contains(category).parent().parent()
            .contains('Добавить услугу')
            .click();
        cy.get(element.inputCategoryName).then(inputCategoryName => {
            assert.isOk(inputCategoryName[0]._value === category, `Категория ${category} уже выбрана в popUp`)
        });
    };


    cy.get(element.inputServiceName)
        .type(inputServiceName)
    cy.get(element.inputPrice)
        .type(price)
    cy.get(element.inputTime)
        .click();
    cy.get(element.selectBody)
        .contains(time)
        .click();
    cy.get(element.inputDescription)
        .type(description)
    cy.get(element.submitBtn)
        .click().wait(1000);
    cy.get(element.proceduresPage)
        .contains(category).parent().parent()
        .within(() => {
            cy.contains(inputServiceName);
            cy.contains(price);
            cy.contains(time);
            cy.contains(description);
        });
});