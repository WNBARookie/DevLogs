describe('ProjectDetails Page', () => {
  beforeEach(() => {
    window.localStorage.setItem('token', 'token123');
    cy.intercept('GET', '/api/projects/*', { fixture: 'projectDetailsResponse_200.json' }).as('projectDetails');

    cy.visit('/projects/68c8a15d17c8bc5b82492e74');
  });

  it('should display item details when items are found ', () => {
    cy.get('[data-testid="card-menu-button"]').contains('Empathy maps');

    cy.get('[data-testid="item-card"]').should('have.length', 3);
  });

  it('should display message when no items are found', () => {
    cy.intercept('GET', '/api/projects/*', { fixture: 'noItemsResponse_200.json' }).as('projectDetails');

    cy.wait('@projectDetails');
    cy.get('h1').should('contain.text', 'Add an item to get started!');
  });

  it('should add item successfully', () => {
    cy.intercept('POST', '/api/items', { fixture: 'apiResponse_200.json' }).as('apiResponse');

    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="title-field"]').type('title');
    cy.get('[data-testid="description-field"]').type('description');
    cy.get('[data-testid="what-went-well-field"]').type('whatWentWell');
    cy.get('[data-testid="what-did-not-go-well-field"]').type('whatDidNotGoWell');
    cy.get('[data-testid="lessons-learned-field"]').type('lessonsLearned');

    cy.get('[data-testid="dialog-action-button"]').click();
    cy.wait('@apiResponse');

    cy.get('.Toastify__toast--success').should('be.visible').and('contain.text', 'Successful details');
  });

  it('should handle error when adding item', () => {
    cy.intercept('POST', '/api/items', {
      statusCode: 400,
      fixture: 'apiResponse_400.json',
    }).as('apiResponse');

    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="title-field"]').type('title');
    cy.get('[data-testid="description-field"]').type('description');
    cy.get('[data-testid="what-went-well-field"]').type('whatWentWell');
    cy.get('[data-testid="what-did-not-go-well-field"]').type('whatDidNotGoWell');
    cy.get('[data-testid="lessons-learned-field"]').type('lessonsLearned');

    cy.get('[data-testid="dialog-action-button"]').click();
    cy.wait('@apiResponse');

    cy.get('.Toastify__toast--error').should('be.visible').and('contain.text', 'Error details');
  });

  it('should edit item successfully', () => {
    cy.intercept('PUT', '/api/items', { fixture: 'apiResponse_200.json' }).as('apiResponse');

    cy.get('[name="my-accordion-2"]').first().click();
    cy.get('[data-testid="edit-button"]').first().click();

    cy.get('[data-testid="title-field"]').clear();
    cy.get('[data-testid="title-field"]').type('updated title');
    cy.get('[data-testid="description-field"]').clear();
    cy.get('[data-testid="description-field"]').type('updated description');
    cy.get('[data-testid="what-went-well-field"]').clear();
    cy.get('[data-testid="what-went-well-field"]').type('updated whatWentWell');
    cy.get('[data-testid="what-did-not-go-well-field"]').clear();
    cy.get('[data-testid="what-did-not-go-well-field"]').type('updated whatDidNotGoWell');
    cy.get('[data-testid="lessons-learned-field"]').clear();
    cy.get('[data-testid="lessons-learned-field"]').type('updated lessonsLearned');

    cy.get('[data-testid="dialog-action-button"]').click();
    cy.wait('@apiResponse');

    cy.get('.Toastify__toast--success').should('be.visible').and('contain.text', 'Successful details');
  });

  it('should handle error when editing item', () => {
    cy.intercept('PUT', '/api/items', {
      statusCode: 400,
      fixture: 'apiResponse_400.json',
    }).as('apiResponse');

    cy.get('[name="my-accordion-2"]').first().click();
    cy.get('[data-testid="edit-button"]').first().click();

    cy.get('[data-testid="title-field"]').clear();
    cy.get('[data-testid="title-field"]').type('updated title');
    cy.get('[data-testid="description-field"]').clear();
    cy.get('[data-testid="description-field"]').type('updated description');
    cy.get('[data-testid="what-went-well-field"]').clear();
    cy.get('[data-testid="what-went-well-field"]').type('updated whatWentWell');
    cy.get('[data-testid="what-did-not-go-well-field"]').clear();
    cy.get('[data-testid="what-did-not-go-well-field"]').type('updated whatDidNotGoWell');
    cy.get('[data-testid="lessons-learned-field"]').clear();
    cy.get('[data-testid="lessons-learned-field"]').type('updated lessonsLearned');

    cy.get('[data-testid="dialog-action-button"]').click();
    cy.wait('@apiResponse');

    cy.get('.Toastify__toast--error').should('be.visible').and('contain.text', 'Error details');
  });

  it('should delete item successfully', () => {
    cy.intercept('DELETE', '/api/items/*', { fixture: 'apiResponse_200.json' }).as('apiResponse');

    cy.get('[name="my-accordion-2"]').first().click();
    cy.get('[data-testid="delete-button"]').first().click();

    cy.get('.Toastify__toast--success').should('be.visible').and('contain.text', 'Successful details');
  });

  it('should handle error when deleting item', () => {
    cy.intercept('DELETE', '/api/items/*', {
      statusCode: 400,
      fixture: 'apiResponse_400.json',
    }).as('apiResponse');

    cy.get('[name="my-accordion-2"]').first().click();
    cy.get('[data-testid="delete-button"]').first().click();

    cy.get('.Toastify__toast--error').should('be.visible').and('contain.text', 'Error details');
  });

  it('should get project summary successfully', () => {
    cy.intercept('GET', '/api/projects/summary/*', { fixture: 'summaryResponse_200.json' }).as('summary');

    cy.get('[data-testid="summary-button"]').click();
    cy.wait('@summary');

    cy.get('[data-testid="summary-text"]').should('contain.text', 'Summary of things.');
  });

  it('should handle error when getting project summary', () => {
    cy.intercept('GET', '/api/projects/summary/*', {
      statusCode: 400,
      fixture: 'apiResponse_400.json',
    }).as('apiResponse');

    cy.get('[data-testid="summary-button"]').click();
    cy.wait('@apiResponse');

    cy.get('.Toastify__toast--error').should('be.visible').and('contain.text', 'Error details');
  });
});
