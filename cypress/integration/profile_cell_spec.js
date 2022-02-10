const profileCells = [
  {
    name: 'Small',
    path: 'components-profile-cell--small',
  },
  {
    name: 'Large',
    path: 'components-profile-cell--large',
  },
  {
    name: 'With Image',
    path: 'components-profile-cell--with-image',
  },
];

describe('Profile Cell', () => {
  profileCells.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.Avatar__circle').should('exist');
      cy.takePercySnapshot(test.path);
    });
  });
});
