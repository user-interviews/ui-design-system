import React from 'react';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';

import Button from 'src/Button';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
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
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-primary"
    >
      Confirm
    </Button>
  </>
);

export const Danger = () => (
  <>
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="danger"
    >
      Delete
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-danger"
    >
      Delete
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="danger"
    >
      Delete
    </Button>
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-danger"
    >
      Delete
    </Button>
    {' '}
    {' '}
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="danger"
    >
      Delete
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-danger"
    >
      Delete
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="danger"
    >
      Delete
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-danger"
    >
      Delete
    </Button>
  </>
);

export const Warning = () => (
  <>
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="warning"
    >
      Edit
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-warning"
      >
      Edit
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="warning"
    >
      Edit
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-warning"
    >
      Edit
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="warning"
    >
      Edit
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-warning"
    >
      Edit
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="warning"
    >
      Edit
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-warning"
    >
      Edit
    </Button>
  </>
);

export const Transparent = () => (
  <>
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="transparent"
    >
      Skip
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-transparent"
    >
      Skip
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="transparent"
    >
      Skip
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      size="sm"
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-transparent"
    >
      Skip
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="transparent"
    >
      Skip
    </Button>
    {' '}
    <Button
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="outline-transparent"
      >
      Skip
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
      variant="transparent"
    >
      Skip
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFileAlt as IconDefinition}
      trailingIcon={faCaretDown as IconDefinition}
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
      leadingIcon={faPaperPlane as IconDefinition}
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
      leadingIcon={faGoogle as IconDefinition}
      size="sm"
      variant="brand-google"
    >
      Google
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faGoogle as IconDefinition}
      size="sm"
      variant="brand-google"
    >
      Google
    </Button>
    {' '}
    <Button
      leadingIcon={faGoogle as IconDefinition}
      variant="brand-google"
    >
      Google
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faGoogle as IconDefinition}
      variant="brand-google"
    >
      Google
    </Button>
    <div style={{ margin: '8px' }} />
    <Button
      leadingIcon={faFacebook as IconDefinition}
      size="sm"
      variant="brand-facebook"
    >
      Facebook
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFacebook as IconDefinition}
      size="sm"
      variant="brand-facebook"
    >
      Facebook
    </Button>
    {' '}
    <Button
      leadingIcon={faFacebook as IconDefinition}
      variant="brand-facebook"
    >
      Facebook
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faFacebook as IconDefinition}
      variant="brand-facebook"
    >
      Facebook
    </Button>
    {' '}
    <div style={{ margin: '8px' }} />
    <Button
      leadingIcon={faLinkedin as IconDefinition}
      size="sm"
      variant="brand-linkedin"
    >
      LinkedIn
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faLinkedin as IconDefinition}
      size="sm"
      variant="brand-linkedin"
    >
      LinkedIn
    </Button>
    {' '}
    <Button
      leadingIcon={faLinkedin as IconDefinition}
      variant="brand-linkedin"
    >
      LinkedIn
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faLinkedin as IconDefinition}
      variant="brand-linkedin"
    >
      LinkedIn
    </Button>
    <div style={{ margin: '8px' }} />
    <Button
      leadingIcon={faTwitter as IconDefinition}
      size="sm"
      variant="brand-twitter"
    >
      Twitter
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faTwitter as IconDefinition}
      size="sm"
      variant="brand-twitter"
    >
      Twitter
    </Button>
    {' '}
    <Button
      leadingIcon={faTwitter as IconDefinition}
      variant="brand-twitter"
    >
      Twitter
    </Button>
    {' '}
    <Button
      disabled
      leadingIcon={faTwitter as IconDefinition}
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
      leadingIcon={faFileAlt as IconDefinition}
      loadingText={text('loadingText', 'Loading...')}
      size="sm"
      variant="primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      isLoading={boolean('isLoading', true)}
      leadingIcon={faFileAlt as IconDefinition}
      loadingText={text('loadingText', 'Loading...')}
      size="sm"
      variant="outline-primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      isLoading={boolean('isLoading', true)}
      leadingIcon={faFileAlt as IconDefinition}
      loadingText={text('loadingText', 'Loading...')}
      variant="primary"
    >
      Confirm
    </Button>
    {' '}
    <Button
      isLoading={boolean('isLoading', true)}
      leadingIcon={faFileAlt as IconDefinition}
      loadingText={text('loadingText', 'Loading...')}
      variant="outline-primary"
    >
      Confirm
    </Button>
  </>
);
