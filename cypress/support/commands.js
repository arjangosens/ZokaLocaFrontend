Cypress.Commands.add('login', (email, password) => {
    cy.visit('/auth/login')
    cy.get('[data-cy="login-email"]').should('be.visible').type(email)
    cy.get('[data-cy="login-password"]').should('be.visible').type(password)
    cy.get('[data-cy="login-submit"]').should('be.visible').click()
    cy.window().its('localStorage.token').should('be.a', 'string')
})