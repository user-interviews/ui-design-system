const checkboxButtonGroups = [
  {
    name: 'Default',
    path: 'components-form-elements-checkboxbuttongroup--default',
    class: '.FormControlLabel__label',
    value: 'Value',
  },
  {
    name: 'Default Row',
    path: 'components-form-elements-checkboxbuttongroup--default-row',
    class: '.FormControlLabel__label',
    value: 'Label',
  },
  {
    name: 'Bordered Row',
    path: 'components-form-elements-checkboxbuttongroup--bordered-row',
    class: '.FormControlLabel__label',
    value: 'Label',
  },
  {
    name: 'Description',
    path: 'components-form-elements-checkboxbuttongroup--description',
    class: '.FormControlLabel__label',
    value: 'Label',
  },
  {
    name: 'Description Row',
    path: 'components-form-elements-checkboxbuttongroup--description-row',
    class: '.FormControlLabel__label',
    value: 'Label',
  },
];

describe('Form Elements -> CheckboxButtonGroup', () => {
  checkboxButtonGroups.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('contain', test.value);
      cy.takePercySnapshot(test.path);
    });
  });
});
