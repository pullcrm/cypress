let ds = require('../../storage/dataStorage.json'),
    userForTest = ds.jonJones;;
it(`edit procedure`, function() {
    cy.deleteAllProceduresInUser(userForTest.tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.authorization(userForTest);
    cy.addProcedure('Шикарная стрижка', '142', '15', 'Будет шикарно');
    cy.editProcedure('Flash haircut', '1500', '45', 'Возможны ожоги')
});