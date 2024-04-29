import React from 'react';

import { Steps, Step } from '.';

import mdx from './Steps.mdx';

export default {
  title: 'Components/Steps',
  component: Steps,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Steps>
    <Step
      circleText="1"
      text={(
        <>
          <b>Create</b> a profile and browse studies that interest you.
        </>
      )}
    />
    <Step
      circleText="2"
      text={(
        <>
          <b>Confirm</b> your time slot, participate, and get paid!
        </>
      )}
    />
    <Step
      circleText="3"
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
      circleText="1"
      text={(
        <>
          <b>Create</b> a profile and browse studies that interest you.
        </>
      )}
    />
    <Step
      circleText="2"
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
      circleText="3"
      text={(
        <>
          <b>Confirm</b> your time slot, participate, and get paid!
        </>
      )}
    />
    <Step
      circleText="4"
      text={(
        <>
          <b>Something</b> else...
        </>
      )}
    />
  </Steps>
);
