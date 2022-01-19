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
  // Check for accessibility tests to finish first
  cy.get('body').should('contain', 'Tests completed');

  cy.percySnapshot(name);
});
