const tooltips = [
  {
    name: 'Defaut',
    path: 'design-system-tooltip--default',
  },
  {
    name: 'Light',
    path: 'design-system-tooltip--light',
  },
  {
    name: 'With Header',
    path: 'design-system-tooltip--with-header',
  },
  {
    name: 'With Html',
    path: 'design-system-tooltip--with-html',
  },
  {
    name: 'Green Icon',
    path: 'design-system-tooltip--green-icon',
  },
  {
    name: 'Gray Icon',
    path: 'design-system-tooltip--gray-icon',
  },
  {
    name: 'With Tracking',
    path: 'design-system-tooltip--with-tracking',
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
