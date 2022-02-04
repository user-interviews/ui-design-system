describe('Steps', () => {
  it('Default', () => {
    cy.visit('components-steps--default');
    cy.get('#storybook-preview-iframe').iframe().find('.Steps').should('exist');
    cy.takePercySnapshot('components-steps--default');
  });
});
