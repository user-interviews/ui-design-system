import React from 'react';
import { elevations } from '../../src/Styles';

import './Elevation.scss';

export default {
  title: 'Foundations/Elevation',
};

const elevationsArr = [
  '00',
  '10',
  '20',
  '30',
  '40',
  '50',
];

export const Elevations = () => (
  <div className="Elevations">
    {elevationsArr.map((elevation) => {
        const elevationsNameKey = `UX_ELEVATIONS_${elevation}`;

        return (
          <div
            className="Elevations__card"
            style={{ boxShadow: elevations[elevationsNameKey] }}
          >
            <span>{elevationsNameKey}</span>
          </div>
      );
    })}
  </div>
);
