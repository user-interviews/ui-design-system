const accordions = [
  {
    name: 'Default',
    path: 'components-accordion--default',
    class: '.AccordionToggle__title',
    match: 'Accordion Toggle #1',
  },
  {
    name: 'Default Open',
    path: 'components-accordion--default-open',
    class: '.AccordionToggle__title',
    match: 'Accordion Toggle #1',
  },
  {
    name: 'Chevron Left',
    path: 'components-accordion--chevron-left',
    class: '.AccordionToggle__title',
    match: 'Accordion Toggle #1',
  },
  {
    name: 'Borderless',
    path: 'components-accordion--borderless',
    class: '.AccordionToggle__title',
    match: 'Accordion Toggle #1',
  },
  {
    name: 'In Card',
    path: 'components-accordion--in-card',
    class: '.AccordionToggle__title',
    match: 'Accordion Toggle #1',
  },
  {
    name: 'Separate',
    path: 'components-accordion--separate',
    class: '.AccordionToggle__title',
    match: 'Accordion Toggle #1',
  },
  {
    name: 'Disabled',
    path: 'components-accordion--disabled',
    class: '.AccordionToggle__title',
    match: 'Accordion Toggle -- Disabled',
  },
];

describe('Accordion', () => {
  accordions.forEach((test) => {
    it(test.name, () => {
      cy.visit(test.path);
      const match = test.match ? test.match : test.name;
      cy.get('#storybook-preview-iframe').iframe().find(test.class).should('contain', match);
      cy.takePercySnapshot(test.path);
    });
  });
});
