const formGroups = [
  {
    name: 'Default',
    path: 'design-system-form-elements-form-group--default',
    class: '.Input',
  },
  {
    name: 'With Helper Text',
    path: 'design-system-form-elements-form-group--with-helper-text',
    class: '.Input',
  },
  {
    name: 'Required',
    path: 'design-system-form-elements-form-group--required',
    class: '.Input',
  },
  {
    name: 'With Label Tooltip',
    path: 'design-system-form-elements-form-group--with-label-tooltip',
    class: '.Input',
  },
  {
    name: 'With Leading Icon',
    path: 'design-system-form-elements-form-group--with-leading-icon',
    class: '.Input',
  },
  {
    name: 'With Trailing Icon',
    path: 'design-system-form-elements-form-group--with-trailing-icon',
    class: '.Input',
  },
  {
    name: 'With Trailing Icon And Button',
    path: 'design-system-form-elements-form-group--with-trailing-icon-and-button',
    class: '.Input',
  },
  {
    name: 'With Trailing Icon And Button With Submit',
    path: 'design-system-form-elements-form-group--with-trailing-icon-and-button-with-submit',
    class: '.Input',
  },
  {
    name: 'With Leading And Trailing Icons',
    path: 'design-system-form-elements-form-group--with-leading-and-trailing-icons',
    class: '.Input',
  },
  {
    name: 'With Errors',
    path: 'design-system-form-elements-form-group--with-errors',
    class: '.Input',
  },
  {
    name: 'With Radio Button Group',
    path: 'design-system-form-elements-form-group--with-radio-button-group',
    class: '.FormControlLabel__label',
  },
];

describe('Form Elements -> Form Group', () => {
  formGroups.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('exist');
      cy.percySnapshot(test.path);
    });
  });
});
