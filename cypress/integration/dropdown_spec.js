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
    name: 'Icon Default',
    path: 'components-dropdown--icon-default',
    class: '.Dropdown',
  },
  {
    name: 'Icon Swap',
    path: 'components-dropdown--icon-swap',
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
