Cypress.Commands.add('login', (email, password) => {
    cy.visit('/auth/login')
    cy.get('[data-cy="login-email"]').should('be.visible').type(email)
    cy.get('[data-cy="login-password"]').should('be.visible').type(password)
    cy.get('[data-cy="login-submit"]').should('be.visible').click()
    cy.window().its('localStorage.token').should('be.a', 'string')
});

Cypress.Commands.add('resetDb', () => {
   cy.request("POST", `${Cypress.env('backendBaseUrl')}/e2e/reset`, {});
});

Cypress.Commands.add('authRequest', (method, url, body = {}) => {
    cy.window().then((window) => {
        const token = window.localStorage.getItem('token');
        cy.request({
            method: method,
            url: url,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        });
    });
});