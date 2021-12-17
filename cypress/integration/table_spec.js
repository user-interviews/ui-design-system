const tables = [
  {
    name: 'Default',
    path: 'design-system-table--default',
    class: '.Table',
  },
  {
    name: 'Table With Fixed Column Widths',
    path: 'design-system-table--table-with-fixed-column-widths',
    class: '.Table',
  },
  {
    name: 'Table On Card',
    path: 'design-system-table--table-on-card',
    class: '.Card',
  },
  {
    name: 'Table On Card No Padding',
    path: 'design-system-table--table-on-card-no-padding',
    class: '.Card',
  },
  {
    name: 'Table With Single Action Column',
    path: 'design-system-table--table-with-single-action-column',
    class: '.Table',
  },
  {
    name: 'Table With Multiple Action Column',
    path: 'design-system-table--table-with-multiple-action-column',
    class: '.Table',
  },
  {
    name: 'Table With Sticky Column And Header',
    path: 'design-system-table--table-with-sticky-column-and-header',
    class: '.Table',
  },
  {
    name: 'Table With Multiple Sticky Columns And Header',
    path: 'design-system-table--table-with-multiple-sticky-columns-and-header',
    class: '.Table',
  },
  {
    name: 'Table With Multiple Select',
    path: 'design-system-table--table-with-multiple-select',
    class: '.Table',
  },
  {
    name: 'Table With Multiple Select And Multiple Sticky Columns And Header',
    path: 'design-system-table--table-with-multiple-select-and-multiple-sticky-columns-and-header',
    class: '.Table',
  },
  {
    name: 'Table With Sorting',
    path: 'design-system-table--table-with-sorting',
    class: '.Table',
  },
  {
    name: 'Table With Cell Right Alignment',
    path: 'design-system-table--table-with-cell-right-alignment',
    class: '.Table',
  },
  {
    name: 'Table With Compact Option',
    path: 'design-system-table--table-with-compact-option',
    class: '.Table',
  },
];

describe('Table', () => {
  tables.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('exist');
      cy.wait(2000);
      cy.percySnapshot(test.path);
    });
  });
});
