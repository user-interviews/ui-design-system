import React, { forwardRef } from 'react';

import './DrawerBody.scss';

type DrawerBodyProps = {
  children: React.ReactNode;
};

const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children }, ref) => (
    <div className="Drawer__body" ref={ref}>
      {children}
    </div>
  ),
);

DrawerBody.displayName = 'DrawerBody';

export default DrawerBody;
