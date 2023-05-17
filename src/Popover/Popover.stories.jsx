import React, { useState } from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';

import Button from 'src/Button';
import FormGroup from 'src/FormGroup';
import Input from 'src/Input';

import { OverlayTrigger, OVERLAY_TRIGGER_PLACEMENT } from 'src/OverlayTrigger';
import { Popover, PopoverBody, PopoverCard } from 'src/Popover';

import mdx from './Popover.mdx';

export default {
  title: 'Components/Popover',
  component: Popover,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <OverlayTrigger
    overlay={(
      <Popover id="popover-basic">
        <PopoverBody>
          This is the default Popover body.
        </PopoverBody>
      </Popover>
    )}
    placement={select('placement', OVERLAY_TRIGGER_PLACEMENT, 'auto')}
    trigger="click"
  >
    <Button variant="primary">Filter</Button>
  </OverlayTrigger>
);

export const Placement = () => (
  <OverlayTrigger
    overlay={(
      <Popover id="popover-basic">
        <PopoverBody>
          This is the default Popover body.
        </PopoverBody>
      </Popover>
    )}
    placement={select('placement', OVERLAY_TRIGGER_PLACEMENT, 'bottom')}
    trigger="click"
  >
    <Button variant="primary">Try different placements</Button>
  </OverlayTrigger>
);

export const CardPopover = () => {
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
            size={select('size', ['sm', 'md'], 'sm')}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Popover with Card styling</h3>
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
            <div style={{ display: 'flex', justifyContent: 'right', marginTop: '1rem' }}>
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
};
