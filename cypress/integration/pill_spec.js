const pills = [
  {
    name: 'Default',
    path: 'components-pill--default',
  },
  {
    name: 'With Leading Icon',
    path: 'components-pill--with-leading-icon',
  },
  {
    name: 'With Close',
    path: 'components-pill--with-close',
  },
  {
    name: 'With Link',
    path: 'components-pill--with-link',
  },
];

describe('Pill', () => {
  pills.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.Pill').should('exist');
      cy.takePercySnapshot(test.path);
    });
  });
});
