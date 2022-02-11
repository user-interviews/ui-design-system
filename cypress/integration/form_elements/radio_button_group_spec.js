const radioButtonGroups = [
  {
    name: 'Default',
    path: 'components-form-elements-radiobuttongroup--default',
    class: '.RadioButtonGroup',
  },
  {
    name: 'Default Row',
    path: 'components-form-elements-radiobuttongroup--default-row',
    class: '.RadioButtonGroup',
  },
  {
    name: 'Bordered Row',
    path: 'components-form-elements-radiobuttongroup--bordered-row',
    class: '.RadioButtonGroup',
  },
  {
    name: 'Description',
    path: 'components-form-elements-radiobuttongroup--description',
    class: '.RadioButtonGroup',
  },
  {
    name: 'Description Row',
    path: 'components-form-elements-radiobuttongroup--description-row',
    class: '.RadioButtonGroup',
  },
];

describe('Form Elements -> RadioButtonGroup', () => {
  radioButtonGroups.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('exist');
      cy.takePercySnapshot(test.path);
    });
  });
});
