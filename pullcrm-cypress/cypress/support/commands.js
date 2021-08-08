// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import './commands/authorization'
import './commands/registration'
import './commands/recover'
import './commands/company'
import './commands/specialists'
import './commands/service'
import './commands/category'






Cypress.Commands.add('visitAuth', (url) => {
    cy.visit(url, {
        onBeforeLoad: (win) => { win.fetch = null, win.sessionStorage.clear() },
        auth: {
            username: Cypress.env('BASIC_AUTH_USER'),
            password: Cypress.env('BASIC_AUTH_PASSWORD')
        }
    })
});