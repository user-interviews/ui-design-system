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
                fontSize: '0.75rem',
                margin: '1rem',
                padding: '0.25rem',
                textAlign: 'center',
              }}
            >
              <div>{colorNameKey}</div>
              <div>{colors[colorNameKey]}</div>
            </p>
          </div>
        );
      })
    }
  </div>
);
/* eslint-enable react/prop-types, react/no-array-index-key */

export default {
  title: 'Foundations/Color Palette',
  component: Palette,
};

export const Blue = () => <Palette color="BLUE" />;
export const Gray = () => <Palette color="GRAY" />;
export const Green = () => <Palette color="GREEN" />;
export const Orange = () => <Palette color="ORANGE" />;
export const Red = () => <Palette color="RED" />;
export const Yellow = () => <Palette color="YELLOW" />;

// New brand color additions (currently skip even number series)
export const Emerald = () => <Palette color="EMERALD" />;
export const Navy = () => <Palette color="NAVY" />;
export const Neutral = () => <Palette color="NEUTRAL" />;
export const Sand = () => <Palette color="SAND" />;
export const Teal = () => <Palette color="TEAL" />;
