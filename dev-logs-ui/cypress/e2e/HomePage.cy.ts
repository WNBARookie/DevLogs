describe('Home Page', () => {
  beforeEach(() => {
    window.localStorage.setItem('token', 'token123');
    cy.intercept('GET', '/api/areas', { fixture: 'areasResponse_200.json' }).as('areas');

    cy.visit('/home');
  });

  it('should display areas when areas are found ', () => {
    cy.get('h1').contains('Welcome');
    cy.get('[data-testid="area-card"]').should('have.length', 3);
  });

  it('should display message when no areas are found', () => {
    cy.intercept('GET', '/api/areas', { fixture: 'noAreasResponse_200.json' }).as('areas');
    cy.wait('@areas');
    cy.get('h1').should('contain.text', 'Add an area to get started!');
  });

  it('should add area successfully', () => {
    cy.intercept('POST', '/api/areas', { fixture: 'apiResponse_200.json' }).as('apiResponse');

    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="title-field"]').type('title');
    cy.get('[data-testid="description-field"]').type('description');

    cy.get('[data-testid="dialog-action-button"]').click();
    cy.wait('@apiResponse');

    cy.get('.Toastify__toast--success').should('be.visible').and('contain.text', 'Successful details');
  });

  it('should handle error when adding area', () => {
    cy.intercept('POST', '/api/areas', {
      statusCode: 400,
      fixture: 'apiResponse_400.json',
    }).as('apiResponse');

    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="title-field"]').type('title');
    cy.get('[data-testid="description-field"]').type('description');

    cy.get('[data-testid="dialog-action-button"]').click();
    cy.wait('@apiResponse');

    cy.get('.Toastify__toast--error').should('be.visible').and('contain.text', 'Error details');
  });

  it('should edit area successfully', () => {
    cy.intercept('PUT', '/api/areas', { fixture: 'apiResponse_200.json' }).as('apiResponse');

    cy.get('[data-testid="card-menu-button"]').first().click();
    cy.get('[data-testid="edit-button"]').first().click();

    cy.get('[data-testid="title-field"]').clear();
    cy.get('[data-testid="title-field"]').type('updated title');
    cy.get('[data-testid="description-field"]').clear();
    cy.get('[data-testid="description-field"]').type('updated description');

    cy.get('[data-testid="dialog-action-button"]').click();
    cy.wait('@apiResponse');

    cy.get('.Toastify__toast--success').should('be.visible').and('contain.text', 'Successful details');
  });

  it('should handle error when editing area', () => {
    cy.intercept('PUT', '/api/areas', {
      statusCode: 400,
      fixture: 'apiResponse_400.json',
    }).as('apiResponse');

    cy.get('[data-testid="card-menu-button"]').first().click();
    cy.get('[data-testid="edit-button"]').first().click();

    cy.get('[data-testid="title-field"]').clear();
    cy.get('[data-testid="title-field"]').type('updated title');
    cy.get('[data-testid="description-field"]').clear();
    cy.get('[data-testid="description-field"]').type('updated description');

    cy.get('[data-testid="dialog-action-button"]').click();
    cy.wait('@apiResponse');

    cy.get('.Toastify__toast--error').should('be.visible').and('contain.text', 'Error details');
  });

  it('should delete area successfully', () => {
    cy.intercept('DELETE', '/api/areas/*', { fixture: 'apiResponse_200.json' }).as('apiResponse');

    cy.get('[data-testid="card-menu-button"]').first().click();
    cy.get('[data-testid="delete-button"]').first().click();

    cy.get('.Toastify__toast--success').should('be.visible').and('contain.text', 'Successful details');
  });

  it('should handle error when deleting area', () => {
    cy.intercept('DELETE', '/api/areas/*', {
      statusCode: 400,
      fixture: 'apiResponse_400.json',
    }).as('apiResponse');

    cy.get('[data-testid="card-menu-button"]').first().click();
    cy.get('[data-testid="delete-button"]').first().click();

    cy.get('.Toastify__toast--error').should('be.visible').and('contain.text', 'Error details');
  });
});
