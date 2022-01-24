describe('Copy to Clipboard Button', () => {
  it('Default', () => {
    cy.visit('components-copy-to-clipboard-button--default');
    cy.get('#storybook-preview-iframe').iframe().find('.CopyToClipboardButton').should('exist');
    cy.takePercySnapshot('components-copy-to-clipboard-button--default');
  });

  it('Secondary', () => {
    cy.visit('components-copy-to-clipboard-button--secondary');
    cy.get('#storybook-preview-iframe').iframe().find('.CopyToClipboardButton').should('exist');
    cy.takePercySnapshot('components-copy-to-clipboard-button--secondary');
  });
});
