import React from 'react';

import { palette } from 'src/Styles';

/* eslint-disable react/prop-types, react/no-array-index-key */
const Palette = ({ color }) => (
  <div style={{ display: 'flex', height: '20rem', width: '100%' }}>
    {
      [...Array(9)].map((_, i) => {
        const colorNameKey = `ux${color}${i + 1}00`;

        return (
          <div
            key={i}
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
);
/* eslint-enable react/prop-types, react/no-array-index-key */

export default {
  title: 'Design System/Styles/Color Palette',
  component: Palette,
};

export const Blue = () => <Palette color="Blue" />;
export const Gray = () => <Palette color="Gray" />;
export const Green = () => <Palette color="Green" />;
export const Orange = () => <Palette color="Orange" />;
export const Red = () => <Palette color="Red" />;
