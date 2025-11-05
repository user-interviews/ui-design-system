import React from 'react';
import type { Meta, StoryObj } from 'storybook/react';

import { FlexContainer } from './FlexContainer';

const meta: Meta<typeof FlexContainer> = {
  component: FlexContainer,
  title: 'Components/FlexContainer',
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
  argTypes: {
    alignItems: { control: { type: 'select' } },
    flexDirection: { control: { type: 'select' } },
    flexWrap: { control: { type: 'select' } },
    justifyContent: { control: { type: 'select' } },
    gap: { control: { type: 'select' } },
    width: { control: { type: 'select' } },
  },
  decorators: [
    (Story) => (
      <div>
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{
          __html: `
                .flexContainer { border: 1px solid #666; min-height: 100px; min-width: 100px; }
              `,
          }}
        />
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FlexContainer>;

export const Default: Story = {
  args: {
    className: 'flexContainer',
    children: (
      <>
        <div style={{ flex: 1, backgroundColor: 'aqua' }}>1</div>
        <div style={{ flex: 1, backgroundColor: 'salmon' }}>2</div>
        <div style={{ flex: 1, backgroundColor: 'cornflowerblue' }}>3</div>
        <div style={{ flex: 1, backgroundColor: 'lightpink' }}>4</div>
      </>
    ),
  },
};
