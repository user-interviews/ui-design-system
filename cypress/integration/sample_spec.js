/* eslint-disable arrow-body-style */
/* eslint-disable prefer-arrow-callback */

describe('Integration test with visual testing', function () {
  it('Loads non button version', function () {
    cy.visit('http://localhost:9009/?path=/story/design-system-form-elements-form-group--with-trailing-icon');

    cy.get('#storybook-preview-iframe').iframe().find('.InputLabel').should('contain', 'Form Group with input trailing icon');

    cy.percySnapshot('Non-button');
  });

  // TODO: Wait on new props to be merged into develop
  // https://github.com/user-interviews/ui-design-system/pull/431
  // it('Loads button version', function () {
  //   cy.visit('http://localhost:9009/?path=/story/design-system-form-elements-form-group--with-trailing-icon-and-button');

  //   cy.get('#storybook-preview-iframe').iframe().find('.InputLabel')
  //     .should('contain', 'Form Group with input trailing icon and button');

  //   cy.percySnapshot('Button');
  // });
});
