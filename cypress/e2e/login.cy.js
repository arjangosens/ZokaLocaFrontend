describe('Login functionality tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.resetDb()
    })

    it('should forward the user to the login page when not logged in', () => {
        // Visit the campsite overview page
        cy.visit('/')

        // Assert that the user is redirected to the login page
        cy.url().should('include', '/auth/login')
    });

    it('should log in successfully with valid credentials', () => {
        // Visit the login page
        cy.visit('/auth/login')

        // Enter the email
        cy.get('[data-cy="login-email"]').type(Cypress.env('rootUser').email)

        // Enter the password
        cy.get('[data-cy="login-password"]').type(Cypress.env('rootUser').password)

        // Click the login button
        cy.get('[data-cy="login-submit"]').click()

        // Assert that the user is redirected to the campsite overview page
        cy.url().should('include', '/campsites')
    })

    it('should display an error message with invalid credentials', () => {
        // Visit the login page
        cy.visit('/auth/login')

        // Enter the email
        cy.get('[data-cy="login-email"]').type('invalid-email@test.com')

        // Enter the password
        cy.get('[data-cy="login-password"]').type('Qwerty123!')

        // Click the login button
        cy.get('[data-cy="login-submit"]').click()

        // Assert that the error message is displayed
        cy.get('[data-cy="login-error"]').should('be.visible')
    })
})