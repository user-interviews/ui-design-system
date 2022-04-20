const buttons = [
  {
    name: 'Primary',
    path: 'components-button--primary',
    class: '.Button',
    match: 'Confirm',
  },
  {
    name: 'Danger',
    path: 'components-button--danger',
    class: '.Button',
    match: 'Delete',
  },
  {
    name: 'Warning',
    path: 'components-button--warning',
    class: '.Button',
    match: 'Edit',
  },
  {
    name: 'Transparent',
    path: 'components-button--transparent',
    class: '.Button',
    match: 'Skip',
  },
  {
    name: 'Brands',
    path: 'components-button--brands',
    class: '.Button',
    match: 'Google',
  },
];

describe('Button', () => {
  buttons.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('contain', test.match);
      cy.takePercySnapshot(test.path);
    });
  });
});
