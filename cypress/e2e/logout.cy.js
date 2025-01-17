describe('Logout functionality tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.resetDb()
    })
    it('should log out successfully', () => {
        // Log in
        cy.login(Cypress.env('rootUser').email, Cypress.env('rootUser').password)

        // Assert that the user is redirected to the campsite overview page
        cy.url().should('include', '/campsites')

        // Click the user dropdown
        cy.get('[data-cy="user-dropdown"]').click()

        // Click the logout link
        cy.get('[data-cy="logout-link"]').click()

        // Assert that the user is redirected to the login page
        cy.url().should('include', '/auth/login')
    })
})