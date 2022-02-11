const tooltips = [
  {
    name: 'Defaut',
    path: 'components-tooltip--default',
  },
  {
    name: 'Light',
    path: 'components-tooltip--light',
  },
  {
    name: 'With Header',
    path: 'components-tooltip--with-header',
  },
  {
    name: 'With Html',
    path: 'components-tooltip--with-html',
  },
  {
    name: 'Green Icon',
    path: 'components-tooltip--green-icon',
  },
  {
    name: 'Gray Icon',
    path: 'components-tooltip--gray-icon',
  },
  {
    name: 'With Tracking',
    path: 'components-tooltip--with-tracking',
  },
];

describe('Tooltip', () => {
  tooltips.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.Tooltip__icon').click();
      cy.takePercySnapshot(test.path);
    });
  });
});
