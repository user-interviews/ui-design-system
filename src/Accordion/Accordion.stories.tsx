import React from 'react';

import { faCreditCard } from '../font_awesome/regular';
import Card from '../Card';

import {
  Accordion,
  AccordionItem,
  AccordionToggle,
  AccordionCollapse,
} from '.';

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

export function Default(args) {
  return (
    <Accordion>
      <AccordionItem eventKey="0">
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
      <AccordionItem eventKey="1">
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
}

Default.args = {
  chevronLeft: false,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export function AlwaysOpen(args) {
  return (
    <Accordion alwaysOpen>
      <AccordionItem eventKey="0">
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
      <AccordionItem eventKey="1">
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
}

AlwaysOpen.args = {
  chevronLeft: false,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle - always open',
};

export function DefaultOpen(args) {
  return (
    <Accordion defaultActiveKey="1">
      <AccordionItem eventKey="0">
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
      <AccordionItem eventKey="1">
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
}

DefaultOpen.args = {
  chevronLeft: false,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export function ChevronLeft(args) {
  return (
    <Accordion>
      <AccordionItem eventKey="0">
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
      <AccordionItem eventKey="1">
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
}

ChevronLeft.args = {
  chevronLeft: true,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export function ChevronLeftLateral(args) {
  return (
    <Accordion>
      <AccordionItem eventKey="0">
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
      <AccordionItem eventKey="1">
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
}

ChevronLeftLateral.args = {
  chevronLateral: true,
  chevronLeft: true,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export function ChevronLateral(args) {
  return (
    <Accordion>
      <AccordionItem eventKey="0">
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
      <AccordionItem eventKey="1">
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
}

ChevronLateral.args = {
  chevronLateral: true,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export function CollapsedText(args) {
  return (
    <Accordion defaultActiveKey="1">
      <AccordionItem eventKey="0">
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
      <AccordionItem eventKey="1">
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
}

CollapsedText.args = {
  collapsedText: 'This shows only when collapsed',
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export function Borderless(args) {
  return (
    <Accordion flush>
      <AccordionItem borderless eventKey="0">
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
      <AccordionItem borderless eventKey="1">
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
}

Borderless.args = {
  chevronLeft: false,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export function BorderlessBorderBottomFlushToggles(args) {
  return (
    <Accordion flush>
      <AccordionItem borderless eventKey="0">
        <AccordionToggle
          borderBottom
          eventKey="0"
          flush
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
      <AccordionItem borderless eventKey="1">
        <AccordionToggle
          borderBottom
          eventKey="1"
          flush
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
}

BorderlessBorderBottomFlushToggles.args = {
  chevronLeft: false,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export function InCard(args) {
  return (
    <>
      <Card noPadding size="sm">
        <Accordion defaultActiveKey="0" flush>
          <AccordionItem borderless eventKey="0">
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
      <Card size="sm" title="Card title" />
    </>
  );
}

InCard.args = {
  chevronLeft: false,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export function Separate(args) {
  return (
    <>
      <Accordion>
        <AccordionItem eventKey="0">
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
        <AccordionItem eventKey="1">
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
}

Separate.args = {
  chevronLeft: false,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Toggle',
};

export function Disabled(args) {
  return (
    <Accordion>
      <AccordionItem eventKey="0">
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
}

Disabled.args = {
  chevronLeft: false,
  disabled: true,
  helperText: 'helper text',
  title: 'Accordion Toggle -- disabled',
};

export function AccordionAlert(args) {
  return (
    <Accordion>
      <AccordionItem borderless eventKey="0" variant="info">
        <AccordionToggle
          eventKey="0"
          {...args}
        />
        <AccordionCollapse eventKey="0" variant="info">
          <div>
            Add content here.
          </div>
        </AccordionCollapse>
      </AccordionItem>
    </Accordion>
  );
}

AccordionAlert.args = {
  chevronLateral: true,
  chevronLeft: true,
  disabled: false,
  helperText: 'helper text',
  title: 'Accordion Alert',
};
