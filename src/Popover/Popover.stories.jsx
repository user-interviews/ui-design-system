import React, { useState } from 'react';

import Button from 'src/Button';
import FormGroup from 'src/FormGroup';
import Input from 'src/Input';

import { OverlayTrigger } from 'src/OverlayTrigger';
import { Popover, PopoverBody } from 'src/Popover';

import mdx from './Popover.mdx';

export default {
  title: 'Components/Popover',
  component: Popover,
  subcomponents: {
    PopoverBody, OverlayTrigger,
  },
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
          The is the default Popover body.
        </PopoverBody>
      </Popover>
    )}
    placement="bottom"
    trigger="click"
  >
    <Button variant="primary">Filter</Button>
  </OverlayTrigger>
);

export const Card = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <OverlayTrigger
      overlay={(
        <Popover id="popover-basic" style={{ minWidth: '30rem' }}>
          <PopoverBody variant="card">
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
          </PopoverBody>
        </Popover>
      )}
      placement="bottom"
      show={isOpen}
      trigger="click"
    >
      <Button variant="outline-primary" onClick={handleOpen}>Filter</Button>
    </OverlayTrigger>
  );
};
