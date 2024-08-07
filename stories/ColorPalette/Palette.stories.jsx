import React from 'react';

import { colors } from 'src/Styles';

/* eslint-disable react/prop-types, react/no-array-index-key */
function Palette({ color }) {
  return (
    <div style={{ display: 'flex', height: '320px', width: '100%' }}>
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
                margin: '16px',
                padding: '4px',
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
}
/* eslint-enable react/prop-types, react/no-array-index-key */

export default {
  title: 'Foundations/Color Palette',
  component: Palette,
};

export function Blue() {
  return <Palette color="BLUE" />;
}
export function Gray() {
  return <Palette color="GRAY" />;
}
export function Green() {
  return <Palette color="GREEN" />;
}
export function Orange() {
  return <Palette color="ORANGE" />;
}
export function Red() {
  return <Palette color="RED" />;
}
export function Yellow() {
  return <Palette color="YELLOW" />;
}

// New brand color additions (currently skip even number series)
export function Emerald() {
  return <Palette color="EMERALD" />;
}
export function Navy() {
  return <Palette color="NAVY" />;
}
export function Neutral() {
  return <Palette color="NEUTRAL" />;
}
export function Sand() {
  return <Palette color="SAND" />;
}
export function Teal() {
  return <Palette color="TEAL" />;
}
