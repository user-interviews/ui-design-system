const toasts = [
  {
    name: 'Toast',
    path: 'components-toast--toast',
  },
  {
    name: 'Manual Dismiss Toast',
    path: 'components-toast--manual-dismiss-toast',
  },
  {
    name: 'Toast With Action',
    path: 'components-toast--toast-with-action',
  },
];

describe('Toast', () => {
  toasts.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.btn').should('exist')
        .click();
      cy.takePercySnapshot(test.path);
    });
  });
});
