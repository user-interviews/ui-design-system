const poppers = [
  {
    name: 'Default',
    path: 'components-popper--default',
  },
  {
    name: 'Dark',
    path: 'components-popper--dark',
  },
];

describe('Popper', () => {
  poppers.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.Popper').should('exist');
      cy.takePercySnapshot(test.path);
    });
  });
});
