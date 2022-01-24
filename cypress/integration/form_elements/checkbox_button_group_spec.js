const checkboxButtonGroups = [
  {
    name: 'Default',
    path: 'components-form-elements-checkboxbuttongroup--default',
    class: '.InputLabel',
  },
  {
    name: 'Default Row',
    path: 'components-form-elements-checkboxbuttongroup--default-row',
    class: '.InputLabel',
  },
  {
    name: 'Bordered Row',
    path: 'components-form-elements-checkboxbuttongroup--bordered-row',
    class: '.InputLabel',
  },
  {
    name: 'Description',
    path: 'components-form-elements-checkboxbuttongroup--description',
    class: '.InputLabel',
  },
  {
    name: 'Description Row',
    path: 'components-form-elements-checkboxbuttongroup--description-row',
    class: '.InputLabel',
  },
];

describe('Form Elements -> CheckboxButtonGroup', () => {
  checkboxButtonGroups.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('contain', 'Label');
      cy.takePercySnapshot(test.path);
    });
  });
});
