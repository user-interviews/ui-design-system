import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  AccordionCustomToggle,
  AccordionCollapse,
} from 'src/Accordion';

import { faCreditCard } from '@fortawesome/pro-regular-svg-icons';

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
        eventKey="0"
        helperText="helper text"
        label="3 Items Selected"
        leadingIcon={faCreditCard}
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
        eventKey="1"
        helperText="helper text"
        label="3 Items Selected"
        leadingIcon={faCreditCard}
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

export const DefaultOpen = () => (
  <Accordion defaultActiveKey="1">
    <AccordionItem>
      <AccordionCustomToggle
        eventKey="0"
        helperText="helper text"
        label="3 Items Selected"
        leadingIcon={faCreditCard}
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
        eventKey="1"
        helperText="helper text"
        label="3 Items Selected"
        leadingIcon={faCreditCard}
        title="Accordion Custom Toggle #2"
      />
      <AccordionCollapse eventKey="1">
        <ul>
          <li>I was opened by default!</li>
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

export const Flush = () => (
  <Accordion flush>
    <AccordionItem>
      <AccordionCustomToggle
        eventKey="0"
        helperText="helper text"
        label="3 Items Selected"
        leadingIcon={faCreditCard}
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
        eventKey="1"
        helperText="helper text"
        label="3 Items Selected"
        leadingIcon={faCreditCard}
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
          eventKey="0"
          helperText="helper text"
          label="3 Items Selected"
          title="Accordion Custom Toggle #1"
        />
        <AccordionCollapse eventKey="0">
          <ul>
            <li>I'm inside my own Accordion parent element</li>
          </ul>
        </AccordionCollapse>
      </AccordionItem>
    </Accordion>
    <br />
    <Accordion>
      <AccordionItem>
        <AccordionCustomToggle
          eventKey="1"
          helperText="helper text"
          label="3 Items Selected"
          title="Accordion Custom Toggle #2"
        />
        <AccordionCollapse eventKey="1">
          <ul>
            <li>I'm inside my own Accordion parent element</li>
          </ul>
        </AccordionCollapse>
      </AccordionItem>
    </Accordion>
  </>
);

export const Disabled = () => (
  <Accordion>
    <AccordionItem>
      <AccordionCustomToggle
        disabled
        eventKey="0"
        helperText="helper text"
        label="3 Items Selected"
        title="Accordion Custom Toggle -- Disabled"
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
