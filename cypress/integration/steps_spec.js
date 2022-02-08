const steps = [
  {
    name: 'Default',
    path: 'components-steps--default',
  },
  {
    name: 'Varying Content Length',
    path: 'components-steps--varying-content-length',
  },
];

describe('Steps', () => {
  steps.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.Steps').should('exist');
      cy.takePercySnapshot(test.path);
    });
  });
});
