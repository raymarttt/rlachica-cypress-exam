import { generateRegistrationData } from '../../support/registration-utils';

describe('User Registration & Login - Test Automation PH Quiz App', { testIsolation: false }, () => {
  let registrationData = null;

  beforeEach(() => {
    cy.visit('/register');
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Should Successfully Register a New User (Quiz Master or Regular User)', () => {
    registrationData = generateRegistrationData(); // Generate dynamic user data

    cy.intercept('POST', '**/api/register').as('registerRequest');

    cy.completeRegistrationForm(registrationData)
    cy.get(`#${registrationData.roleId}`).check();
    cy.get('button').click();

    // cy.wait('@registerRequest').its('response.statusCode').should('eq', 201);
   cy.get('.mt-6').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('Should Allow Newly Registered User to Log In and Access Dashboard', () => {
    cy.visit('/login');

    cy.completeLoginForm(registrationData)
    cy.get('[data-testid="login-button"]').click();


  });

  it('User Should Not Be Able to Register Without Filling Required Fields', () => {
     cy.visit('/register');
     cy.get(':nth-child(6) > .w-full').click()
     cy.get(':nth-child(1) > .text-red-600').should('contain','Username must be at least 3 characters')
     cy.get(':nth-child(2) > .text-red-600').should('contain','Please enter a valid email')
     cy.get(':nth-child(3) > .text-red-600').should('contain','Password must be at least 6 characters')

  });

 
});