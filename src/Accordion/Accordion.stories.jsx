import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionHeader,
  AccordionBody,
  AccordionCustomToggle,
  AccordionCollapse,
} from 'src/Accordion';

import { Pill } from 'src/Pill';
import { Button } from 'src/Button';

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
  <>
  <Accordion flush>
    <AccordionItem eventKey="0">
      <AccordionHeader>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
         <span>hi</span><span>yo</span>
        </div>
      </AccordionHeader>
      <AccordionBody>Accordion Body</AccordionBody>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader>Accordion Header #2</AccordionHeader>
      <AccordionBody eventKey="1">Accordion Body</AccordionBody>
    </AccordionItem>
  </Accordion>
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>Accordion Header #1</div> 
          <div><Pill color="blue">2 Selected</Pill></div>
        </div>
  </>
);

export const Example = () => (
  <Accordion alwaysOpen>
    <AccordionItem>
      <AccordionCustomToggle
        eventKey="0"
        chevronLeft
      >
        Accordion Custom Toggle #1
      </AccordionCustomToggle>
      <AccordionCollapse eventKey="0">Body 1</AccordionCollapse>
    </AccordionItem>
    <AccordionItem>
      <AccordionCustomToggle
        eventKey="1"
        chevronLeft
      >
        Accordion Custom Toggle #2
      </AccordionCustomToggle>
      <AccordionCollapse eventKey="1">Body 2</AccordionCollapse>
    </AccordionItem>
  </Accordion>
)
