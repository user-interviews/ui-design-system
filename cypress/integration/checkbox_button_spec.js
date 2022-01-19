describe('CheckboxButton', () => {
  it('Default', () => {
    cy.visit('design-system-checkboxbutton--default');
    cy.get('#storybook-preview-iframe').iframe().find('.checkbox').should('exist');
    cy.takePercySnapshot('design-system-checkboxbutton--default');
  });

  it('Indeterminate', () => {
    cy.visit('design-system-checkboxbutton--indeterminate');
    cy.get('#storybook-preview-iframe').iframe().find('#select-all').should('exist');
    cy.takePercySnapshot('design-system-checkboxbutton--indeterminate');
  });

  it('With Description', () => {
    cy.visit('design-system-checkboxbutton--with-description');
    cy.get('#storybook-preview-iframe').iframe().find('.FormControlLabel__label')
      .should('contain', 'Label 2');
    cy.takePercySnapshot('design-system-checkboxbutton--with-description');
  });
});
