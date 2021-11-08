const modals = [
  {
    name: 'Default',
    path: 'design-system-modal--default',
  },
  {
    name: 'Medium Modal',
    path: 'design-system-modal--medium-modal',
  },
  {
    name: 'Large Modal',
    path: 'design-system-modal--large-modal',
  },
  {
    name: 'With Subtitle Modal',
    path: 'design-system-modal--with-subtitle-modal',
  },
  {
    name: 'Transactional Modal',
    path: 'design-system-modal--transactional-modal',
  },
  {
    name: 'Warning Modal',
    path: 'design-system-modal--warning-modal',
  },
  {
    name: 'Danger Modal',
    path: 'design-system-modal--danger-modal',
  },
];

describe('Modal', () => {
  modals.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.ModalHeader').should('contain', 'modal');
      cy.wait(1000);
      cy.percySnapshot(test.path);
    });
  });
});
