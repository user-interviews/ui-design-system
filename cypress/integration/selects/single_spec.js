const selects = [
  {
    name: 'Default',
    path: 'design-system-selects-single--default',
  },
  {
    name: 'Searchable',
    path: 'design-system-selects-single--searchable',
  },
  {
    name: 'Loading',
    path: 'design-system-selects-single--loading',
  },
  {
    name: 'Labeled',
    path: 'design-system-selects-single--labeled',
  },
  {
    name: 'Multi Select',
    path: 'design-system-selects-single--multi-select',
  },
  {
    name: 'Custom Option With Checkbox',
    path: 'design-system-selects-single--custom-option-with-checkbox',
  },
  {
    name: 'Custom Value Container',
    path: 'design-system-selects-single--custom-value-container',
  },
];

describe('Selects -> Single', () => {
  selects.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.SingleSelect').should('exist');
      cy.takePercySnapshot(test.path);
    });
  });
});
