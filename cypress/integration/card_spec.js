describe('Card', () => {
  it('Default', () => {
    cy.visit('design-system-card--default');
    cy.get('#storybook-preview-iframe').iframe().find('.Card__title')
      .should('contain', 'Large card with title');
    cy.percySnapshot('design-system-card--default');
  });
});
