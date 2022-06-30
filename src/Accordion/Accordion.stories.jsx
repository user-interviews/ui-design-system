import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  AccordionCustomToggle,
  AccordionCollapse,
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
      <AccordionCustomToggle
        chevronRight
        eventKey="0"
        helperText="helper text"
        label="3 Items Selected"
        title="Accordion Custom Toggle #1"
      />
      <AccordionCollapse eventKey="0">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </AccordionCollapse>
    </AccordionItem>
    <AccordionItem>
      <AccordionCustomToggle
        chevronRight
        eventKey="1"
        helperText="helper text"
        label="3 Items Selected"
        title="Accordion Custom Toggle #2"
      />
      <AccordionCollapse eventKey="1">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </AccordionCollapse>
    </AccordionItem>
  </Accordion>
);

export const ChevronLeft = () => (
  <Accordion>
    <AccordionItem>
      <AccordionCustomToggle
        chevronLeft
        eventKey="0"
        helperText="helper text"
        label="3 Items Selected"
        title="Accordion Custom Toggle #1"
      />
      <AccordionCollapse eventKey="0">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </AccordionCollapse>
    </AccordionItem>
    <AccordionItem>
      <AccordionCustomToggle
        chevronLeft
        eventKey="1"
        helperText="helper text"
        label="3 Items Selected"
        title="Accordion Custom Toggle #2"
      />
      <AccordionCollapse eventKey="1">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </AccordionCollapse>
    </AccordionItem>
  </Accordion>
);

export const Separate = () => (
  <>
    <Accordion>
      <AccordionItem>
        <AccordionCustomToggle
          chevronLeft
          eventKey="0"
          helperText="helper text"
          label="3 Items Selected"
          title="Accordion Custom Toggle #1"
        />
        <AccordionCollapse eventKey="0">
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </AccordionCollapse>
      </AccordionItem>
    </Accordion>
    <Accordion>
      <AccordionItem>
        <AccordionCustomToggle
          chevronLeft
          eventKey="1"
          helperText="helper text"
          label="3 Items Selected"
          title="Accordion Custom Toggle #2"
        />
        <AccordionCollapse eventKey="1">
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </AccordionCollapse>
      </AccordionItem>
    </Accordion>
  </>
);
