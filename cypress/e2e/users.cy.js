describe('User functionality tests', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.resetDb();
        cy.login(Cypress.env('rootUser').email, Cypress.env('rootUser').password);
    });

    it('should display a list of present users', () => {
        // Create new users
        cy.authRequest('POST', `${Cypress.env('backendBaseUrl')}/users`, {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@test.com",
            password: "Qwerty123!",
            role: "ADMIN",
            branchIds: []
        });

        cy.authRequest('POST', `${Cypress.env('backendBaseUrl')}/users`, {
            firstName: "Jane",
            lastName: "Doe",
            email: "jane.doe@test.com",
            password: "Qwerty123!",
            role: "VOLUNTEER",
            branchIds: []
        });

        // Visit the users page
        cy.visit('/users');

        // Assert that the user is redirected to the users page
        cy.url().should('include', '/users');

        // Make sure that the users are displayed
        cy.get('[data-cy="user-table"]').should('be.visible');

        // Make sure that the user table has the correct number of rows
        cy.get('[data-cy^="user-row"]').should('have.length', 3);
    });

    it('should navigate to the user detail page on selection', () => {
        // Create a new user
        cy.authRequest('POST', `${Cypress.env('backendBaseUrl')}/users`, {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@test.com",
            password: "Qwerty123!",
            role: "ADMIN",
            branchIds: []
        });

        // Visit the users page
        cy.visit('/users');

        // Click the user "John Doe"
        cy.get('td').contains('john.doe@test.com').parent('tr').click();

        // Assert that the user is redirected to the user detail page
        cy.url().should('match', /\/users\/[a-zA-Z0-9]+$/);

        // Assert that John Doe is selected
        cy.get('[data-cy="user-name-header"]').should('contain', 'John Doe');
    })

    it('should delete a user', () => {
        // Create a new user
        cy.authRequest('POST', `${Cypress.env('backendBaseUrl')}/users`, {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@test.com",
            password: "Qwerty123!",
            role: "ADMIN",
            branchIds: []
        });

        // Visit the users page
        cy.visit('/users');

        // Navigate to the user detail page
        cy.get('td').contains('john.doe@test.com').parent('tr').click();

        // Click the delete button
        cy.get('[data-cy="delete-user-button"]').click();

        // Assert that the delete modal is displayed
        cy.get('[data-cy="delete-user-modal"]').should('be.visible');

        // Click the confirm button
        cy.get('[data-cy="delete-user-confirm"]').click();

        // Assert that the user is redirected to the users page
        cy.url().should('include', '/users');

        // Assert that the user is deleted
        cy.get('td').contains('john.doe@test.com').should('not.exist');
    });

    it('should register a new user', () => {
        // Create a branch
        // Create a new user
        cy.authRequest('POST', `${Cypress.env('backendBaseUrl')}/branches`, {
            name: "Scouts"
        });

        // Visit the register user page
        cy.visit('/users/register');

        // Assert that the user is redirected to the register user page
        cy.url().should('include', '/users/register');

        // Fill in the form
        cy.get('[data-cy="register-user-first-name"]').type('John');
        cy.get('[data-cy="register-user-last-name"]').type('Doe');
        cy.get('[data-cy="register-user-email"]').type('john.doe@test.com');
        cy.get('[data-cy="register-user-password"]').type('Qwerty123!');
        cy.get('[data-cy="register-user-confirm-password"]').type('Qwerty123!');
        cy.get('[data-cy="register-user-role"]').select('ADMIN');
        cy.get('.rbt-input-main').type('Scouts');
        cy.get('.rbt-menu').contains('a', 'Scouts').click();

        // Submit the form
        cy.get('[data-cy="register-user-form"]').submit();

        // Assert that the user is redirected to the users page
        cy.url().should('include', '/users');

        // Assert that the user is created
        cy.get('td').contains('john.doe@test.com').should('exist');
    });

    it('should edit a user', () => {
        // Create a new branch
        cy.authRequest('POST', `${Cypress.env('backendBaseUrl')}/branches`, {
            name: "Scouts"
        });

        // Create a new user
        cy.authRequest('POST', `${Cypress.env('backendBaseUrl')}/users`, {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@test.com",
            password: "Qwerty123!",
            role: "ADMIN",
            branchIds: []
        });

        // Visit the users page
        cy.visit('/users');

        // Navigate to the user detail page
        cy.get('td').contains('john.doe@test.com').parent('tr').click();

        // Click the edit button
        cy.get('[data-cy="edit-user-button"]').click();

        // Fill in the form
        cy.get('[data-cy="edit-user-role"]').select('VOLUNTEER');
        cy.get('.rbt-input-main').type('Scouts');
        cy.get('.rbt-menu').contains('a', 'Scouts').click();

        // Submit the form
        cy.get('[data-cy="edit-user-form"]').submit();

        // Assert that the user is redirected to user details page
        cy.url().should('match', /\/users\/[a-zA-Z0-9]+$/);

        // Assert that the user is updated
        cy.get('[data-cy="user-role"]').should('contain', 'Vrijwilliger');
        cy.get('[data-cy="user-branches"]').contains('a', 'Scouts').should('exist');
    });
});