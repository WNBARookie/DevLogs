describe('Projects Page', () => {
  beforeEach(() => {
    window.localStorage.setItem('token', 'token123');
    cy.intercept('GET', '/api/areas/*', { fixture: 'areaDetailsResponse_200.json' }).as('areaDetails');

    cy.visit('/areas/68c8a15d17c8bc5b82492e74');
  });

  it('should display project details when projects are found ', () => {
    cy.get('[data-testid="project-card-title"]').contains('Google UX Coursera');

    cy.get('[data-testid="project-card"]').should('have.length', 3);
  });

  it('should display message when no projects are found', () => {
    cy.intercept('GET', '/api/areas/*', { fixture: 'noProjectsResponse_200.json' }).as('areaDetails');

    cy.wait('@areaDetails');
    cy.get('h1').should('contain.text', 'Add a project to get started!');
  });

  it('should add project successfully', () => {
    cy.intercept('POST', '/api/projects', { fixture: 'apiResponse_200.json' }).as('apiResponse');

    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="title-field"]').type('title');
    cy.get('[data-testid="description-field"]').type('description');

    cy.get('[data-testid="dialog-action-button"]').click();
    cy.wait('@apiResponse');

    cy.get('.Toastify__toast--success').should('be.visible').and('contain.text', 'Successful details');
  });

  it('should handle error when adding project', () => {
    cy.intercept('POST', '/api/projects', {
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

  it('should edit project successfully', () => {
    cy.intercept('PUT', '/api/projects', { fixture: 'apiResponse_200.json' }).as('apiResponse');

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

  it('should handle error when editing project', () => {
    cy.intercept('PUT', '/api/projects', {
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

  it('should delete project successfully', () => {
    cy.intercept('DELETE', '/api/projects/*', { fixture: 'apiResponse_200.json' }).as('apiResponse');

    cy.get('[data-testid="card-menu-button"]').first().click();
    cy.get('[data-testid="delete-button"]').first().click();

    cy.get('.Toastify__toast--success').should('be.visible').and('contain.text', 'Successful details');
  });

  it('should handle error when deleting project', () => {
    cy.intercept('DELETE', '/api/projects/*', {
      statusCode: 400,
      fixture: 'apiResponse_400.json',
    }).as('apiResponse');

    cy.get('[data-testid="card-menu-button"]').first().click();
    cy.get('[data-testid="delete-button"]').first().click();

    cy.get('.Toastify__toast--error').should('be.visible').and('contain.text', 'Error details');
  });

  it('should get area summary successfully', () => {
    cy.intercept('GET', '/api/areas/summary/*', { fixture: 'summaryResponse_200.json' }).as('summary');

    cy.get('[data-testid="summary-button"]').click();
    cy.wait('@summary');

    cy.get('[data-testid="summary-text"]').should('contain.text', 'Summary of things.');
  });

  it('should handle error when getting area summary', () => {
    cy.intercept('GET', '/api/areas/summary/*', {
      statusCode: 400,
      fixture: 'apiResponse_400.json',
    }).as('apiResponse');

    cy.get('[data-testid="summary-button"]').click();
    cy.wait('@apiResponse');

    cy.get('.Toastify__toast--error').should('be.visible').and('contain.text', 'Error details');
  });
});
