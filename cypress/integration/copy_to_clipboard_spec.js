describe('Copy to Clipboard', () => {
  it('Default', () => {
    cy.visit('design-system-copy-to-clipboard--default');
    cy.get('#storybook-preview-iframe').iframe().find('.CopyToClipboard').should('exist');
    cy.percySnapshot('design-system-copy-to-clipboard--default');
  });
});
