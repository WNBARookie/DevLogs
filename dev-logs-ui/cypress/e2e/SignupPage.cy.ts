describe('Login Page', () => {
  // go to login page
  it('should go to log in page', () => {
    cy.visit('/signup');
    cy.get('h1').contains('Sign Up');

    //navigate to login page
    cy.get('[data-testid="login-button"]').click();
    cy.get('h1').contains('Log In');
    cy.url().should('include', '/login');
  });

  //sign up with missing fields
  it('should sign up with no credentials', () => {
    cy.visit('/signup');

    cy.get('[data-testid="signup-button"]').click();

    //inline errors
    cy.get('p').contains('Username is required');
    cy.get('p').contains('Email is required');
    cy.get('p').contains('Password is required');
  });

  //sign up with existing user
  it('should sign up with credentials of existing user', () => {
    cy.visit('/signup');

    cy.intercept('POST', '/api/users/register', {
      statusCode: 400,
      fixture: 'userAlreadyExistsResponse_400.json',
    }).as('createUser');

    cy.get('[data-testid="username-field"]').type('user');
    cy.get('[data-testid="email-field"]').type('test@test.com');
    cy.get('[data-testid="password-field"]').type('1');

    cy.get('[data-testid="signup-button"]').click();
    cy.wait('@createUser');

    cy.get('.Toastify__toast--error').should('be.visible').and('contain.text', 'User already exists');
  });

  //sign up sucess

  it('should sign up with valid credentials', () => {
    cy.visit('/signup');
    cy.intercept('POST', '/api/users/register', { fixture: 'userSuccessfullyCreatedResponse_200.json' }).as('createUser');

    cy.get('[data-testid="username-field"]').type('user');
    cy.get('[data-testid="email-field"]').type('test@test.com');
    cy.get('[data-testid="password-field"]').type('1');

    cy.get('[data-testid="signup-button"]').click();
    cy.wait('@createUser');

    cy.get('h1').contains('Log In');
    cy.get('.Toastify__toast--success').should('be.visible').and('contain.text', 'User was successfully created');
  });
});
