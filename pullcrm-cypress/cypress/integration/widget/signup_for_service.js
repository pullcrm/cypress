let ds = require('../../storage/dataStorage.json'),
    userForTestWidget = ds.elonMusk;

it(`signup for service`, function() {
    cy.deleteAllAppointmentsFoTtheCompany(userForTestWidget.tel)
        // cy.deleteUser(ds.regNewUser.tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    // cy.registrationUser(ds.regNewUser);
    // cy.regNewCompany('Gorshochek', 'Киев', 'Barbershop', 2);
    cy.authorization(userForTestWidget)
        // cy.addService('Шикарная стрижка', '142', '15', 'Будет шикарно', "Elon Musk");
    cy.makeAppointmentInWidget(userForTestWidget.name, 'Шикарная стрижка', 1, '09:00 - 09:15', ds.clients[1])
});