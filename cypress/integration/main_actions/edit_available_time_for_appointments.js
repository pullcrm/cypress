let ds = require('../../storage/dataStorage.json'),
    userForTestWidget = ds.angelinaJolie,
    specUsers = [ds.angelinaJolie.tel, ds.specUser.jony.tel, ds.specUser.frank.tel],
    disableDeys = ['today', 'tomorrow']
it(`edit available time for appointments`, function() {
    cy.deleteAllAppointmentsFoTheCompany(userForTestWidget.tel);
    for (let specUser of specUsers)
        cy.clearTheRecordLock(specUser);
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.authorization(userForTestWidget, 'oldUser');
    for (let disableDey of disableDeys) {
        cy.disableRecordingForTheWholeDay(disableDey, 0, 'shortWay');
        cy.disableRecordingForTheWholeDay(disableDey, 1, 'longWay');
        cy.disableRecordingForTime(disableDey, 2, '09:00', '10:00');
    };
});