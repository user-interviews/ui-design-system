import React from 'react';
import { spacing } from '../../src/Styles';

import './Spacing.scss';

export default {
  title: 'Foundations/Spacing',
};

const spacingArr = [
  '10',
  '20',
  '30',
  '40',
  '50',
  '60',
  '70',
];

export const Padding = () => (
  <div className="Spacing">
    {spacingArr.map((space) => {
        const spacingNameKey = `UX_SPACING_${space}`;

        return (
          <span
            className="Spacing__card"
            style={{ padding: spacing[spacingNameKey] }}
          >
            <span>{spacingNameKey}</span>
          </span>
      );
    })}
  </div>
);

export const Margin = () => (
  <div className="Spacing">
    {spacingArr.map((space) => {
        const spacingNameKey = `UX_SPACING_${space}`;

        return (
          <span
            className="Spacing__card"
            style={{ margin: spacing[spacingNameKey] }}
          >
            <span>{spacingNameKey}</span>
          </span>
      );
    })}
  </div>
);
