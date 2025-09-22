describe('Login Page', () => {
  it('should go to sign up page', () => {
    cy.visit('/login');
    cy.get('h1').contains('Log In');

    //navigate to signup page
    cy.get('[data-testid="signup-button"]').click();
    cy.get('h1').contains('Sign Up');
    cy.url().should('include', '/signup');
  });

  it('should log in with no credentials', () => {
    cy.visit('/login');
    cy.get('h1').contains('Log In');

    cy.get('[data-testid="login-button"]').click();

    //inline errors
    cy.get('p').contains('Email is required');
    cy.get('p').contains('Password is required');
  });

  it('should log in with valid credentials', () => {
    cy.visit('/login');
    cy.get('h1').contains('Log In');
    cy.intercept('POST', '/api/users/login', { fixture: 'authenticateUserResponse_200.json' }).as('authenticateUser');

    cy.get('[data-testid="email-field"]').type('test@test.com');
    cy.get('[data-testid="password-field"]').type('1');

    cy.get('[data-testid="login-button"]').click();
    cy.wait('@authenticateUser');

    cy.get('h1').contains('Welcome');
  });

  it('should log in with invalid credentials', () => {
    cy.visit('/login');
    cy.get('h1').contains('Log In');
    cy.intercept('POST', '/api/users/login', {
      statusCode: 400,
      fixture: 'authenticateUserResponse_400.json',
    }).as('authenticateUser');

    cy.get('[data-testid="email-field"]').type('test@test.com');
    cy.get('[data-testid="password-field"]').type('1');

    cy.get('[data-testid="login-button"]').click();
    cy.wait('@authenticateUser');

    cy.get('.Toastify__toast--error').should('be.visible').and('contain.text', 'Credentials not valid');
  });
});
