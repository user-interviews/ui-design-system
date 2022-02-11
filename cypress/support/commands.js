/* eslint-disable arrow-body-style */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// https://github.com/cypress-io/cypress/issues/136#issuecomment-342391119
Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe) => {
  return new Cypress.Promise((resolve) => {
    $iframe.on('load', () => {
      resolve($iframe.contents().find('body'));
    });
  });
});

Cypress.Commands.add('takePercySnapshot', (name) => {
  cy.get('body').should('contain', 'Tests completed');
  cy.get('body').type('f'); // Fullscreen component

  // Close the storybook update popup if it is there
  cy.get('body').then((body) => {
    if (body.find('button[title="Dismiss notification"]').length > 0) {
      cy.get('button[title="Dismiss notification"]').click();
    }
  });

  cy.percySnapshot(name);
  cy.get('body').type('f'); // Un-fullscreen component
});
