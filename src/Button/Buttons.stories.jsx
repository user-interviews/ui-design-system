import React from 'react';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';

import Button from 'src/Button';
import { faFileAlt, faCaretDown, faPaperPlane } from '@fortawesome/pro-regular-svg-icons';
import {
 faGoogle, faFacebook, faLinkedin, faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import mdx from './Button.mdx';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [withKnobs],
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
      disabled
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="outline-primary"
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
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="outline-primary"
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
    <Button
      disabled
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="outline-danger"
    >
      Delete
    </Button>
    {' '}
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
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="outline-danger"
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
      disabled
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="outline-warning"
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
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="outline-warning"
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
      disabled
      leadingIcon={faFileAlt}
      size="sm"
      trailingIcon={faCaretDown}
      variant="outline-transparent"
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
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt}
      size="md"
      trailingIcon={faCaretDown}
      variant="outline-transparent"
    >
      Skip
    </Button>
  </>
);

export const Link = () => (
  <>
    <Button
      size="sm"
      variant="link"
    >
      Send
    </Button>
    {' '}
    <Button
      leadingIcon={faPaperPlane}
      size="sm"
      variant="link"
    >
      Send
    </Button>
    {' '}
    <Button
      disabled
      size="sm"
      variant="link"
    >
      Send
    </Button>
  </>
);

export const Brands = () => (
  <>
    <Button
      leadingIcon={faGoogle}
      size="sm"
      variant="brand-google"
    >
      Google
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faGoogle}
      size="sm"
      variant="brand-google"
    >
      Google
    </Button>
    {' '}
    <Button
      leadingIcon={faGoogle}
      size="md"
      variant="brand-google"
    >
      Google
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faGoogle}
      size="md"
      variant="brand-google"
    >
      Google
    </Button>
    <div style={{ margin: '.5rem' }} />
    <Button
      leadingIcon={faFacebook}
      size="sm"
      variant="brand-facebook"
    >
      Facebook
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFacebook}
      size="sm"
      variant="brand-facebook"
    >
      Facebook
    </Button>
    {' '}
    <Button
      leadingIcon={faFacebook}
      size="md"
      variant="brand-facebook"
    >
      Facebook
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFacebook}
      size="md"
      variant="brand-facebook"
    >
      Facebook
    </Button>
    {' '}
    <div style={{ margin: '.5rem' }} />
    <Button
      leadingIcon={faLinkedin}
      size="sm"
      variant="brand-linkedin"
    >
      LinkedIn
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faLinkedin}
      size="sm"
      variant="brand-linkedin"
    >
      LinkedIn
    </Button>
    {' '}
    <Button
      leadingIcon={faLinkedin}
      size="md"
      variant="brand-linkedin"
    >
      LinkedIn
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faLinkedin}
      size="md"
      variant="brand-linkedin"
    >
      LinkedIn
    </Button>
    <div style={{ margin: '.5rem' }} />
    <Button
      leadingIcon={faTwitter}
      size="sm"
      variant="brand-twitter"
    >
      Twitter
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faTwitter}
      size="sm"
      variant="brand-twitter"
    >
      Twitter
    </Button>
    {' '}
    <Button
      leadingIcon={faTwitter}
      size="md"
      variant="brand-twitter"
    >
      Twitter
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faTwitter}
      size="md"
      variant="brand-twitter"
    >
      Twitter
    </Button>
  </>
);

export const Loading = () => (
  <>
    <Button
      isLoading={boolean('isLoading', true)}
      leadingIcon={faFileAlt}
      loadingText={text('loadingText')}
      size="sm"
      variant="primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      isLoading={boolean('isLoading', true)}
      leadingIcon={faFileAlt}
      loadingText={text('loadingText')}
      size="sm"
      variant="outline-primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      isLoading={boolean('isLoading', true)}
      leadingIcon={faFileAlt}
      loadingText={text('loadingText')}
      size="md"
      variant="primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      isLoading={boolean('isLoading', true)}
      leadingIcon={faFileAlt}
      loadingText={text('loadingText')}
      size="md"
      variant="outline-primary"
    >
      Confirm
    </Button>
  </>
);
