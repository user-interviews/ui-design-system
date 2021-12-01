const selects = [
  {
    name: 'Default',
    path: 'design-system-selects-async--default',
  },
  {
    name: 'Labeled',
    path: 'design-system-selects-async--labeled',
  },
];

describe('Selects -> Async', () => {
  selects.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.AsyncSelect').should('exist');
      cy.wait(1000);
      cy.percySnapshot(test.path);
    });
  });
});
