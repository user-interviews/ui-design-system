describe('Form', () => {
  it('Default', () => {
    cy.visit('design-system-form--default');
    cy.get('#storybook-preview-iframe').iframe().find('.Input').should('exist');
    cy.takePercySnapshot('design-system-form--default');
  });
});
