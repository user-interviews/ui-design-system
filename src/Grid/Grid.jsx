import React from 'react';

import { Grid as MuiGrid } from '@mui/material';

const Grid = ({ children, className, ...props }) => (
  <MuiGrid className={className} {...props}>
    {children}
  </MuiGrid>
  );

export default Grid;
