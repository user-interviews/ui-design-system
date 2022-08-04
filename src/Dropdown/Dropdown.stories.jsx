import React from 'react';

import { boolean, select, withKnobs } from '@storybook/addon-knobs';

import Button from 'src/Button';
import {
 Dropdown, DropdownToggle, DropdownItem, DropdownMenu, DropdownCard,
} from 'src/Dropdown';
import { SingleSelect } from 'src/Select';

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

const DropdownMenuCustomContent = () => {
  const options1 = [
    { label: 'First project launched', value: 1 },
    { label: 'Last project launched', value: 2 },
  ];

  const options2 = [
    { label: 'Before', value: 1 },
    { label: 'After', value: 2 },
  ];

  return (
    <div style={{ minWidth: '450px' }}>
      <SingleSelect options={options1} />
      <div style={{ marginTop: '16px' }}>
        <SingleSelect options={options2} placeholder="Before" style={{ marginTop: '8px' }} />
        <div style={{
 display: 'flex', flexDirection: 'row', float: 'right', padding: '16px 0',
}}
        >
          <Button variant="transparent">Cancel</Button>
          <Button style={{ marginLeft: '8px' }} variant="primary">Apply</Button>
        </div>
      </div>
    </div>
  );
};

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
        <DropdownCard title="Filter on participants">
          {DropdownMenuCustomContent()}
        </DropdownCard>
      </DropdownMenu>
    </Dropdown>
  </div>
  );
