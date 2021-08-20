import React from 'react';

import { colors } from 'src/Styles';

/* eslint-disable react/prop-types, react/no-array-index-key */
const Palette = ({ color }) => (
  <div style={{ display: 'flex', height: '20rem', width: '100%' }}>
    {
      [...Array(9)].map((_, i) => {
        const colorNameKey = `UX_${color}_${i + 1}00`;

        return (
          <div
            key={i}
            style={{
              backgroundColor: colors[colorNameKey],
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

export const Blue = () => <Palette color="BLUE" />;
export const Gray = () => <Palette color="GRAY" />;
export const Green = () => <Palette color="GREEN" />;
export const Orange = () => <Palette color="ORANGE" />;
export const Red = () => <Palette color="RED" />;
