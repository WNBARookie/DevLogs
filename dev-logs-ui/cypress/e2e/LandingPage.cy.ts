describe('Landing Page', () => {
  it('should go to the landing page', () => {
    cy.visit('/');
    cy.contains('DevLogs').should('exist');

    //navigate to login page
    cy.get('[data-testid="live-demo-button"]').click();
    cy.url().should('include', '/login');
  });
});
