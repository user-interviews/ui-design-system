import React from 'react';

import 'jquery';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';

import KebabDropdown from 'src/KebabDropdown';

export default {
  title: 'Design System/KebabDropdown',
  component: KebabDropdown,
};

export const Default = () => (
  <KebabDropdown ariaLabel="Test Options">
    <div>Hello World!</div>
  </KebabDropdown>
);
