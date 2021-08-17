Cypress.Commands.add('clearTheRecordLock', (tel) => {
    cy.task('queryDb', `SELECT * FROM pullcrm_dev.users where phone = ${tel};`).then((user) => {
        let userId = user[0].id;
        cy.task('queryDb', `SELECT * FROM pullcrm_dev.specialists where userId = ${userId};`).then((specialists) => {
            let specialistId = specialists[0].id;
            console.log(specialistId);
            cy.task('queryDb', `DELETE FROM pullcrm_dev.time_offs where specialistId = ${specialistId};`).then((time_offs) => {});
        });
    });
});

Cypress.Commands.add('deleteUser', (tel) => {
    cy.task('queryDb', `SELECT * FROM pullcrm_dev.users where phone = ${tel};`).then((user) => {
        if (user[0]) {
            let userId = user[0].id;
            cy.task('queryDb', `DELETE FROM pullcrm_dev.users where id = ${userId};`).then(() => {});
        }
    });
});

Cypress.Commands.add('deleteAllCompany', (tel) => {
    cy.task('queryDb', `SELECT * FROM pullcrm_dev.users where phone = ${tel};`).then((user) => {
        if (user[0]) {
            let userId = user[0].id;
            cy.task('queryDb', `DELETE FROM pullcrm_dev.users where id = ${userId};`).then(() => {});
        }
    });
});

Cypress.Commands.add('deleteAllAppointmentsFoTtheCompany', (tel) => {
    cy.task('queryDb', `SELECT * FROM pullcrm_dev.users where phone = ${tel};`).then((user) => {
        let userId = user[0].id;
        console.log(userId)
        cy.task('queryDb', `SELECT * FROM pullcrm_dev.companies where userId = ${userId};`).then((companies) => {
            let companiesId = companies[0].id;
            console.log(companiesId)
            cy.task(
                'queryDb',
                `DELETE FROM pullcrm_dev.appointments where companyId = ${companiesId};`)
        });
    });
});
Cypress.Commands.add('deleteAllspecialistsForTheCompany', (tel) => {
    cy.task('queryDb', `SELECT * FROM pullcrm_dev.users where phone = ${tel};`).then((user) => {
        let userId = user[0].id;
        console.log(userId)
        cy.task('queryDb', `SELECT * FROM pullcrm_dev.companies where userId = ${userId};`).then((companies) => {
            let companyId = companies[0].id;
            console.log(companyId)
            cy.task('queryDb', `SELECT * FROM pullcrm_dev.specialists where companyId = ${companyId} AND roleId = 3;`).then((specialists) => {

                if (specialists[0]) {
                    for (let ci = 0; ci < specialists.length; ci++) {

                        console.log(specialists[ci].userId);
                        cy.task('queryDb', `DELETE FROM pullcrm_dev.users where id = ${specialists[ci].userId}`).then((userSpecialists) => {
                            console.log(userSpecialists);
                        });
                        cy.log(`the specialist ${specialists[ci].userId}\`) has been removed`)
                    }
                } else {
                    cy.log('the specialist for the removal was not found')
                };
            });
        });
    });
});

Cypress.Commands.add('deleteAllCompanyInUser', (tel) => {
    cy.task('queryDb', `SELECT * FROM pullcrm_dev.users where phone = ${tel};`).then((user) => {
        if (user[0]) {
            let userId = user[0].id;
            console.log(userId)
            cy.task('queryDb', `SELECT * FROM pullcrm_dev.companies where userId = ${userId};`).then((companies) => {
                if (companies[0]) {
                    for (let lio = 0; lio < companies.length; lio++) {
                        let companyId = companies[lio].id;
                        console.log(companyId)
                        cy.task('queryDb', `DELETE FROM pullcrm_dev.companies where id = ${companyId};`).then(() => {})
                    }
                };
            });
        };
    });
});

Cypress.Commands.add('deleteAllProceduresInUser', (tel) => {
    cy.task('queryDb', `SELECT * FROM pullcrm_dev.users where phone = ${tel};`).then((user) => {
        if (user[0]) {
            let userId = user[0].id;
            console.log(userId)
            cy.task('queryDb', `SELECT * FROM pullcrm_dev.companies where userId = ${userId};`).then((companies) => {
                if (companies[0]) {
                    let companyId = companies[0].id;
                    console.log(companyId)
                    cy.task('queryDb', `SELECT * FROM pullcrm_dev.procedures where companyId = ${companyId};`).then((procedures) => {
                        if (procedures[0]) {
                            let proceduresId = procedures[0].id;
                            console.log(proceduresId)
                            cy.task('queryDb', `DELETE FROM pullcrm_dev.procedures where id = ${proceduresId};`).then(() => {})
                        };
                    });
                };
            });
        };
    });
});