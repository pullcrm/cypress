let ds = require('../../storage/dataStorage.json');
xit(`Registration new user`, function() {
    cy.deleteUser(ds.regNewUser.tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.registrationUser(ds.regNewUser.tel, ds.regNewUser.pass, ds.regNewUser.name)
});