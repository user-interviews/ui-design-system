const toasts = [
  {
    name: 'Toast',
    path: 'design-system-toast--toast',
  },
  {
    name: 'Manual Dismiss Toast',
    path: 'design-system-toast--manual-dismiss-toast',
  },
  {
    name: 'Toast With Action',
    path: 'design-system-toast--toast-with-action',
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
