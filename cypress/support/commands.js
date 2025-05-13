Cypress.Commands.add('completeRegistrationForm', (user) => {
    cy.get('#username').should('be.visible').type(user.username);
    cy.get('#email').should('be.visible').type(user.email);
    cy.get('#password').should('be.visible').type(user.password);
    cy.get('#confirmPassword').should('be.visible').type(user.confirmPassword);
});

Cypress.Commands.add('completeLoginForm', (user) => {
    cy.get('[data-testid="input-username"]').should('be.visible').type(user.username);
    cy.get('[data-testid="input-password"]').should('be.visible').type(user.password);
});