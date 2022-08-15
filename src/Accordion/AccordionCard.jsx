import classNames from 'classnames';
import React from 'react';

import Card from 'src/Card';

const AccordionCard = ({
  children,
  className,
  size,
  ...props
}) => (
  <Card
    className={classNames(
        'AccordionCard',
        className,
      )}
    noPadding
    size={size}
    {...props}
  >
    {children}
  </Card>
  );

export default AccordionCard;
