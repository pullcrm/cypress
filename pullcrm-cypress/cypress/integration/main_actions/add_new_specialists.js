let ds = require('../../storage/dataStorage.json'),
    userForTestWidget = ds.quentinTarantino;
it(`add new specialists`, function() {
    cy.deleteAllspecialistsForTheCompany(userForTestWidget.tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.authorization(userForTestWidget)
    cy.regNewSpecialists(userForTestWidget.name, ds.specialists[1])
});