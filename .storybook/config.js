import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/global.scss';

addDecorator(withA11y);
addDecorator(story => (
  <>
    {story()}
  </>
));

// automatically import all files ending in *.stories.jsx
configure(require.context('../stories', true, /\.stories\.jsx$/), module);
