import React from 'react';
import { addDecorator } from "@storybook/react";

addDecorator(story => <div style={{ padding: '1rem' }}>{story()}</div>);

const preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Foundations', 'Components'],
      },
    },
  }
};

export default preview;
