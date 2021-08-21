let ds = require('../../storage/dataStorage.json'),
    userForTest = ds.jasonStathem;
it(`add profile photo`, function() {
    cy.clearUserPhoto(userForTest.tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.authorization(userForTest, 'oldUser')
    cy.addProfilePhoto('images/JS.jpg');
});