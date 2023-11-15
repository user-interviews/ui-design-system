import React from 'react';

import { Pill, PILL_COLORS } from 'src/Pill';

import './Typography.scss';
import PropTypes from 'prop-types';

const TypographyExample = ({ modifiers, preset }) => {
  const description = 'The fastest way to recruit research participants';

  return (
    <div className="TypographyRow__Example">
      <div className={`${preset}`}>
        <p>{description}</p>
        {
          modifiers.map((modifier) => (
            <p className={`${modifier}`} key={modifier}>{description}</p>
          ))
        }
      </div>
    </div>
  );
};

TypographyExample.propTypes = {
  modifiers: PropTypes.array.isRequired,
  preset: PropTypes.string.isRequired,
};

const TypographyTokens = ({ tokens }) => (
  <ul>
    {
      tokens.map((token) => <li key={token}><Pill color={PILL_COLORS.BLUE} text={`$synth-${token}`} /></li>)
    }
  </ul>
);

TypographyTokens.propTypes = {
  tokens: PropTypes.array.isRequired,
};

const TypographySpecs = ({
  preset,
  font,
  size,
  letterSpacing,
  lineHeight,
  modifiers,
  textTransform,
  weight,
}) => (
  <div className="TypographyRow__Specs">
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

TypographySpecs.defaultProps = {
  letterSpacing: undefined,
  textTransform: undefined,
};

const TypographyStyle = (props) => (
  <div className="TypographyRow">
    <TypographyExample {...props} />
    <TypographySpecs {...props} />
  </div>
);

const headingPresets = [
  {
    preset: 'font-type-header-page',
    font: 'Inter, sans-serif',
    size: '1.5rem (24px)',
    weight: '700 / Bold',
    lineHeight: '2rem (32px)',
    modifiers: [],
  },
  {
    preset: 'font-type-header-section',
    font: 'Inter, sans-serif',
    size: '1.125rem (18px)',
    weight: '700 / Bold',
    lineHeight: '2rem (24px)',
    modifiers: [],
  },
];

const bodyPresets = [
  {
    preset: 'font-type-body',
    font: 'Inter, sans-serif',
    size: '0.875rem (14px)',
    weight: '400 / Regular',
    lineHeight: '1.25rem (20px)',
    modifiers: [],
  },
  {
    preset: 'font-type-subtext',
    font: 'Inter, sans-serif',
    size: '0.75rem (12px)',
    weight: '400 / Regular',
    lineHeight: '1rem (16px)',
    modifiers: ['font-type-subtext--medium', 'font-type-subtext--bold'],
  },
  {
    preset: 'font-type-small-caps',
    font: 'Inter, sans-serif',
    size: '0.625rem (10px)',
    weight: '400 / Regular',
    lineHeight: '0.875rem (14px)',
    textTransform: 'Uppercase',
    modifiers: ['font-type-small-caps--medium', 'font-type-small-caps--bold'],
  },
];

export const Default = () => (
  <>
    {
      [...headingPresets, ...bodyPresets].map((preset) => (
        <TypographyStyle {...preset} key={preset.preset} />
        ))
    }
  </>
);

export const Headings = () => (
  <>
    {
      headingPresets.map((preset) => <TypographyStyle {...preset} key={preset.preset} />)
     }
  </>
);

export const Body = () => (
  <>
    {
      bodyPresets.map((preset) => <TypographyStyle {...preset} key={preset.preset} />)
     }
  </>
);

export default {
  title: 'Foundations/Typography',
  component: Default,
};
