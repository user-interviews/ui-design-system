import React from 'react';

import {
 faGlobe, faMailbox, faPaperPlane, faStar, faUser,
} from '@fortawesome/pro-regular-svg-icons';

import IconCell from '.';
import mdx from './IconCell.mdx';

export default {
  title: 'Components/IconCell',
  component: IconCell,
  parameters: {
    docs: {
      page: mdx,
    },
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
