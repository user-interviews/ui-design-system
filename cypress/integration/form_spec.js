describe('Form', () => {
  it('Default', () => {
    cy.visit('components-form--default');
    cy.get('#storybook-preview-iframe').iframe().find('.Input').should('exist');
    cy.takePercySnapshot('components-form--default');
  });
});
