import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from 'src/Accordion';

import mdx from './Accordion.mdx';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: {
    AccordionItem, AccordionHeader, AccordionBody,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Accordion>
    <AccordionItem>
      <AccordionHeader>Accordion Header #1</AccordionHeader>
      <AccordionBody>Accordion Body</AccordionBody>
    </AccordionItem>
  </Accordion>
);
