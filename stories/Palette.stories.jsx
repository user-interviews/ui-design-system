import React from 'react';

import palette from '../src/Styles/palette';

import { withPadding } from './decorators';

const renderColor = (colorName) => () => (
  <div style={{ display: 'flex', height: '20rem', width: '100%' }}>
    {
      [...Array(9)].map((_, index) => {
        const colorNameKey = `ux${colorName}${index + 1}00`;

        return (
          /* eslint-disable react/no-array-index-key */
          <div
            key={index}
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
          /* eslint-enable react/no-array-index-key */
        );
      })
    }
  </div>
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
