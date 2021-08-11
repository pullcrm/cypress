it('Verify the retrieved data', () => {
    cy.task('queryDb', 'select * FROM pullcrm_dev.users').then((resp) => {
        console.log(resp)
    })
})