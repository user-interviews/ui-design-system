describe('Loading Overlay', () => {
  it('Default', () => {
    cy.visit('components-loadingoverlay--default');
    cy.get('#storybook-preview-iframe').iframe().find('.overlay').should('exist');
    cy.takePercySnapshot('components-loadingoverlay--default');
  });
});
