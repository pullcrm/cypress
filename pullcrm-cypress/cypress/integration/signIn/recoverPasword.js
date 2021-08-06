let ds = require('../../storage/dataStorage.json');
it(`Recover password `, function() {
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.recoverPassword(ds.recoverUser.tel, ds.recoverUser.pass, ds.recoverUser.newPass)
});