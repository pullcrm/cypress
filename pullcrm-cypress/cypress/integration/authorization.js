let oldUser = { 'tel': '9999999999', 'pass': '9999' }
it(`Autharization`, function() {
    cy.visitAuth(Cypress.env('CY_BASE_URL'));
    cy.auth(oldUser.tel, oldUser.pass)
});