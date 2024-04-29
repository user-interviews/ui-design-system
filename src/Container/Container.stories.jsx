import React from 'react';

import Card from '../Card';
import { Col, Container, Row } from '.';
import mdx from './Container.mdx';

export default {
  title: 'Layouts/Container',
  component: Container,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Container>
    <Row>
      <Col>
        <Card title="Default container">
          <code>{`<Container>`}</code> provides a means to center and horizontally pad your site's contents.
          Use Container for a responsive pixel width.
        </Card>
      </Col>
    </Row>
  </Container>
);

export const FluidContainer = () => (
  <Container fluid>
    <Row>
      <Col>
        <Card title="Fluid container">
          You can use <code>{`<Container fluid />`}</code> for width: 100% across all viewport and device sizes.
        </Card>
      </Col>
    </Row>
  </Container>
);

export const FluidContainerWithBreakpoints = () => (
  <Container fluid="md">
    <Row>
      <Col>
        <Card title="Fluid container with breakpoints">
          You can set breakpoints for the <code>fluid</code> prop.
          Setting it to a breakpoint <code>['sm', 'md', 'lg', 'xl', 'xxl']</code> will set the
          Container as fluid until the specified breakpoint.
        </Card>
      </Col>
    </Row>
  </Container>
);

export const AutoLayoutColumns = () => (
  <Container>
    <p>
      When no column widths are specified the <code>{`<Col> `}</code>
      component will render equal width columns.
    </p>
    <Row>
      <Col>
        <Card title="1 of 2" />
      </Col>
      <Col>
        <Card title="2 of 2" />
      </Col>
    </Row>
    <br />
    <Row>
      <Col>
        <Card title="1 of 3" />
      </Col>
      <Col>
        <Card title="2 of 3" />
      </Col>
      <Col>
        <Card title="3 of 3" />
      </Col>
    </Row>
  </Container>
);

export const SettingOneColumnWidth = () => {
  const xs = 8;

  return (
    <Container>
      <p>
        Auto-layout for flexbox grid columns also means you can set the width of one column and
        have the sibling columns automatically resize around it.
        You may use predefined grid classes (as shown below), grid mixins, or inline widths.
        Note that the other columns will resize no matter the width of the center column.
      </p>
      <Row>
        <Col>
          <Card title="1 of 3" />
        </Col>
        <Col xs={xs}>
          <Card title="2 of 3 (adjust me!)">
            <code>{`xs={${xs}}`}</code>
          </Card>
        </Col>
        <Col>
          <Card title="3 of 3" />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Card title="1 of 3" />
        </Col>
        <Col xs={4}>
          <Card title="2 of 3">
            <code>xs={4}</code>
          </Card>
        </Col>
        <Col>
          <Card title="3 of 3" />
        </Col>
      </Row>
    </Container>
  );
};

export const ResponsiveGrids = () => (
  <>
    <Container>
      <Row>
        <Col sm={8}>
          <Card title="1 of 2">
            <p>
              <code>sm={8}</code>
            </p>
            <p>
              The <code>Col</code> lets you specify column widths across
              6 breakpoint sizes (xs, sm, md, lg, xl and xxl).
              For every breakpoint, you can specify the amount of columns to span,
              or set the prop to <code>{`<Col lg={true} />`}</code> for auto layout widths.
            </p>
          </Card>
        </Col>
        <Col sm={4}>
          <Card title="2 of 2">
            <p>
              <code>sm={4}</code>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
    <br />
    <Container>
      <Row>
        <Col sm>
          <Card title="1 of 3">
            <p>
              <code>{`sm={true}`}</code>
            </p>
            <p>
              Or set the prop to <code>{`<Col lg={true}/>`}</code> for auto layout widths.
            </p>
          </Card>
        </Col>
        <Col sm>
          <Card title="2 of 3">
            <p>
              <code>{`sm={true}`}</code>
            </p>
          </Card>
        </Col>
        <Col sm>
          <Card title="3 of 3">
            <p>
              <code>{`sm={true}`}</code>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);

export const MixingBreakpoints = () => (
  <>
    <Container>
      <Row>
        <Col md={8} xs={12}>
          <Card title="1 of 2">
            <p>
              <code>{`md={8} xs={12}`}</code>
            </p>
            <p>
              You can also mix and match breakpoints to create different grids
              depending on the screen size.
            </p>
          </Card>
        </Col>
        <Col md={4} xs={6}>
          <Card title="2 of 2">
            <p>
              <code>{`md={4} xs={6}`}</code>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
    <br />
    <Container>
      <Row>
        <Col md={4} xs={3}>
          <Card title="1 of 3">
            <p>
              <code>{`md={4} xs={3}`}</code>
            </p>
          </Card>
        </Col>
        <Col md={4} xs={3}>
          <Card title="2 of 3">
            <p>
              <code>{`md={4} xs={3}`}</code>
            </p>
          </Card>
        </Col>
        <Col md={4} xs={3}>
          <Card title="3 of 3">
            <p>
              <code>{`md={4} xs={3}`}</code>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);

export const OffsettingColumns = () => (
  <Container>
    <Row>
      <Col md={4}>
        <Card title="1 of 2">
          <p>
            <code>{`md={4}`}</code>
          </p>
        </Card>
      </Col>
      <Col md={{ span: 6, offset: 2 }}>
        <Card title="2 of 2">
          <p>
            <code>{`md={{ span: 6, offset: 2 }}`}</code>
          </p>
          <p>
            For offsetting grid columns you can set an <code>offset</code> value.
          </p>
        </Card>
      </Col>
    </Row>
  </Container>
);

export const SettingColumnWidthsInRow = () => (
  <Container>
    <p>
      The <code>Row</code> lets you specify column widths across
      5 breakpoint sizes (xs, sm, md, lg, xl and xxl).
      For every breakpoint, you can specify the amount of columns that will fit next to each other.
      You can also specify auto to set the columns to their natural widths.
    </p>
    <p>
      Note that <code>Row</code> column widths will override <code>Col</code>
      widths set on lower breakpoints when viewed on larger screens.
      The <code>{`<Col xs={6} />`}</code> size will be overriden by
      <code>{`<Row md={4} />`}</code> on medium and larger screens.
    </p>
    <Row lg={3} md={2} sm={1} xs={1}>
      <Col>
        <Card title="1 of 3" />
      </Col>
      <Col>
        <Card title="2 of 3" />
      </Col>
      <Col>
        <Card title="3 of 3" />
      </Col>
    </Row>
  </Container>
);
