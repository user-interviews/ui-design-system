const pills = [
  {
    name: 'Default',
    path: 'design-system-pill--default',
  },
  {
    name: 'With Leading Icon',
    path: 'design-system-pill--with-leading-icon',
  },
  {
    name: 'With Close',
    path: 'design-system-pill--with-close',
  },
  {
    name: 'With Link',
    path: 'design-system-pill--with-link',
  },
];

describe('Pill', () => {
  pills.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.Pill').should('exist');
      cy.percySnapshot(test.path);
    });
  });
});
