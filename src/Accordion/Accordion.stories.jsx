import React from 'react';

import { Accordion, AccordionBody, AccordionHeader } from 'src/Accordion';

import { faCheckCircle } from '@fortawesome/pro-regular-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-solid-svg-icons';
import mdx from './Accordion.mdx';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/global.scss';

export default {
  title: 'Design System/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Accordion defaultCollapsed>
    <AccordionHeader
      collapsedIcon={faChevronDown}
      expandedIcon={faChevronUp}
      helperText="(helper text)"
      label="LABEL"
      leadingIcon={faCheckCircle}
      title="Title"
    />
    <AccordionBody>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </AccordionBody>
  </Accordion>
  );

export const Borderless = () => (
  <Accordion borderless defaultCollapsed>
    <AccordionHeader
      collapsedIcon={faChevronDown}
      expandedIcon={faChevronUp}
      helperText="(helper text)"
      label="LABEL"
      leadingIcon={faCheckCircle}
      title="Title"
    />
    <AccordionBody borderless>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </AccordionBody>
  </Accordion>
  );
