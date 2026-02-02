import React from 'react';

import { Pill, PILL_COLORS } from 'src/Pill';

import * as styles from './Typography.module.css';
import PropTypes from 'prop-types';

function TypographyExample({ modifiers, preset }) {
  const description = 'The fastest way to recruit research participants';

  return (
    <div className={styles.example}>
      <div>
        <p className={styles[preset]}>{description}</p>
        {
          modifiers.map((modifier) => (
            <p className={styles[modifier]} key={modifier}>{description}</p>
          ))
        }
      </div>
    </div>
  );
}

TypographyExample.propTypes = {
  modifiers: PropTypes.array.isRequired,
  preset: PropTypes.string.isRequired,
};

function TypographyTokens({ tokens }) {
  return (
    <ul>
      {
      tokens.map((token) => <li key={token}><Pill color={PILL_COLORS.BLUE} text={`--${token}`} /></li>)
    }
    </ul>
  );
}

TypographyTokens.propTypes = {
  tokens: PropTypes.array.isRequired,
};

function TypographySpecs({
  preset,
  font,
  size,
  letterSpacing,
  lineHeight,
  modifiers,
  textTransform,
  weight,
}) {
  return (
    <div className={styles.specs}>
      <ul>
        <li>
          <strong>{preset}</strong>
        </li>
        <li>
          Type: {font}
        </li>
        <li>
          Size: {size}
        </li>
        <li>
          Line-height: {lineHeight}
        </li>
        <li>
          Weight: {weight}
        </li>
        {
        letterSpacing && (
          <li>
            Letter-spacing: {letterSpacing}
          </li>
        )
      }
        {
        textTransform && (
          <li>
            Text-transform: {textTransform}
          </li>
        )
      }
      </ul>
      <TypographyTokens tokens={[preset, ...modifiers]} />
    </div>
  );
}

TypographySpecs.propTypes = {
  font: PropTypes.string.isRequired,
  letterSpacing: PropTypes.string,
  lineHeight: PropTypes.string.isRequired,
  modifiers: PropTypes.array.isRequired,
  preset: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  textTransform: PropTypes.string,
  weight: PropTypes.string.isRequired,
};

function TypographyStyle(props) {
  return (
    <div className={styles.row}>
      <TypographyExample {...props} />
      <TypographySpecs {...props} />
    </div>
  );
}

const headingPresets = [
  {
    preset: 'synth-font-heading-large',
    font: 'Inter, sans-serif',
    size: '1.5rem (24px)',
    weight: '700 / Bold',
    lineHeight: '2rem (32px)',
    modifiers: [],
  },
  {
    preset: 'synth-font-heading-medium',
    font: 'Inter, sans-serif',
    size: '1.125rem (18px)',
    weight: '700 / Bold',
    lineHeight: '1.5rem (24px)',
    modifiers: [],
  },
  {
    preset: 'synth-font-heading-small',
    font: 'Inter, sans-serif',
    size: '1rem (16px)',
    weight: '700 / Bold',
    lineHeight: '1.375rem (22px)',
    modifiers: [],
  },
];

const bodyPresets = [
  {
    preset: 'synth-font-body-regular',
    font: 'Inter, sans-serif',
    size: '0.875rem (14px)',
    weight: '400 / Regular',
    lineHeight: '1.25rem (20px)',
    modifiers: ['synth-font-body-medium', 'synth-font-body-bold'],
  },
  {
    preset: 'synth-font-subtext-regular',
    font: 'Inter, sans-serif',
    size: '0.75rem (12px)',
    weight: '400 / Regular',
    lineHeight: '1rem (16px)',
    modifiers: ['synth-font-subtext-medium', 'synth-font-subtext-bold'],
  },
];

export function Default() {
  return (
    <>
      {
      [...headingPresets, ...bodyPresets].map((preset) => (
        <TypographyStyle {...preset} key={preset.preset} />
        ))
    }
    </>
  );
}

export function Headings() {
  return (
    <>
      {
      headingPresets.map((preset) => <TypographyStyle {...preset} key={preset.preset} />)
     }
    </>
  );
}

export function Body() {
  return (
    <>
      {
      bodyPresets.map((preset) => <TypographyStyle {...preset} key={preset.preset} />)
     }
    </>
  );
}

export default {
  title: 'Foundations/Typography',
  component: Default,
};
