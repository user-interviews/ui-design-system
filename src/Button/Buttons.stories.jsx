import React from 'react';

import Button from 'src/Button';
import { faFileAlt, faCaretDown } from '@fortawesome/pro-solid-svg-icons';
import mdx from './Button.mdx';

export default {
  title: 'Design System/Button',
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

    <Button
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="primary"
    >
      Confirm
    </Button>

    <Button
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="outline-primary"
    >
      Confirm
    </Button>

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
      size="sm"
      variant="danger"
    >
      Delete
    </Button>

    <Button
      size="md"
      variant="danger"
    >
      Delete
    </Button>

    <Button
      size="md"
      variant="outline-danger"
    >
      Delete
    </Button>

    <Button
      disabled
      size="md"
      variant="danger"
    >
      Delete
    </Button>
  </>
);

export const Warning = () => (
  <>
    <Button
      size="sm"
      variant="warning"
    >
      Edit
    </Button>

    <Button
      size="md"
      variant="warning"
    >
      Edit
    </Button>

    <Button
      size="md"
      variant="outline-warning"
    >
      Edit
    </Button>

    <Button
      disabled
      size="md"
      variant="warning"
    >
      Edit
    </Button>
  </>
);
