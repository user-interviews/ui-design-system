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
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => (
  <Accordion>
    <AccordionItem>
      <AccordionToggle
        eventKey="0"
        leadingIcon={faCreditCard}
        {...args}
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
        leadingIcon={faCreditCard}
        {...args}
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

Default.args = {
  chevronLeft: false,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export const DefaultOpen = (args) => (
  <Accordion defaultActiveKey="1">
    <AccordionItem>
      <AccordionToggle
        eventKey="0"
        leadingIcon={faCreditCard}
        {...args}
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
        leadingIcon={faCreditCard}
        {...args}
      />
      <AccordionCollapse eventKey="1">
        <ul>
          <li>I was opened by default!</li>
        </ul>
      </AccordionCollapse>
    </AccordionItem>
  </Accordion>
);

DefaultOpen.args = {
  chevronLeft: false,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export const ChevronLeft = (args) => (
  <Accordion>
    <AccordionItem>
      <AccordionToggle
        eventKey="0"
        {...args}
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
        {...args}
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

ChevronLeft.args = {
  chevronLeft: true,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export const ChevronLeftLateral = (args) => (
  <Accordion>
    <AccordionItem>
      <AccordionToggle
        eventKey="0"
        {...args}
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
        {...args}
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

ChevronLeftLateral.args = {
  chevronLateral: true,
  chevronLeft: true,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export const ChevronLateral = (args) => (
  <Accordion>
    <AccordionItem>
      <AccordionToggle
        eventKey="0"
        {...args}
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
        {...args}
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

ChevronLateral.args = {
  chevronLateral: true,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export const CollapsedText = (args) => (
  <Accordion defaultActiveKey="1">
    <AccordionItem>
      <AccordionToggle
        eventKey="0"
        {...args}
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
        {...args}
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

CollapsedText.args = {
  collapsedText: 'This shows only when collapsed',
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export const Borderless = (args) => (
  <Accordion flush>
    <AccordionItem borderless>
      <AccordionToggle
        eventKey="0"
        leadingIcon={faCreditCard}
        {...args}
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
        leadingIcon={faCreditCard}
        {...args}
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

Borderless.args = {
  chevronLeft: false,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export const InCard = (args) => (
  <>
    <Card noPadding>
      <Accordion defaultActiveKey="0" flush>
        <AccordionItem borderless>
          <AccordionToggle
            eventKey="0"
            {...args}
          />
          <AccordionCollapse
            eventKey="0"
          >
            <p>This text is aligned with the content of other Card components</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </AccordionCollapse>
        </AccordionItem>
      </Accordion>
    </Card>
    <br />
    <Card title="Card title" />
  </>
);

InCard.args = {
  chevronLeft: false,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export const Separate = (args) => (
  <>
    <Accordion>
      <AccordionItem>
        <AccordionToggle
          eventKey="0"
          {...args}
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
          {...args}
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

Separate.args = {
  chevronLeft: false,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export const Disabled = (args) => (
  <Accordion>
    <AccordionItem>
      <AccordionToggle
        eventKey="0"
        {...args}
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
);

Disabled.args = {
  chevronLeft: false,
  disabled: true,
  helperText: 'helper text',
  title: 'Accordion Toggle -- disabled',
};
