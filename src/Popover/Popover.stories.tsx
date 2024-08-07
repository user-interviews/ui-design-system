import React, { useState } from 'react';

import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';

import { OverlayTrigger } from '../OverlayTrigger';
import { Popover, PopoverBody, PopoverCard } from '.';

import mdx from './Popover.mdx';

export default {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export function Default() {
  return (
    <OverlayTrigger
      overlay={(
        <Popover id="popover-basic">
          <PopoverBody>
            This is the default Popover body.
          </PopoverBody>
        </Popover>
    )}
      placement="auto"
      trigger="click"
    >
      <Button variant="primary">Filter</Button>
    </OverlayTrigger>
  );
}

export function Placement() {
  return (
    <OverlayTrigger
      overlay={(
        <Popover id="popover-basic">
          <PopoverBody>
            This is the default Popover body.
          </PopoverBody>
        </Popover>
    )}
      placement="bottom"
      trigger="click"
    >
      <Button variant="primary">Try different placements</Button>
    </OverlayTrigger>
  );
}

export function CardPopover() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <OverlayTrigger
      overlay={(
        <Popover
          id="popover-basic"
        >
          <PopoverCard
            size="sm"
          >
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '24px' }}>Popover with Card styling</h3>
            <FormGroup
              label="Last project launched"
              labelHtmlFor="last-project-launched-input"
            >
              <Input
                id="last-project-launched-input"
                name="last-project-launched"
                placeholder="MM/DD/YYYY"
              />
            </FormGroup>
            <FormGroup
              label="Last applied date"
              labelHtmlFor="last-applied-date-input"
            >
              <Input
                id="last-applied-date-input"
                name="last-applied-date"
                placeholder="MM/DD/YYYY"
              />
            </FormGroup>
            <div style={{ display: 'flex', justifyContent: 'right', marginTop: '16px' }}>
              <Button variant="primary" onClick={handleOpen}>Apply</Button>
            </div>
          </PopoverCard>
        </Popover>
      )}
      placement="bottom"
      show={isOpen}
      trigger="click"
    >
      <Button variant="primary" onClick={handleOpen}>Filter</Button>
    </OverlayTrigger>
  );
}
