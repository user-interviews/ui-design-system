const selects = [
  {
    name: 'Default',
    path: 'design-system-selects-creatable--default',
  },
];

describe('Selects -> Creatable', () => {
  selects.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.CreatableSelect').should('exist');
      cy.wait(1000);
      cy.percySnapshot(test.path);
    });
  });
});