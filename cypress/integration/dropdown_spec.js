const dropdowns = [
  {
    name: 'Default',
    path: 'design-system-dropdown--default',
    class: '.Dropdown',
  },
  {
    name: 'Sizes',
    path: 'design-system-dropdown--sizes',
    class: '.Dropdown',
  },
  {
    name: 'Icon',
    path: 'design-system-dropdown--icon',
    class: '.Dropdown',
  },
];

describe('Dropdown', () => {
  dropdowns.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('exist');
      cy.wait(1000);
      cy.percySnapshot(test.path);
    });
  });
});
