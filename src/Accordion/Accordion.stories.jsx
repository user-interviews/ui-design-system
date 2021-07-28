import React, { Fragment } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Accordion, POSITION_RIGHT } from 'src/Accordion';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import mdx from './Accordion.mdx';

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
    accordionClass="accordion--modern accordion--bordered DemographicRuleAccordion"
    defaultCollapsed
    header={(
      <div>
        <div>Show rules</div>
        <div className="Accordion__header__helper__text">Helper text</div>
      </div>
    )}
    iconPosition={POSITION_RIGHT}
    id="show-hub-invite-rules"
    Layout={AccordionLayout}
  >
    <div>hello</div>
  </Accordion>
);
