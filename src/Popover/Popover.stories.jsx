import React from 'react';

import Button from 'src/Button';

import { OverlayTrigger } from 'src/OverlayTrigger';
import { Popover, PopoverBody } from 'src/Popover';

export default {
  title: 'Components/Popover',
  component: Popover,
};

const popover = (props) => (
  <Popover id="popover-basic" {...props}>
    <PopoverBody>
      <div style={{ fontSize: '0.875rem' }}>
        <div style={{ fontSize: '1rem', fontWeight: '700' }}>Filter on participants</div>
        <ul>
          <li>Automate scheduling, messages, and annoying logistics</li>
          <li>Build your own panel to recruit for user research projects</li>
          <li>Track participant research activity in one place</li>
        </ul>
      </div>
    </PopoverBody>
  </Popover>
);

export const Default = () => (
  <OverlayTrigger overlay={popover} placement="bottom" trigger="click">
    <Button variant="primary">Filter</Button>
  </OverlayTrigger>
);
