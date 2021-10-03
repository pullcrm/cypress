let ds = require('../../storage/dataStorage.json'),
    userForTestWidget = ds.bruceWillis,
    specUser1 = ds.bruceWillis.tel,
    specUser2 = ds.specUser.anatoliy.tel,
    specUser3 = ds.specUser.roman.tel;

it(`1`, function() {
    cy.deleteAllAppointmentsFoTheCompany(userForTestWidget.tel);
    cy.clearTheRecordLock(specUser1);
    cy.clearTheRecordLock(specUser2);
    cy.clearTheRecordLock(specUser3);
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.authorization(userForTestWidget, 'oldUser');
    cy.disableRecordingForTheWholeDay(false, 0, 'shortWay');
    cy.disableRecordingForTheWholeDay(false, 1, 'longWay');
    cy.disableRecordingForTime(false, 2, '09:00', '10:00');
    cy.disableRecordingForTheWholeDay(true, 0, 'shortWay');
    cy.disableRecordingForTheWholeDay(true, 1, 'longWay');
    cy.disableRecordingForTime(true, 2, '09:00', '10:00');
});