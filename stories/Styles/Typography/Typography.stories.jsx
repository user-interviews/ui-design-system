import React, { Fragment } from 'react';

import Pill from 'src/Pill';

import './Typography.scss';
import PropTypes from 'prop-types';

const TypographyExample = ({ description, modifiers, preset }) => (
  <div className="TypographyRow__Example">
    <div className={`${preset}`}>
      <p>
        {description}
      </p>
      {
        modifiers.map((modifier) => (
          <p key={modifier}><div className={`${modifier}`}>{description}</div></p>
        ))
      }
    </div>
  </div>
);

TypographyExample.propTypes = {
  description: PropTypes.string.isRequired,
  modifiers: PropTypes.array.isRequired,
  preset: PropTypes.string.isRequired,
};

const TypographyTokens = ({ tokens }) => (
  <ul>
    {
      tokens.map((token) => <li key={token}><Pill color="blue" size="sm" text={token} /></li>)
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
  lineHeight,
  modifiers,
  weight,
}) => (
  <div className="TypographyRow__Specs">
    <ul>
      <li>
        <strong>{preset}</strong>
      </li>
      <li>
        Type:
        {font}
      </li>
      <li>
        Size:
        {size}
      </li>
      <li>
        Line-height:
        {lineHeight}
      </li>
      <li>
        Weight:
        {weight}
      </li>
    </ul>
    <TypographyTokens tokens={[preset, ...modifiers]} />
  </div>
);

TypographySpecs.propTypes = {
  font: PropTypes.string.isRequired,
  lineHeight: PropTypes.string.isRequired,
  modifiers: PropTypes.array.isRequired,
  preset: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
};

const TypographyStyle = (props) => (
  <div className="TypographyRow">
    <TypographyExample {...props} />
    <TypographySpecs {...props} />
  </div>
);

const presets = [
  {
    preset: 'font-type-600',
    font: 'Lato, Arial, sans-serif',
    description: 'This is for layout headings.',
    size: '1.5rem',
    weight: '300 / Light',
    lineHeight: '1.75rem',
    modifiers: ['font-type-600--bold'],
  },
  {
    preset: 'font-type-500',
    font: 'Lato, Arial, sans-serif',
    description: 'This is for component and layout headings.',
    size: '1.25rem',
    weight: '300 / Light',
    lineHeight: '1.75rem',
    modifiers: ['font-type-500--bold'],

  },
  {
    preset: 'font-type-400',
    font: 'Lato, Arial, sans-serif',
    description: 'This is for component and layout headings.',
    size: '1.125rem',
    weight: '300 / Light',
    lineHeight: '1.75rem',
    modifiers: ['font-type-400--bold'],

  },
  {
    preset: 'font-type-300',
    font: 'Lato, Arial, sans-serif',
    description: 'This typically used for subheadings or short component text.',
    size: '1rem',
    weight: '300 / Light',
    lineHeight: '1.5rem',
    modifiers: ['font-type-300--bold'],

  },
  {
    preset: 'font-type-200',
    font: 'Lato, Arial, sans-serif',
    description: 'This is commonly used for layout text and paragraphs and in components.',
    size: '.875rem',
    weight: '300 / Light',
    lineHeight: '1.25rem',
    modifiers: ['font-type-200--bold'],
  },
  {
    preset: 'font-type-100',
    font: 'Lato, Arial, sans-serif',
    description: 'This is for explanatory helper text.',
    size: '.75rem',
    weight: '300 / Light',
    lineHeight: '1rem',
    modifiers: [],
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
