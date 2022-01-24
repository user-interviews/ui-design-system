describe('Copy to Clipboard', () => {
  it('Default', () => {
    cy.visit('components-copy-to-clipboard--default');
    cy.get('#storybook-preview-iframe').iframe().find('.CopyToClipboard').should('exist');
    cy.takePercySnapshot('components-copy-to-clipboard--default');
  });
});
