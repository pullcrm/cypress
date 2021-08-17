let ds = require('../../storage/dataStorage.json'),
    userForTestWidget = ds.bruceWillis;
it(`re signup for service`, function() {
    cy.deleteAllAppointmentsFoTtheCompany(userForTestWidget.tel)
    cy.clearTheRecordLock(ds.specUser[1].tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.authorization(userForTestWidget)
    cy.makeAppointmentInWidget(userForTestWidget.name, 'Наголо', 1, '09:00 - 09:15', ds.clients[1]);
    cy.forceMakeAppointmentInWidget(userForTestWidget.name, 'Наголо', 1, '09:00 - 09:15', ds.clients[2]);
    cy.disableRecordingForTheWholeDay(true, 1);
    cy.makeAppointmentInAdmin(true, 2, ds.clients[3]);
});