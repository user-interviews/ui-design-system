import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionToggle,
  AccordionCollapse,
} from 'src/Accordion';

import Card from 'src/Card';

import { faCreditCard } from '@fortawesome/pro-regular-svg-icons';

import mdx from './Accordion.mdx';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: {
    AccordionItem, AccordionToggle, AccordionCollapse,
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
      <AccordionToggle
        eventKey="0"
        helperText="helper text"
        label="3 Items Selected"
        leadingIcon={faCreditCard}
        title="Accordion Toggle #1"
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
      <AccordionToggle
        eventKey="1"
        helperText="helper text"
        label="3 Items Selected"
        leadingIcon={faCreditCard}
        title="Accordion Toggle #2"
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
      <AccordionToggle
        eventKey="0"
        helperText="helper text"
        label="3 Items Selected"
        leadingIcon={faCreditCard}
        title="Accordion Toggle #1"
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
      <AccordionToggle
        eventKey="1"
        helperText="helper text"
        label="3 Items Selected"
        leadingIcon={faCreditCard}
        title="Accordion Toggle #2"
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
      <AccordionToggle
        chevronLeft
        eventKey="0"
        helperText="helper text"
        label="3 Items Selected"
        title="Accordion Toggle #1"
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
      <AccordionToggle
        chevronLeft
        eventKey="1"
        helperText="helper text"
        label="3 Items Selected"
        title="Accordion Toggle #2"
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

export const Borderless = () => (
  <Accordion flush>
    <AccordionItem borderless>
      <AccordionToggle
        eventKey="0"
        helperText="helper text"
        label="3 Items Selected"
        leadingIcon={faCreditCard}
        title="Accordion Toggle #1"
      />
      <AccordionCollapse eventKey="0">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </AccordionCollapse>
    </AccordionItem>
    <AccordionItem borderless>
      <AccordionToggle
        eventKey="1"
        helperText="helper text"
        label="3 Items Selected"
        leadingIcon={faCreditCard}
        title="Accordion Toggle #2"
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

export const InCard = () => (
  <Card noPadding>
    <Accordion flush>
      <AccordionItem borderless>
        <AccordionToggle
          eventKey="0"
          helperText="helper text"
          label="3 Items Selected"
          leadingIcon={faCreditCard}
          title="Accordion Toggle #1"
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
  </Card>
);

export const Separate = () => (
  <>
    <Accordion>
      <AccordionItem>
        <AccordionToggle
          eventKey="0"
          helperText="helper text"
          label="3 Items Selected"
          title="Accordion Toggle #1"
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
        <AccordionToggle
          eventKey="1"
          helperText="helper text"
          label="3 Items Selected"
          title="Accordion Toggle #2"
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
      <AccordionToggle
        disabled
        eventKey="0"
        helperText="helper text"
        label="3 Items Selected"
        title="Accordion Toggle -- Disabled"
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
      <AccordionToggle
        eventKey="1"
        helperText="helper text"
        label="3 Items Selected"
        title="Accordion Toggle #2"
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
