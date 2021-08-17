let ds = require('../../storage/dataStorage.json'),
    userForTest = ds.quentinTarantino;
it(`add new specialists`, function() {
    cy.deleteAllspecialistsForTheCompany(userForTest.tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.authorization(userForTest, 'oldUser')
    cy.regNewSpecialists(userForTest.name, ds.specialists[1])
});