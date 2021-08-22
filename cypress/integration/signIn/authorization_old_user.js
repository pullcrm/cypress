let ds = require('../../storage/dataStorage.json');
it(`Autharization old user`, function() {
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.authorization(ds.oldUser, 'oldUser')
});