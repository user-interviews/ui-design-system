import React, { Fragment } from 'react';

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
      tokens.map((token) => <li key={token}><Pill color={PILL_COLORS.BLUE} text={token} /></li>)
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
        textTransform && (
          <li>
            Text-transform: {textTransform}
          </li>
        )
      }
      {
        letterSpacing && (
          <li>
            Letter-spacing: {letterSpacing}
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

const presets = [
  {
    preset: 'font-type-70--regular',
    font: 'DM Sans, sans-serif',
    size: '1.5rem',
    weight: '400 / Regular',
    lineHeight: '2rem',
    modifiers: ['font-type-70--medium', 'font-type-70--bold'],
  },
  {
    preset: 'font-type-60--regular',
    font: 'DM Sans, sans-serif',
    size: '1.25rem',
    weight: '400 / Regular',
    lineHeight: '1.625rem',
    modifiers: ['font-type-60--medium', 'font-type-60--bold'],

  },
  {
    preset: 'font-type-50--regular',
    font: 'DM Sans, sans-serif',
    size: '1.125rem',
    weight: '400 / Regular',
    lineHeight: '1.5rem',
    modifiers: ['font-type-50--medium', 'font-type-50--bold'],

  },
  {
    preset: 'font-type-40--regular',
    font: 'DM Sans, sans-serif',
    size: '1rem',
    weight: '400 / Regular',
    lineHeight: '1.375rem',
    modifiers: ['font-type-40--medium', 'font-type-40--bold'],

  },
  {
    preset: 'font-type-30--regular',
    font: 'DM Sans, sans-serif',
    size: '0.875rem',
    weight: '400 / Regular',
    lineHeight: '1.25rem',
    modifiers: ['font-type-30--medium', 'font-type-30--bold'],
  },
  {
    preset: 'font-type-20--regular',
    font: 'DM Sans, sans-serif',
    size: '0.75rem',
    weight: '400 / Regular',
    lineHeight: '1rem',
    modifiers: ['font-type-20--medium', 'font-type-20--bold'],
  },
  {
    preset: 'font-type-10--regular',
    font: 'DM Sans, sans-serif',
    size: '0.625rem',
    weight: '400 / Regular',
    lineHeight: '0.875rem',
    textTransform: 'Uppercase',
    letterSpacing: '0.0625rem',
    modifiers: ['font-type-10--medium', 'font-type-10--bold'],
  },
];

export const Typography = () => (
  <Fragment>
    {
      presets.map((preset) => <TypographyStyle {...preset} key={preset.preset} />)
    }
  </Fragment>
);

export default {
  title: 'Design System/Styles',
};
