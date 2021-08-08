let ds = require('../../storage/dataStorage.json');
it(`add category service`, function() {
    cy.deleteUser(ds.regNewUser.tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.registrationUser(ds.regNewUser.tel, ds.regNewUser.pass, ds.regNewUser.name);
    cy.regNewCompany('Gorshochek', 'Киев', 'Barbershop', 2);
    cy.addСategoryService('Дешовые услуги');
    cy.addСategoryService('Дорогие услуги');
    cy.addServiceInCategiry('Шикарная ', '199', '45', 'Будет шикарно', 'Дорогие услуги', 'btnInCategory');
    cy.addServiceInCategiry('Быстрая', '99', '15', 'Будет норм', 'Дешовые услуги', 'btnOutCategory');

});