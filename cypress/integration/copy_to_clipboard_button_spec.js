describe('Copy to Clipboard Button', () => {
  it('Default', () => {
    cy.visit('design-system-copy-to-clipboard-button--default');
    cy.get('#storybook-preview-iframe').iframe().find('.CopyToClipboardButton').should('exist');
    cy.percySnapshot('design-system-copy-to-clipboard-button--default');
  });

  it('Secondary', () => {
    cy.visit('design-system-copy-to-clipboard-button--secondary');
    cy.get('#storybook-preview-iframe').iframe().find('.CopyToClipboardButton').should('exist');
    cy.percySnapshot('design-system-copy-to-clipboard-button--secondary');
  });
});
