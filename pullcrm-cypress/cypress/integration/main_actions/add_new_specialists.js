let ds = require('../../storage/dataStorage.json');
xit(`add new specialists`, function() {
    cy.deleteUser(ds.regNewUser.tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.registrationUser(ds.regNewUser.tel, ds.regNewUser.pass, ds.regNewUser.name)
    cy.regNewCompany('BestOfTheBest', 'Киев', 'Barbershop', 2)
    cy.regNewSpecialists(ds.regNewUser.name, ds.specialists[1].name, ds.specialists[1].tel, ds.specialists[1].pass)
});