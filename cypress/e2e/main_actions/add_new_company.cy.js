let ds = require('../../storage/dataStorage.json'),
    userForTest = ds.sheikhIslamova;;
it(`add new company`, function() {
    cy.deleteAllCompanyInUser(userForTest.tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.authorization(userForTest);
    cy.regNewCompany('BestOfTheBest', 'Киев', 'Barbershop', 2)
    cy.regNewCompany('Подгоршек', 'Черновцы', 'Nail салон', 3, true)
});