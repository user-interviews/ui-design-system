import React from 'react';

import {
 Dropdown, DropdownToggle, DropdownItem, DropdownMenu,
} from 'src/Dropdown';
import { SingleSelect } from 'src/Select';

import {
 faCog, faEllipsisV, faFileAlt, faUsers,
} from '@fortawesome/pro-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/pro-regular-svg-icons';
import mdx from './Dropdown.mdx';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  subcomponents: {
    DropdownToggle, DropdownItem, DropdownMenu,
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
    <div style={{ padding: '24px', minWidth: '500px' }}>
      <p style={{ fontWeight: 700 }}>Filter on participants</p>
      <SingleSelect options={options1} />
      <div style={{ marginTop: '16px' }}>
        <SingleSelect options={options2} placeholder="Before" style={{ marginTop: '8px' }} />
        <div style={{ marginTop: '16px' }}>...misc. content</div>
        <div>Anything can be put in this custom DropdownMenu</div>
      </div>
    </div>
  );
};

export const DropdownMenuCustom = () => (
  <div style={{ display: 'flex', flexDirection: 'row', float: 'right' }}>
    <Dropdown>
      <DropdownToggle
        removeCaret
        style={{ color: '#158D71' }}
        variant="transparent"
      >
        <FontAwesomeIcon className="icon-left" icon={faFilter} />
        Filter (8)
      </DropdownToggle>
      <DropdownMenu
        align="end"
        style={{
          border: '1px solid #e1e1e1',
          boxShadow: '0rem 0.13rem 0.3rem rgba(0, 0, 0, 0.1)',
        }}
      >
        {DropdownMenuCustomContent()}
      </DropdownMenu>
    </Dropdown>
    <Dropdown>
      <DropdownToggle style={{ color: '#158D71' }} variant="transparent">
        <FontAwesomeIcon className="icon-left" icon={faUsers} />
        Build
      </DropdownToggle>
    </Dropdown>
    <Dropdown>
      <DropdownToggle style={{ color: '#158D71' }} variant="transparent">
        <FontAwesomeIcon className="icon-left" icon={faCog} />
        Manage
      </DropdownToggle>
    </Dropdown>
  </div>
);
