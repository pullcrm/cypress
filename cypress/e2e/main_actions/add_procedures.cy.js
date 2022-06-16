let ds = require('../../storage/dataStorage.json'),
    userForTest = ds.timurKarginov;
it(`add procedures`, function() {
    cy.deleteAllProceduresInUser(userForTest.tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.authorization(userForTest);
    cy.addProcedure('Шикарная стрижка', '142', '15', 'Будет шикарно');
    cy.addProcedure('Хреновая стрижка', '42', '30', 'Будет нормально');
});