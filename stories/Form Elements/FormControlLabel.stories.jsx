import React from 'react';

import { CheckboxButton } from 'src/CheckboxButtonGroup';

export default {
  title: 'Design System/Form Elements/Form Control Label',
  component: CheckboxButton,
};

export const Checkbox = () => (
  <CheckboxButton
    defaultValue="1"
    id="checkbox"
    label="Labeled checkbox"
    name="checkbox"
    type="checkbox"
  />
);
