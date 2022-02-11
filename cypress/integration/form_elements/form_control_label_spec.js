const formControlLabels = [
  {
    name: 'Checkbox',
    path: 'components-form-elements-form-control-label--checkbox',
    class: '.FormControlLabel',
  },
  {
    name: 'Default Row',
    path: 'components-form-elements-form-control-label--checkbox-with-children',
    class: '.FormControlLabel',
  },
  {
    name: 'Radio',
    path: 'components-form-elements-form-control-label--radio',
    class: '.FormControlLabel',
  },
  {
    name: 'Radio With Children',
    path: 'components-form-elements-form-control-label--radio-with-children',
    class: '.FormControlLabel',
  },
];

describe('Form Elements -> Form Control Label', () => {
  formControlLabels.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('contain', 'Label');
      cy.takePercySnapshot(test.path);
    });
  });
});
