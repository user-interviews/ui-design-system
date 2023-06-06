import React from 'react';

import {
 faChevronLeft, faChevronRight, faPencil, faTrashAlt,
} from '@fortawesome/pro-regular-svg-icons';
import IconButton from './IconButton';

import mdx from './IconButton.mdx';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <span>
    <IconButton ariaLabel="Previous" icon={faChevronLeft} />
    <IconButton ariaLabel="Next" icon={faChevronRight} />
    <IconButton ariaLabel="Delete" icon={faTrashAlt} />
    <IconButton ariaLabel="Edit" icon={faPencil} />
  </span>
);
