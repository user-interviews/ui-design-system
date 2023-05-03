import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';

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
  decorators: [withKnobs],
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
        chevronLeft={boolean('chevronLeft', false)}
        disabled={boolean('disabled', false)}
        eventKey="0"
        helperText={text('helperText', 'helper text')}
        leadingIcon={faCreditCard}
        title={text('title', 'Accordion Toggle')}
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
        chevronLeft={boolean('chevronLeft', false)}
        disabled={boolean('disabled', false)}
        eventKey="1"
        helperText={text('helperText', 'helper text')}
        leadingIcon={faCreditCard}
        title={text('title', 'Accordion Toggle')}
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
        chevronLeft={boolean('chevronLeft', false)}
        disabled={boolean('disabled', false)}
        eventKey="0"
        helperText={text('helperText', 'helper text')}
        leadingIcon={faCreditCard}
        title={text('title', 'Accordion Toggle')}
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
        chevronLeft={boolean('chevronLeft', false)}
        disabled={boolean('disabled', false)}
        eventKey="1"
        helperText={text('helperText', 'helper text')}
        leadingIcon={faCreditCard}
        title={text('title', 'Accordion Toggle')}
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
        chevronLeft={boolean('chevronLeft', true)}
        disabled={boolean('disabled', false)}
        eventKey="0"
        helperText={text('helperText', 'helper text')}
        title={text('title', 'Accordion Toggle')}
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
        chevronLeft={boolean('chevronLeft', true)}
        disabled={boolean('disabled', false)}
        eventKey="1"
        helperText={text('helperText', 'helper text')}
        title={text('title', 'Accordion Toggle')}
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
        chevronLeft={boolean('chevronLeft', false)}
        disabled={boolean('disabled', false)}
        eventKey="0"
        helperText={text('helperText', 'helper text')}
        leadingIcon={faCreditCard}
        title={text('title', 'Accordion Toggle')}
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
        chevronLeft={boolean('chevronLeft', false)}
        disabled={boolean('disabled', false)}
        eventKey="1"
        helperText={text('helperText', 'helper text')}
        leadingIcon={faCreditCard}
        title={text('title', 'Accordion Toggle')}
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
  <>
    <Card noPadding>
      <Accordion defaultActiveKey="0" flush>
        <AccordionItem borderless>
          <AccordionToggle
            chevronLeft={boolean('chevronLeft', false)}
            disabled={boolean('disabled', false)}
            eventKey="0"
            helperText={text('helperText', 'with cardPadding')}
            title={text('title', 'Accordion Toggle')}
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

export const Separate = () => (
  <>
    <Accordion>
      <AccordionItem>
        <AccordionToggle
          chevronLeft={boolean('chevronLeft', false)}
          disabled={boolean('disabled', false)}
          eventKey="0"
          helperText={text('helperText', 'helper text')}
          title={text('title', 'Accordion Toggle')}
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
          chevronLeft={boolean('chevronLeft', false)}
          disabled={boolean('disabled', false)}
          eventKey="1"
          helperText={text('helperText', 'helper text')}
          title={text('title', 'Accordion Toggle')}
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
        chevronLeft={boolean('chevronLeft', false)}
        disabled={boolean('disabled', true)}
        eventKey="0"
        helperText={text('helperText', 'helper text')}
        title={text('title', 'Accordion Toggle -- disabled')}
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
