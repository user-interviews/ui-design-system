import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import FormControlLabel from 'src/FormControlLabel';
import CheckboxButton from 'src/CheckboxButton';

export default {
  title: 'Design System/Form Elements/Form Control Label',
  component: FormControlLabel,
  decorators: [withKnobs()],
};

export const Checkbox = () => (
  <FormControlLabel
    bordered={boolean('Bordered button', false)}
    Control={CheckboxButton}
    defaultValue="1"
    id="checkbox"
    name="checkbox"
    text="Labeled checkbox"
    type="checkbox"
  />
);
