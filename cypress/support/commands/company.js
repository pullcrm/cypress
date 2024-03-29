let element = require('../../storage/dataTest.json');

Cypress.Commands.add('regNewCompany', (companyName, city, categoryName, num, isDashbord) => {
    if (isDashbord === true) {
        cy.get(element.carouselItem)
            .contains('Додати компанію')
            .click();
    }
    cy.contains('Створення компанії').wait(1000);
    cy.get(element.inputCompanyName)
        .type(companyName);
    cy.get(element.inputCityName)
        .click();
    cy.get(element.selectBody)
        .contains(city)
        .click();
    cy.get(element.inputCategoryName)
        .click();
    cy.get(element.selectBody)
        .contains(categoryName)
        .click();
    cy.get(element.submitBtn)
        .click();
    cy.get(element.carouselItem)
        .contains(companyName)
    cy.get(element.carouselItem).then(carouselItem => {
        console.log(carouselItem.length)
        assert.isOk(carouselItem.length === num, `На экране отображаются созданные компании и блок "Добавить компанию"`)
    });
});
