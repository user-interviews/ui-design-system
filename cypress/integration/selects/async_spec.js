const selects = [
  {
    name: 'Default',
    path: 'components-selects-async--default',
  },
  {
    name: 'Labeled',
    path: 'components-selects-async--labeled',
  },
];

describe('Selects -> Async', () => {
  selects.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.AsyncSelect').should('exist');
      cy.takePercySnapshot(test.path);
    });
  });
});
