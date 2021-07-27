import React, { Fragment } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Accordion, POSITION_RIGHT } from 'src/Accordion';
import mdx from './Accordion.mdx';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';

export default {
  title: 'Design System/Accordion',
  component: Accordion,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const AccordionLayout = ({ Header, Content }) => (
  <Fragment>
    {Content}
    {Header}
  </Fragment>
);

export const Default = () => (
  <Accordion
    defaultCollapsed
    iconPosition={POSITION_RIGHT}
    id="show-hub-invite-rules"
    header={(
      <div>
        Show rules
      </div>
    )}
    Layout={AccordionLayout}
    >
    <div>hello</div>
  </Accordion>
)
