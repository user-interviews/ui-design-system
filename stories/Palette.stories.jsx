import React from 'react';

import palette from '../src/Styles/palette';

import { withPadding } from './decorators';

const renderColor = (colorName) => (
  () => (
    <div style={{ display: 'flex', height: '20rem', width: '100%' }}>
      {
      [...Array(9)].map((_, i) => {
        const colorNameKey = `ux${colorName}${i + 1}00`;

        return (
          <div
            key={colorNameKey}
            style={{
              backgroundColor: palette[colorNameKey],
              height: '100%',
              flexBasis: '11%',
            }}
          >
            <p
              style={{
                backgroundColor: '#FFF',
                color: '#000',
                fontSize: '1rem',
                margin: '1rem',
                textAlign: 'center',
              }}
            >
              {colorNameKey}
            </p>
          </div>
        );
      })
    }
    </div>
  )
);

export default {
  title: 'Design System/Color Palette',
  decorators: [withPadding],
};

export const Blue = renderColor('Blue');
export const Gray = renderColor('Gray');
export const Green = renderColor('Green');
export const Orange = renderColor('Orange');
export const Red = renderColor('Red');
