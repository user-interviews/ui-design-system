import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, text } from '@storybook/addon-knobs';

import Pill from '../src/Pill/Pill';

const withPadding = (story) => <div style={{ padding: '1rem' }}>{story()}</div>;

export default {
  title: 'Design System/Pill',
  component: Pill,
  decorators: [withA11y, withKnobs, withPadding],
};

export const Default = () => <Pill text={text('Pill Text', 'Test pill')} />;

export const Blue = () => <Pill color="blue" text={text('Pill Text', 'Test pill')} />;

export const Orange = () => <Pill color="orange" text={text('Pill Text', 'Test pill')} />;

export const Small = () => <Pill size="sm" text={text('Pill Text', 'Test pill')} />;
