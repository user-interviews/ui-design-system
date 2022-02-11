describe('Icon Cell', () => {
  it('Default', () => {
    cy.visit('components-iconcell--default');
    cy.get('#storybook-preview-iframe').iframe().find('.IconCell').should('exist');
    cy.takePercySnapshot('components-iconcell--default');
  });
});
