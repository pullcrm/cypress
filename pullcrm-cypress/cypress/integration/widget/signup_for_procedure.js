let ds = require('../../storage/dataStorage.json'),
    userForTestWidget = ds.elonMusk;

it(`signup for procedure`, function() {
    cy.deleteAllAppointmentsFoTtheCompany(userForTestWidget.tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.authorization(userForTestWidget, 'oldUser')
    cy.makeAppointmentInWidget(userForTestWidget.name, 'Шикарная стрижка', 1, '09:00 - 09:15', ds.clients[1])
});