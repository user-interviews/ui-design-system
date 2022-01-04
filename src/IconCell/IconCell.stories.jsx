import React from 'react';

import {
 faGlobe, faMailbox, faPaperPlane, faStar, faUser,
} from '@fortawesome/pro-regular-svg-icons';

import IconCell from 'src/IconCell';
import mdx from './IconCell.mdx';

export default {
  title: 'Design System/IconCell',
  component: IconCell,
  parameters: {
    docs: {
      page: mdx,
    },
    a11y: {},
  },
};

export const Default = () => (
  <div>
    <IconCell icon={faGlobe} />
    <IconCell icon={faMailbox} />
    <IconCell icon={faUser} />
    <IconCell icon={faPaperPlane} />
    <IconCell icon={faStar} />
  </div>
);
