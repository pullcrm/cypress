let ds = require('../../storage/dataStorage.json'),
    userForTest = ds.louisSzekely;
it(`add category procedure`, function() {
    console.log(ds)
    cy.deleteAllProceduresInUser(userForTest.tel);
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.authorization(userForTest, 'oldUser');
    cy.addProcedureInCategiry('Шикарная ', '199', '45', 'Будет шикарно', 'Дорогие услуги', 'btnInCategory');
    cy.addProcedureInCategiry('Быстрая', '99', '15', 'Будет норм', 'Дешевые услуги', 'btnOutCategory');
});