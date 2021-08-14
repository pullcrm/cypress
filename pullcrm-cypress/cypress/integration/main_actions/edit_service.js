let ds = require('../../storage/dataStorage.json');
it(`edit service`, function() {
    cy.deleteUser(ds.regNewUser.tel)
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.registrationUser(ds.regNewUser);
    cy.regNewCompany('Gorshochek', 'Киев', 'Barbershop', 2);
    cy.addService('Шикарная стрижка', '142', '15', 'Будет шикарно');
    cy.editService('Flash haircut', '1500', '45', 'Возможны ожоги')
});