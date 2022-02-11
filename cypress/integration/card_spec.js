describe('Card', () => {
  it('Default', () => {
    cy.visit('components-card--default');
    cy.get('#storybook-preview-iframe').iframe().find('.Card__title')
      .should('contain', 'Large card with title');
    cy.takePercySnapshot('components-card--default');
  });
});
