import React from 'react';
import * as propTypes from 'prop-types';

import './DrawerBody.scss';

const DrawerBody = ({
  children,
}) => (
  <div className="Drawer__body">
    {children}
  </div>
);

DrawerBody.propTypes = {
  children: propTypes.node.isRequired,
};

export default DrawerBody;
