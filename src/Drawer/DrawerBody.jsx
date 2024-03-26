import React, { forwardRef } from 'react';
import * as propTypes from 'prop-types';

import './DrawerBody.scss';

const DrawerBody = forwardRef(({
  children,
}, ref) => (
  <div
    className="Drawer__body"
    ref={ref}
  >
    {children}
  </div>
));

DrawerBody.propTypes = {
  children: propTypes.node.isRequired,
};

export default DrawerBody;
