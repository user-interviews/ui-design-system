import React from 'react';
import PropTypes from 'prop-types';

import BootstrapCard from 'react-bootstrap/Card';

export default function Card({ children, title }) {
  return (
    <BootstrapCard>
      <BootstrapCard.Body>
        <BootstrapCard.Title>
          {title}
        </BootstrapCard.Title>
        {children}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

Card.defaultProps = {
  children: undefined,
  title: '',
};
