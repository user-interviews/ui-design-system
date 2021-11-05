const checkboxButtons = [
  {
    name: 'Default',
    path: 'design-system-checkboxbutton--default',
  },
  {
    name: 'Indeterminate',
    path: 'design-system-checkboxbutton--indeterminate',
  },
  {
    name: 'With Description',
    path: 'design-system-checkboxbutton--with-description',
  },
];

describe('CheckboxButton', () => {
  it('Default', () => {
    cy.visit('design-system-checkboxbutton--default');
    cy.get('#storybook-preview-iframe').iframe().find('.checkbox').should('exist');
    cy.percySnapshot('design-system-checkboxbutton--default');
  });

  it('Indeterminate', () => {
    cy.visit('design-system-checkboxbutton--indeterminate');
    cy.get('#storybook-preview-iframe').iframe().find('#select-all').should('exist');
    cy.percySnapshot('design-system-checkboxbutton--indeterminate');
  });

  it('With Description', () => {
    cy.visit('design-system-checkboxbutton--with-description');
    cy.get('#storybook-preview-iframe').iframe().find('.FormControlLabel__label')
      .should('contain', 'Label 2');
    cy.percySnapshot('design-system-checkboxbutton--with-description');
  });
});
