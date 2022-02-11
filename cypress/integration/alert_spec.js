const alerts = [
  {
    name: 'Success',
    path: 'components-alert--success',
    class: '.Alert__title',
  },
  {
    name: 'Info',
    path: 'components-alert--info',
    class: '.Alert__title',
  },
  {
    name: 'Announcement',
    path: 'components-alert--announcement',
    class: '.Alert__title',
  },
  {
    name: 'Error',
    path: 'components-alert--error',
    class: '.Alert__title',
  },
  {
    name: 'Warning',
    path: 'components-alert--warning',
    class: '.Alert__title',
  },
  {
    name: 'With Dismiss',
    path: 'components-alert--with-dismiss',
    class: '.Alert__title',
    match: 'Default title',
  },
  {
    name: 'With Call To Action',
    path: 'components-alert--with-call-to-action',
    class: '.Alert__title',
    match: 'Success title',
  },
];

describe('Alert', () => {
  alerts.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      const match = test.match ? test.match : test.name;
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('contain', match);
      cy.takePercySnapshot(test.path);
    });
  });
});
