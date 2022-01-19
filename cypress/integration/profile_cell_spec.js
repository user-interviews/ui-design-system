const profileCells = [
  {
    name: 'Small',
    path: 'design-system-profile-cell--small',
  },
  {
    name: 'Large',
    path: 'design-system-profile-cell--large',
  },
  {
    name: 'With Image',
    path: 'design-system-profile-cell--with-image',
  },
];

describe('Profile Cell', () => {
  profileCells.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.ProfileCell').should('exist');
      cy.takePercySnapshot(test.path);
    });
  });
});
