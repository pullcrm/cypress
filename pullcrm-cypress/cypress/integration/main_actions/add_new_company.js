let ds = require('../../storage/dataStorage.json');
it(`add new company`, function() {
    cy.deleteUser(ds.regNewUser.tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.registrationUser(ds.regNewUser);
    cy.regNewCompany('BestOfTheBest', 'Киев', 'Barbershop', 2)
    cy.regNewCompany('Подгоршек', 'Черновцы', 'Салон красоты', 3, true)
});