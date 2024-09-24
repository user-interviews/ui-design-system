import React from 'react';

import {
 faEllipsisV, faFileAlt, faChevronDown, faTag, faEnvelope, faTrashAlt,
} from 'src/font_awesome/regular';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 Dropdown, DropdownDivider, DropdownToggle, DropdownItem, DropdownMenu,
} from '.';
import mdx from './Dropdown.mdx';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      page: mdx,
    },
    a11y: {},
  },
};

export function Default() {
  return (
    <>
      <Dropdown>
        <DropdownToggle leadingIcon={faFileAlt}>
          Dropdown toggle
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="#" leadingIcon={faTag}>Add label</DropdownItem>
          <DropdownItem href="#" leadingIcon={faEnvelope}>Compose email</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <br />
      <Dropdown>
        <DropdownToggle leadingIcon={faFileAlt} variant="outline-primary">
          Dropdown toggle
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="#" leadingIcon={faTag}>Add label</DropdownItem>
          <DropdownItem href="#" leadingIcon={faEnvelope}>Compose email</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export function Sizes() {
  return (
    <>
      <Dropdown>
        <DropdownToggle size="sm" variant="outline-primary">
          Small toggle
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="#" leadingIcon={faTag}>Add label</DropdownItem>
          <DropdownItem href="#" leadingIcon={faEnvelope}>Compose email</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <br />
      <Dropdown>
        <DropdownToggle size="lg" variant="outline-primary">
          Large toggle
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="#" leadingIcon={faTag}>Add label</DropdownItem>
          <DropdownItem href="#" leadingIcon={faEnvelope}>Compose email</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export function IconDefault() {
  return (
    <Dropdown>
      <DropdownToggle ariaLabel="dropdown toggle" variant="transparent" />
      <DropdownMenu>
        <DropdownItem href="#" leadingIcon={faTag}>Add label</DropdownItem>
        <DropdownItem href="#" leadingIcon={faEnvelope}>Compose email</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export function IconSwap() {
  return (
    <Dropdown>
      <DropdownToggle ariaLabel="dropdown toggle ellipsis" removeCaret variant="transparent">
        <FontAwesomeIcon icon={faEllipsisV} size="lg" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href="#" leadingIcon={faTag}>Add label</DropdownItem>
        <DropdownItem href="#" leadingIcon={faEnvelope}>Compose email</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export function UnstyledToggle() {
  return (
    <Dropdown>
      <DropdownToggle removeCaret unstyled>
        <div style={{
        padding: '12px',
        backgroundColor: '#444444',
        width: '200px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
  );
}

export function WithDivider() {
  return (
    <Dropdown>
      <DropdownToggle leadingIcon={faFileAlt} variant="primary">
        Dropdown toggle
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href="#" leadingIcon={faTag}>Add label</DropdownItem>
        <DropdownItem href="#" leadingIcon={faEnvelope}>Compose email</DropdownItem>
        <DropdownDivider />
        <DropdownItem href="#" leadingIcon={faTrashAlt} variant="danger">Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
