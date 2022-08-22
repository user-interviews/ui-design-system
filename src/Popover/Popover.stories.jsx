import React from 'react';

import { Button as BSButton } from 'react-bootstrap';
import Button from 'src/Button';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Popover from 'react-bootstrap/Popover';

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

// export const Default = () => (
//   <>
//     <OverlayTrigger trigger="click" placement="bottom" overlay={popover()}>
//       <Button variant="primary" >Click me to see</Button>
//     </OverlayTrigger>
//     <br></br>
//     <OverlayTrigger trigger="click" placement="bottom" overlay={popover()}>
//       <BSButton variant="success">Click me to see</BSButton>
//     </OverlayTrigger>
//   </>
// );

export const Test = () => (
  <OverlayTrigger overlay={popover} placement="bottom" trigger="click">
    <Button variant="primary">Click me to see</Button>
  </OverlayTrigger>
);
