import React, { useRef, useState } from 'react';
import CheckboxButton, { CHECKED_STATES } from 'src/CheckboxButton';
import FormControlLabel from 'src/FormControlLabel';

import mdx from './CheckboxButton.mdx';

export default {
  title: 'Components/CheckboxButton',
  component: CheckboxButton,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const [isChecked, setIsChecked] = useState(CHECKED_STATES.CHECKED);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <CheckboxButton
      checked={isChecked}
      className="checkbox"
      disabled={false}
      id="1"
      type="checkbox"
      value={1}
      onChange={handleChange}
    />
  );
};

export const Indeterminate = () => {
  const inputEl = useRef(null);
  const [checked, setChecked] = useState<string[]>([]);
  const checkboxes = ['1', '2', '3'];

  const onCheckAll = (event) => {
    if (event.target.checked) {
      setChecked(checkboxes);
    } else {
      setChecked([]);
    }
  };

  const onCheck = (event, value) => {
    if (event.target.checked) {
      setChecked([...checked, value]);
    } else {
      setChecked(checked.filter((item) => item !== value));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
      <CheckboxButton
        checked={checked.length === 3}
        id="select-all"
        indeterminate={checked.length > 0 && checked.length < 3}
        ref={inputEl}
        onChange={onCheckAll}
      />
      {checkboxes.map((item) => (
        <CheckboxButton
          checked={checked.includes(item)}
          id={item}
          key={item}
          value={item}
          onChange={(e) => onCheck(e, item)}
        />
      ))}
    </div>
  );
};

export const WithDescription = () => {
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => {
    setChecked(!checked);
  };

  return (
    <FormControlLabel
      bordered
      checked={checked}
      Control={CheckboxButton}
      id="value-2"
      text="Label 2"
      value="2"
      onClick={toggleChecked}
    >
      This is where the description goes
    </FormControlLabel>
  );
};
