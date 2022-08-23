import React from 'react';

import Button from 'src/Button';

import { OverlayTrigger } from 'src/OverlayTrigger';
import { Popover, PopoverBody } from 'src/Popover';

export default {
  title: 'Components/Popover',
  component: Popover,
};

const popover = (props) => (
  <Popover id="popover-basic" style={{ boxShadow: '0rem 0.13rem 0.3rem rgba(0, 0, 0, 0.1)' }} {...props}>
    <PopoverBody>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </PopoverBody>
  </Popover>
);

export const Default = () => (
  <OverlayTrigger overlay={popover} placement="bottom" trigger="click">
    <Button variant="primary">Click me to see</Button>
  </OverlayTrigger>
);
