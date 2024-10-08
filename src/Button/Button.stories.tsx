import React from 'react';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFileAlt, faCaretDown, faPaperPlane } from '../font_awesome/regular';
import {
 faGoogle, faFacebook, faLinkedin, faTwitter,
} from '../font_awesome/brands';
import Button from '.';
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

export function Primary() {
  return (
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
}

export function Tertiary() {
  return (
    <>
      <Button
        leadingIcon={faFileAlt as IconDefinition}
        size="sm"
        trailingIcon={faCaretDown as IconDefinition}
        variant="tertiary"
      >
        Confirm
      </Button>
      {' '}
      <Button
        disabled
        leadingIcon={faFileAlt as IconDefinition}
        size="sm"
        trailingIcon={faCaretDown as IconDefinition}
        variant="tertiary"
      >
        Confirm
      </Button>
      {' '}
      <Button
        leadingIcon={faFileAlt as IconDefinition}
        trailingIcon={faCaretDown as IconDefinition}
        variant="tertiary"
      >
        Confirm
      </Button>
      {' '}
      <Button
        disabled
        leadingIcon={faFileAlt as IconDefinition}
        trailingIcon={faCaretDown as IconDefinition}
        variant="tertiary"
      >
        Confirm
      </Button>
    </>
  );
}

export function Transparent() {
  return (
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
}

export function Link() {
  return (
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
}

export function Brands() {
  return (
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
}

export function Loading() {
  return (
    <>
      <Button
        isLoading
        leadingIcon={faFileAlt as IconDefinition}
        loadingText="Loading..."
        size="sm"
        variant="primary"
      >
        Confirm
      </Button>
      {' '}
      <Button
        isLoading
        leadingIcon={faFileAlt as IconDefinition}
        loadingText="Loading..."
        size="sm"
        variant="outline-primary"
      >
        Confirm
      </Button>
      {' '}
      <Button
        isLoading
        leadingIcon={faFileAlt as IconDefinition}
        loadingText="Loading..."
        variant="primary"
      >
        Confirm
      </Button>
      {' '}
      <Button
        isLoading
        leadingIcon={faFileAlt as IconDefinition}
        loadingText="Loading..."
        variant="outline-primary"
      >
        Confirm
      </Button>
    </>
  );
}
