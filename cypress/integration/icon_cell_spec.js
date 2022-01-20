describe('Icon Cell', () => {
  it('Default', () => {
    cy.visit('design-system-iconcell--default');
    cy.get('#storybook-preview-iframe').iframe().find('.IconCell').should('exist');
    cy.takePercySnapshot('design-system-iconcell--default');
  });
});
