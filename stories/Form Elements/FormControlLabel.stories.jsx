import React from 'react';

import FormControlLabel from 'src/FormControlLabel';

export default {
  title: 'Design System/Form Elements/Form Control Label',
  component: FormControlLabel,
};

export const Checkbox = () => (
  <FormControlLabel
    labelHtmlFor="checkbox"
    text="Labeled checkbox"
  >
    <input id="checkbox" name="checkbox" type="checkbox" />
  </FormControlLabel>
);
