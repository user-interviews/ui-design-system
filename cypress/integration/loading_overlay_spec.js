describe('Loading Overlay', () => {
  it('Default', () => {
    cy.visit('design-system-loadingoverlay--default');
    cy.get('#storybook-preview-iframe').iframe().find('.overlay').should('exist');
    cy.percySnapshot('design-system-loadingoverlay--default');
  });
});
