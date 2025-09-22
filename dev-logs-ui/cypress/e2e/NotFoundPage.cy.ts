describe('Not Found Page', () => {
  it('should go to the not found page', () => {
    cy.visit('/invalid-url');
    cy.get('h1').contains('404 Not Found');

    //navigate to landing page
    cy.get('[data-testid="home-button"]').click();
    cy.url().should('include', '/');
  });
});
