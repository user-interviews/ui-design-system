import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, text } from '@storybook/addon-knobs';

import FormControl from '../src/FormControl/FormControl';

const withPadding = (story) => <div style={{ padding: '1rem' }}>{story()}</div>;

export default {
  title: 'Design System/Form Control',
  component: FormControl,
  decorators: [withA11y, withKnobs, withPadding],
};

export const Default = () => (
  <FormControl>
    <input className="form-control" type="text" />
  </FormControl>
);

export const Disabled = () => (
  <FormControl>
    <input disabled className="form-control" type="text" />
  </FormControl>
);

export const WithDescription = () => (
  <FormControl
    description={text('Description text', 'test description')}
    label="Form Group with description"
    labelHtmlFor="input"
  >
    <input className="form-control" name="input" type="text" />
  </FormControl>
);

export const WithErrors = () => (
  <FormControl
    displayErrorText
    errors={{ test: ['invalid input!'] }}
    inputKey="test"
    label="Form Group with errors"
  >
    <input className="form-control" type="text" />
  </FormControl>
);

export const WithDescriptionAndErrors = () => (
  <FormControl
    description={text('Description text', 'test description')}
    displayErrorText
    errors={{ test: ['invalid input!'] }}
    inputKey="test"
    label="Form Group with errors"
  >
    <input className="form-control" type="text" />
  </FormControl>
);
