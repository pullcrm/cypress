let element = require('../../storage/dataTest.json');
Cypress.Commands.add('addProcedure', (inputProcedureName, price, time, description, setSpecialist) => {
    cy.get(element.navbarDesktop)
        .find(element.proceduresLink)
        .click();
    cy.get(element.proceduresPage)
        .should('be.visible');
    cy.get('button')
        .contains('Додати послугу')
        .click();
    cy.get(element.popup).find(element.title)
        .contains('Додати послугу');
    cy.get(element.inputProcedureName)
        .type(inputProcedureName)
    cy.get(element.inputPrice)
        .type(price)
    cy.get(element.inputTime)
        .click();
    cy.get(element.selectBody)
        .contains(time)
        .click();
    cy.get(element.inputDescription)
        .type(description);
    if (setSpecialist) {
        cy.get(element.inputSpecialistName)
            .click();
        cy.get(element.selectBody)
            .contains(setSpecialist)
            .click();
        cy.get(element.multiSelect)
            .should('be.visible')
    }
    cy.get(element.submitBtn)
        .click().wait(1000);
    cy.get(element.proceduresPageProcedureCard).within(() => {
        cy.contains(inputProcedureName);
        cy.contains(price);
        cy.contains(time);
        cy.contains(description);
    });
});

Cypress.Commands.add('addProcedureInCategiry', (inputProcedureName, price, time, description, category, btn) => {
    cy.get(element.navbarDesktop)
        .find(element.proceduresLink)
        .click();
    cy.get(element.proceduresPage)
        .should('be.visible');
    if (btn == 'btnOutCategory') {
        cy.get('button')
            .contains('Додати послугу')
            .click();
        cy.get(element.inputCategoryName)
            .click();
        cy.get(element.selectBody)
            .contains(category)
            .click();
    } else if (btn == 'btnInCategory') {
        cy.get(element.proceduresPage)
            .contains(category).parent().parent()
            .contains('Додати послугу')
            .click();
        cy.get(element.inputCategoryName).then(inputCategoryName => {
            assert.isOk(inputCategoryName[0]._value === category, `Категория ${category} уже выбрана в popUp`)
        });
    };
    cy.get(element.inputProcedureName)
        .type(inputProcedureName)
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
            cy.contains(inputProcedureName);
            cy.contains(price);
            cy.contains(time);
            cy.contains(description);
        });
});

Cypress.Commands.add('editProcedure', (inputProcedureName, price, time, description, category) => {
    cy.get(element.proceduresPageProcedureCard)
        .click();
    cy.get(element.popup).find(element.title)
        .contains('Редагувати');

    cy.get(element.inputProcedureName).clear()
        .type(inputProcedureName)
    cy.get(element.inputPrice).clear()
        .type(price)
    cy.get(element.inputTime).clear()
        .click();
    cy.get(element.selectBody)
        .contains(time)
        .click();
    cy.get(element.inputDescription).clear()
        .type(description)
    cy.get(element.submitBtn)
        .click().wait(1000);
    cy.get(element.proceduresPageProcedureCard).within(() => {
        cy.contains(inputProcedureName);
        cy.contains(price);
        cy.contains(time);
        cy.contains(description);
    });

});
