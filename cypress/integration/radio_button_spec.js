const radioButtons = [
  {
    name: 'Defaut',
    path: 'components-radiobutton--default',
  },
  {
    name: 'With Description',
    path: 'components-radiobutton--with-description',
  },
];

describe('Radio Button', () => {
  radioButtons.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('#root').should('exist');
      cy.takePercySnapshot(test.path);
    });
  });
});
