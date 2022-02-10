const modals = [
  {
    name: 'Default',
    path: 'components-modal--default',
  },
  {
    name: 'Medium Modal',
    path: 'components-modal--medium-modal',
  },
  {
    name: 'Large Modal',
    path: 'components-modal--large-modal',
  },
  {
    name: 'With Subtitle Modal',
    path: 'components-modal--with-subtitle-modal',
  },
  {
    name: 'Transactional Modal',
    path: 'components-modal--transactional-modal',
  },
  {
    name: 'Warning Modal',
    path: 'components-modal--warning-modal',
  },
  {
    name: 'Danger Modal',
    path: 'components-modal--danger-modal',
  },
];

describe('Modal', () => {
  modals.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find('.ModalHeader').should('contain', 'modal')
                                                  .find('button.btn-close').should('exist');
      cy.takePercySnapshot(test.path);
    });
  });
});
