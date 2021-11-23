const radioButtonGroups = [
  {
    name: 'Default',
    path: 'design-system-form-elements-radiobuttongroup--default',
    class: '.RadioButtonGroup',
  },
  {
    name: 'Default Row',
    path: 'design-system-form-elements-radiobuttongroup--default-row',
    class: '.RadioButtonGroup',
  },
  {
    name: 'Bordered Row',
    path: 'design-system-form-elements-radiobuttongroup--bordered-row',
    class: '.RadioButtonGroup',
  },
  {
    name: 'Description',
    path: 'design-system-form-elements-radiobuttongroup--description',
    class: '.RadioButtonGroup',
  },
  {
    name: 'Description Row',
    path: 'design-system-form-elements-radiobuttongroup--description-row',
    class: '.RadioButtonGroup',
  },
];

describe('Form Elements -> RadioButtonGroup', () => {
  radioButtonGroups.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('exist');
      cy.wait(1000);
      cy.percySnapshot(test.path);
    });
  });
});
