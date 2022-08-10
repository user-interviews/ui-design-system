import React from 'react';

import { boolean, select, withKnobs } from '@storybook/addon-knobs';

import { CardSizes } from 'src/Card';
import {
 Dropdown, DropdownToggle, DropdownItem, DropdownMenu, DropdownCard,
} from 'src/Dropdown';

import { faEllipsisV, faFileAlt } from '@fortawesome/pro-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/pro-regular-svg-icons';
import mdx from './Dropdown.mdx';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  decorators: [withKnobs],
  subcomponents: {
    DropdownToggle, DropdownItem, DropdownMenu, DropdownCard,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    a11y: {},
  },
};

export const Default = () => (
  <>
    <Dropdown>
      <DropdownToggle leadingIcon={faFileAlt} variant="primary">
        Dropdown toggle
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href="#">Action</DropdownItem>
        <DropdownItem href="#">Another action</DropdownItem>
        <DropdownItem href="#">Click me</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <br />
    <Dropdown>
      <DropdownToggle leadingIcon={faFileAlt} variant="outline-primary">
        Dropdown toggle
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href="#">Action</DropdownItem>
        <DropdownItem href="#">Another action</DropdownItem>
        <DropdownItem href="#">Click me</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </>
);

export const Sizes = () => (
  <>
    <Dropdown>
      <DropdownToggle size="sm" variant="outline-primary">
        Small toggle
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href="#">Action</DropdownItem>
        <DropdownItem href="#">Another action</DropdownItem>
        <DropdownItem href="#">Click me</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <br />
    <Dropdown>
      <DropdownToggle size="md" variant="outline-primary">
        Medium toggle
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href="#">Action</DropdownItem>
        <DropdownItem href="#">Another action</DropdownItem>
        <DropdownItem href="#">Click me</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </>
);

export const IconDefault = () => (
  <>
    <Dropdown>
      <DropdownToggle ariaLabel="dropdown toggle" variant="transparent" />
      <DropdownMenu>
        <DropdownItem href="#">Action</DropdownItem>
        <DropdownItem href="#">Another action</DropdownItem>
        <DropdownItem href="#">Click me</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </>
);

export const IconSwap = () => (
  <>
    <Dropdown>
      <DropdownToggle ariaLabel="dropdown toggle ellipsis" removeCaret variant="transparent">
        <FontAwesomeIcon icon={faEllipsisV} size="lg" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href="#">Action</DropdownItem>
        <DropdownItem href="#">Another action</DropdownItem>
        <DropdownItem href="#">Click me</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </>
);

export const DropdownMenuCard = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Dropdown autoClose={boolean('autoClose', true)}>
      <DropdownToggle
        removeCaret
        variant="outline-primary"
      >
        <FontAwesomeIcon className="icon-left" icon={faFilter} />
        Filter (8)
      </DropdownToggle>
      <DropdownMenu
        align={select('align', ['start', 'end'], 'end')}
        noPadding
      >
        <DropdownCard
          size={select('size', Object.values(CardSizes), 'sm')}
          title="DropdownCard title"
        >
          <div style={{ fontSize: '0.875rem' }}>
            <b>
              Our all-in-one research platform is your source of
              truth for participant management and replaces 5+ tools.
            </b>
            <ul>
              <li>Automate scheduling, messages, and annoying logistics</li>
              <li>Build your own panel to recruit for user research projects</li>
              <li>Track participant research activity in one place</li>
            </ul>
          </div>
        </DropdownCard>
      </DropdownMenu>
    </Dropdown>
  </div>
  );
