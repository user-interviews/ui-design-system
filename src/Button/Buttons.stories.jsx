import React from 'react';

import Button from 'src/Button';
import { faFileAlt, faCaretDown } from '@fortawesome/pro-regular-svg-icons';
import mdx from './Button.mdx';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Primary = () => (
  <>
    <Button
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="outline-primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="outline-primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="primary"
    >
      Confirm
    </Button>
  </>
);

export const Danger = () => (
  <>
    <Button
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="danger"
    >
      Delete
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="outline-danger"
    >
      Delete
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="danger"
    >
      Delete
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="danger"
    >
      Delete
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="outline-danger"
    >
      Delete
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="danger"
    >
      Delete
    </Button>
  </>
);

export const Warning = () => (
  <>
    <Button
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="warning"
    >
      Edit
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="outline-warning"
    >
      Edit
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="warning"
    >
      Edit
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="warning"
    >
      Edit
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="outline-warning"
    >
      Edit
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="warning"
    >
      Edit
    </Button>
  </>
);

export const Transparent = () => (
  <>
    <Button
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="transparent"
    >
      Skip
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="outline-transparent"
    >
      Skip
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="transparent"
    >
      Skip
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="transparent"
    >
      Skip
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="outline-transparent"
    >
      Skip
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="transparent"
    >
      Skip
    </Button>
  </>
);
