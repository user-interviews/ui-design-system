const poppers = [
  {
    name: 'Default',
    path: 'design-system-popper--default',
  },
  {
    name: 'Dark',
    path: 'design-system-popper--dark',
  },
];

describe('Popper', () => {
  poppers.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.Popper').should('exist');
      cy.wait(1000);
      cy.percySnapshot(test.path);
    });
  });
});
