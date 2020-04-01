import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Pill from 'src/Pill';

export default {
  title: 'Design System/Pill',
  component: Pill,
  decorators: [withKnobs],
};

export const Default = () => <Pill text={text('Pill Text', 'Test pill')} />;

export const Blue = () => <Pill color="blue" text={text('Pill Text', 'Test pill')} />;

export const Orange = () => <Pill color="orange" text={text('Pill Text', 'Test pill')} />;

export const Small = () => <Pill size="sm" text={text('Pill Text', 'Test pill')} />;
