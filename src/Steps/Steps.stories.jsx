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
          <b>Confirm</b> your time slot, participate, and get paid!
        </>
      )}
    />
    <Step
      circleBorderColor={colors.UX_EMERALD}
      circleText="3"
      circleTextColor={colors.UX_EMERALD}
      text={(
        <>
          <b>Something</b> else...
        </>
      )}
    />
  </Steps>
);

export const VaryingContentLength = () => (
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
          <b>Lorem</b> ipsum dolor sit amet, consectetur adipiscing elit. Vivamus posuere
          vestibulum velit, interdum lacinia quam tincidunt eget. Fusce sagittis luctus massa,
          vitae posuere odio imperdiet ac. Nam sem leo, blandit a orci vel, lacinia volutpat
          libero. Etiam maximus nulla sed eleifend molestie. Aliquam et posuere justo, id
          suscipit mauris. Sed luctus tortor nec accumsan commodo. Nunc in lacus pretium,
          condimentum lorem sit amet, hendrerit arcu. Quisque gravida ullamcorper magna,
          at hendrerit purus viverra vel. Donec tempor purus dui, nec pulvinar est vestibulum a.
          Nam condimentum facilisis orci, nec elementum justo semper sit amet.
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
    <Step
      circleBorderColor={colors.UX_EMERALD}
      circleText="4"
      circleTextColor={colors.UX_EMERALD}
      text={(
        <>
          <b>Something</b> else...
        </>
      )}
    />
  </Steps>
);
