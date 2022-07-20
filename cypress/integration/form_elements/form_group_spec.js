const formGroups = [
  {
    name: 'Default',
    path: 'components-form-elements-form-group--default',
    class: '.Input',
  },
  {
    name: 'With Helper Text',
    path: 'components-form-elements-form-group--with-helper-text',
    class: '.Input',
  },
  {
    name: 'Required',
    path: 'components-form-elements-form-group--required',
    class: '.Input',
  },
  {
    name: 'With Label Tooltip',
    path: 'components-form-elements-form-group--with-label-tooltip',
    class: '.Input',
  },
  {
    name: 'With Leading Icon',
    path: 'components-form-elements-form-group--with-leading-icon',
    class: '.Input',
  },
  {
    name: 'With Trailing Icon',
    path: 'components-form-elements-form-group--with-trailing-icon',
    class: '.Input',
  },
  {
    name: 'With Trailing Icon And Button',
    path: 'components-form-elements-form-group--with-trailing-icon-and-button',
    class: '.Input',
  },
  {
    name: 'With Trailing Icon And Button With Submit',
    path: 'components-form-elements-form-group--with-trailing-icon-and-button-with-submit',
    class: '.Input',
  },
  {
    name: 'With Leading And Trailing Icons',
    path: 'components-form-elements-form-group--with-leading-and-trailing-icons',
    class: '.Input',
  },
  {
    name: 'With Errors',
    path: 'components-form-elements-form-group--with-errors',
    class: '.Input',
  },
  {
    name: 'With Radio Button Group',
    path: 'components-form-elements-form-group--with-radio-button-group',
    class: '.FormControlLabel__label',
  },
];

describe('Form Elements -> Form Group', () => {
  formGroups.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('exist');
      cy.takePercySnapshot(test.path);
    });
  });
});
