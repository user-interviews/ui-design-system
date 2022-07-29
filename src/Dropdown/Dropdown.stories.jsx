import React from 'react';

import {
 Dropdown, DropdownToggle, DropdownItem, DropdownMenu,
} from 'src/Dropdown';
import { faEllipsisV, faFileAlt, faChevronDown } from '@fortawesome/pro-solid-svg-icons';

import Avatar from 'src/Avatar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export const CustomPOC = () => (
  <>
    <Dropdown>
      <DropdownToggle custom removeCaret>
        <div style={{
 padding: '12px', backgroundColor: '#444444', width: '200px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
}}
        >
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700' }}>Team A</div>
            <div style={{ fontSize: '12px', fontWeight: '400', backgroundColor: '#444444' }}>Organization</div>
          </div>
          <div style={{ marginRight: '4px' }}>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href="#">Team A</DropdownItem>
        <DropdownItem href="#">Team B</DropdownItem>
        <DropdownItem href="#">Team C</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <br />
    <Dropdown>
      <DropdownToggle custom removeCaret>
        <div style={{
 padding: '12px', backgroundColor: '#444444', width: '300px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
}}
        >
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Avatar image="https://i.pinimg.com/originals/84/b9/3c/84b93c89b807c6a4917deb49beeaee20.jpg" />
            <div style={{ flexDirection: 'column', marginLeft: '0.875rem' }}>
              <div style={{ fontSize: '18px', fontWeight: '700' }}>Dunder Mifflin, Inc.</div>
              <div style={{ fontSize: '12px', fontWeight: '400', backgroundColor: '#444444' }}>Scranton</div>
            </div>
          </div>
          <div style={{ marginRight: '4px' }}>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href="#">New York City (HQ)</DropdownItem>
        <DropdownItem href="#">Akron</DropdownItem>
        <DropdownItem href="#">Albany</DropdownItem>
        <DropdownItem href="#">Binghampton</DropdownItem>
        <DropdownItem href="#">Buffalo</DropdownItem>
        <DropdownItem href="#">Camden</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </>
);
