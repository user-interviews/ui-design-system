const avatars = [
  {
    name: 'Small',
    path: 'design-system-avatar--small',
    class: '.Avatar__circle__initials',
    match: 'RR',
  },
  {
    name: 'Large',
    path: 'design-system-avatar--large',
    class: '.Avatar__circle__initials',
    match: 'RR',
  },
  {
    name: 'With Alert',
    path: 'design-system-avatar--with-alert',
    class: '.Avatar__circle__initials',
    match: 'RR',
  },
];

describe('Avatar', () => {
  avatars.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('contain', test.match);
      cy.percySnapshot(test.path);
    });
  });

  it('With Image', () => {
    cy.visit('design-system-avatar--with-image');
    cy.get('#storybook-preview-iframe').iframe().find('.Avatar__circle')
      .find('img')
      .should('be.visible');
    cy.percySnapshot('design-system-alert--with-image');
  });
});
