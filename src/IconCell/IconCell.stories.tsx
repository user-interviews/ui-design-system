import React from 'react';

import {
 faGlobe, faMailbox, faPaperPlane, faStar, faUser,
} from '../font_awesome/regular';

import IconCell from '.';
import mdx from './IconCell.mdx';

export default {
  title: 'Deprecated/IconCell',
  component: IconCell,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export function Default() {
  return (
    <div>
      <IconCell icon={faGlobe} />
      <IconCell icon={faMailbox} />
      <IconCell icon={faUser} />
      <IconCell icon={faPaperPlane} />
      <IconCell icon={faStar} />
    </div>
  );
}
