import React from 'react';

import {
 Dropdown, DropdownToggle, DropdownItem, DropdownMenu,
} from 'src/Dropdown';

import mdx from './Dropdown.mdx';

export default {
  title: 'Design System/Dropdown',
  component: Dropdown,
  subcomponents: {
    DropdownToggle, DropdownItem, DropdownMenu,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <>
    <Dropdown>
      <DropdownToggle variant="primary">
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
      <DropdownToggle variant="outline-primary">
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
