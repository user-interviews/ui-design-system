const dropdowns = [
  {
    name: 'Default',
    path: 'components-dropdown--default',
    class: '.Dropdown',
  },
  {
    name: 'Sizes',
    path: 'components-dropdown--sizes',
    class: '.Dropdown',
  },
  {
    name: 'Icon',
    path: 'components-dropdown--icon',
    class: '.Dropdown',
  },
];

describe('Dropdown', () => {
  dropdowns.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('exist');
      cy.takePercySnapshot(test.path);
    });
  });
});
