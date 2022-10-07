import React from 'react';
import PropTypes from 'prop-types';

import {
 Container, Col, Row, columnPropTypes, containerSizes,
} from 'src/Container';

const CardStackContainer = ({
  children,
  className,
  fluid,
  sm,
  lg,
  md,
  xl,
  xxl,
  xs,
  ...props
}) => (
  <Container className={className} fluid={fluid} {...props}>
    <Row>
      <Col />
      <Col lg={lg} md={md} sm={sm} xl={xl} xs={xs} xxl={xxl}>
        {children}
      </Col>
      <Col />
    </Row>
  </Container>
);

CardStackContainer.propTypes = {
  className: PropTypes.string,
  fluid: containerSizes,
  lg: columnPropTypes,
  md: columnPropTypes,
  sm: columnPropTypes,
  xl: columnPropTypes,
  xs: columnPropTypes,
  xxl: columnPropTypes,
};

CardStackContainer.defaultProps = {
  className: undefined,
  fluid: true,
  sm: 12,
  lg: 8,
  md: 10,
  xl: 6,
  xxl: 6,
  xs: 12,
};

export default CardStackContainer;
