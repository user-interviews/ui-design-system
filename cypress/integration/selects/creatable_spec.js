const selects = [
  {
    name: 'Default',
    path: 'components-selects-creatable--default',
  },
];

describe('Selects -> Creatable', () => {
  selects.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.CreatableSelect').should('exist');
      cy.takePercySnapshot(test.path);
    });
  });
});
