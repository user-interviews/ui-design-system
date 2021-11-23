const alerts = [
  {
    name: 'Success',
    path: 'design-system-alert--success',
    class: '.Alert__title',
  },
  {
    name: 'Info',
    path: 'design-system-alert--info',
    class: '.Alert__title',
  },
  {
    name: 'Announcement',
    path: 'design-system-alert--announcement',
    class: '.Alert__title',
  },
  {
    name: 'Error',
    path: 'design-system-alert--error',
    class: '.Alert__title',
  },
  {
    name: 'Warning',
    path: 'design-system-alert--warning',
    class: '.Alert__title',
  },
  {
    name: 'With Dismiss',
    path: 'design-system-alert--with-dismiss',
    class: '.Alert__title',
    match: 'Default title',
  },
  {
    name: 'With Call To Action',
    path: 'design-system-alert--with-call-to-action',
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
      cy.percySnapshot(test.path);
    });
  });
});
