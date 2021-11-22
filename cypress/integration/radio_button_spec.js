const radioButtons = [
  {
    name: 'Defaut',
    path: 'design-system-radiobutton--default',
  },
  {
    name: 'With Description',
    path: 'design-system-radiobutton--with-description',
  },
];

describe('Radio Button', () => {
  radioButtons.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('#root').should('exist');
      cy.wait(1000);
      cy.percySnapshot(test.path);
    });
  });
});
