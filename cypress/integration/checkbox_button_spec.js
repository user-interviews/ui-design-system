describe('CheckboxButton', () => {
  it('Default', () => {
    cy.visit('components-checkboxbutton--default');
    cy.get('#storybook-preview-iframe').iframe().find('.checkbox').should('exist');
    cy.takePercySnapshot('components-checkboxbutton--default');
  });

  it('Indeterminate', () => {
    cy.visit('components-checkboxbutton--indeterminate');
    cy.get('#storybook-preview-iframe').iframe().find('#select-all').should('exist');
    cy.takePercySnapshot('components-checkboxbutton--indeterminate');
  });

  it('With Description', () => {
    cy.visit('components-checkboxbutton--with-description');
    cy.get('#storybook-preview-iframe').iframe().find('.FormControlLabel__label')
      .should('contain', 'Label 2');
    cy.takePercySnapshot('components-checkboxbutton--with-description');
  });
});
