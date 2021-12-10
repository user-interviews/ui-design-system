const buttons = [
  {
    name: 'Primary',
    path: 'design-system-button--primary',
    class: '.Button',
    match: 'Confirm',
  },
  {
    name: 'Danger',
    path: 'design-system-button--danger',
    class: '.Button',
    match: 'Delete',
  },
  {
    name: 'Warning',
    path: 'design-system-button--warning',
    class: '.Button',
    match: 'Edit',
  },
];

describe('Button', () => {
  buttons.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('contain', test.match);
      cy.wait(1000);
      cy.percySnapshot(test.path);
    });
  });
});
