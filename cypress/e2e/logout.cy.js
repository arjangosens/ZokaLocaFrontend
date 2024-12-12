describe('Logout functionality tests', () => {
    it('should log out successfully', () => {
        // Use the custom login command
        cy.resetDb()
        cy.login('a.gosens@student.fontys.nl', 'Qwerty123!')

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