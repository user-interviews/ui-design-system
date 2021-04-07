import React from 'react';
import Button from 'src/Button';
import { faCaretDown, faCog, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import mdx from './Button.mdx';

export default {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <div>
    <div>
      <h6>Default</h6>
      <Button type="button">Apply</Button>
    </div>
    <div>
      <h6>Disabled</h6>
      <Button disabledtype="submit">Submit</Button>
    </div>
    <div>
      <h6>Start Icon</h6>
      <Button startIcon={faPencilAlt} type="button">Edit</Button>
    </div>
    <div>
      <h6>End Icon</h6>
      <Button endIcon={faCaretDown} startIcon={faCog} type="button">Settings</Button>
    </div>
  </div>
);
