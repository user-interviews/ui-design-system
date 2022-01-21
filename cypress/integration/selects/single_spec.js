const selects = [
  {
    name: 'Default',
    path: 'components-selects-single--default',
  },
  {
    name: 'Searchable',
    path: 'components-selects-single--searchable',
  },
  {
    name: 'Loading',
    path: 'components-selects-single--loading',
  },
  {
    name: 'Labeled',
    path: 'components-selects-single--labeled',
  },
  {
    name: 'Multi Select',
    path: 'components-selects-single--multi-select',
  },
  {
    name: 'Custom Option With Checkbox',
    path: 'components-selects-single--custom-option-with-checkbox',
  },
  {
    name: 'Custom Value Container',
    path: 'components-selects-single--custom-value-container',
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
