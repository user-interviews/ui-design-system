import React from 'react';
import PropTypes from 'prop-types';

import { Grid as MuiGrid } from '@mui/material';

const Grid = ({ children, className, ...props }) => (
  <MuiGrid className={className} {...props}>
    {children}
  </MuiGrid>
);

Grid.propTypes = {
  className: PropTypes.string,
};

Grid.defaultProps = {
  className: undefined,
};

export default Grid;
