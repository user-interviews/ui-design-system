import React from 'react';

import Button from 'src/Button';

import { faEnvelope } from '@fortawesome/pro-regular-svg-icons';
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';
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

export const Default = () => (
  <>
    <div>
      <Button variant="primary">Primary</Button>{' '}
      <Button variant="secondary">Secondary</Button>{' '}
      <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
      <Button variant="link">Link</Button>
    </div>
    <br />
    <div>
      <Button variant="outline-primary">Primary</Button>{' '}
      <Button variant="outline-secondary">Secondary</Button>{' '}
      {/* <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
      <Button variant="link">Link</Button> */}
    </div>
    <br />
    <div>
      <Button variant="link">Primary</Button>{' '}
      <Button variant="link">Secondary</Button>{' '}
      {/* <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
      <Button variant="link">Link</Button> */}
    </div>
  </>
);

export const WithLeadingIcon = () => (
  <>
    <div>
      <Button leadingIcon={faEnvelope} variant="primary">Primary</Button>{' '}
      <Button leadingIcon={faEnvelope} variant="secondary">Secondary</Button>{' '}
      {/* <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
      <Button variant="link">Link</Button> */}
    </div>
  </>
  );

export const WithTrailingIcon = () => (
  <>
    <div>
      <Button trailingIcon={faCaretDown} variant="primary">Primary</Button>{' '}
      <Button trailingIcon={faCaretDown} variant="secondary">Secondary</Button>{' '}
      {/* <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
      <Button variant="link">Link</Button> */}
    </div>
  </>
  );

export const Sizes = () => (
  <>
    <div>
      <Button size="sm" variant="primary">Primary</Button>{' '}
      <Button size="md" variant="primary">Primary</Button>{' '}
      <Button size="lg" variant="primary">Primary</Button>{' '}
    </div>
    <br />
    <div>
      <Button size="sm" variant="secondary">Primary</Button>{' '}
      <Button size="md" variant="secondary">Primary</Button>{' '}
      <Button size="lg" variant="secondary">Primary</Button>{' '}
    </div>
  </>
  );
