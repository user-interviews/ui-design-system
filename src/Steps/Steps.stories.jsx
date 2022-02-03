import React from 'react';

import { Steps, Step } from 'src/Steps';

import colors from '../Styles/colors/palette';
import mdx from './Steps.mdx';

export default {
  title: 'Components/Steps',
  component: Steps,
  subcomponents: { Step },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Steps>
    <Step
      circleBorderColor={colors.UX_EMERALD}
      circleText="1"
      circleTextColor={colors.UX_EMERALD}
      text={(
        <>
          <b>Create</b> a profile and browse studies that interest you.
        </>
      )}
    />
    <Step
      circleBorderColor={colors.UX_EMERALD}
      circleText="2"
      circleTextColor={colors.UX_EMERALD}
      text={(
        <>
          <b>Apply</b> to studies. We'll notify you if you qualify!
        </>
      )}
    />
    <Step
      circleBorderColor={colors.UX_EMERALD}
      circleText="3"
      circleTextColor={colors.UX_EMERALD}
      text={(
        <>
          <b>Confirm</b> your time slot, participate, and get paid!
        </>
      )}
    />
  </Steps>
);
