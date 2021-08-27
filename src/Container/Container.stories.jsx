import React from 'react';

import { Col, Container, Row } from 'src/Container';
import mdx from './Container.mdx';

export default {
  title: 'Design System/Container',
  component: Container,
  subcomponents: {
    Col, Row,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const ColStyle = {
  backgroundColor: '#C9E5FC',
  border: '1px solid #337AB7',
  padding: '0.5rem',
};

const DescriptionStyle = {
  backgroundColor: '#F1F1F1',
  border: '1px solid #A1A1A1',
  borderLeft: '0.5rem solid #818181',
  borderRadius: '4px',
  padding: '0.5rem',
  margin: '1.5rem 0 1rem',
  maxWidth: '50vw',
};

const Description = ({ children }) => (
  <div style={DescriptionStyle}>
    { children }
  </div>
);

export const Default = () => (
  <>
    <Description>
      Containers provide a means to center and horizontally pad your site’s contents.
      Use <code>Container</code> for a responsive pixel width.
    </Description>
    <Container>
      <Row>
        <Col style={ColStyle}>1 of 1</Col>
      </Row>
    </Container>
  </>
);

export const FluidContainer = () => (
  <>
    <Description>
      You can use <code>{`<Container fluid />`}</code> for width: 100% across all viewport and device sizes.
    </Description>
    <Container fluid>
      <Row>
        <Col style={ColStyle}>1 of 1</Col>
      </Row>
    </Container>
    <br />

    <Description>
      You can set breakpoints for the <code>fluid</code> prop.
      Setting it to a breakpoint <code>(sm, md, lg, xl, xxl)</code> will set the
      Container as fluid until the specified breakpoint.
    </Description>
    <Container fluid="md">
      <Row>
        <Col style={ColStyle}>1 of 1</Col>
      </Row>
    </Container>
  </>
);

export const AutoLayoutColumns = () => (
  <>
    <Description>
      When no column widths are specified the <code>Col</code> component will render
      equal width columns
    </Description>
    <Container>
      <Row>
        <Col style={ColStyle}>1 of 2</Col>
        <Col style={ColStyle}>2 of 2</Col>
      </Row>
      <Row>
        <Col style={ColStyle}>1 of 3</Col>
        <Col style={ColStyle}>2 of 3</Col>
        <Col style={ColStyle}>3 of 3</Col>
      </Row>
    </Container>
  </>
);

export const SettingOneColumnWidth = () => (
  <>
    <Description>
      Auto-layout for flexbox grid columns also means you can set the width of one column and
      have the sibling columns automatically resize around it.
      You may use predefined grid classes (as shown below), grid mixins, or inline widths.
      Note that the other columns will resize no matter the width of the center column.
    </Description>
    <Container>
      <Row>
        <Col style={ColStyle}>1 of 3</Col>
        <Col style={ColStyle} xs={6}>2 of 3 (wider)</Col>
        <Col style={ColStyle}>3 of 3</Col>
      </Row>
      <Row>
        <Col style={ColStyle}>1 of 3</Col>
        <Col style={ColStyle} xs={5}>2 of 3 (wider)</Col>
        <Col style={ColStyle}>3 of 3</Col>
      </Row>
    </Container>
  </>
);

export const VariableWidthContent = () => (
  <>
    <Description>
      Set the column value (for any breakpoint size) to <code>"auto"</code> to size
      columns based on the natural width of their content.
    </Description>
    <Container>
      <Row className="justify-content-md-center">
        <Col lg="2" style={ColStyle} xs>
          1 of 3
        </Col>
        <Col md="auto" style={ColStyle}>Variable width content</Col>
        <Col lg="2" style={ColStyle} xs>
          3 of 3
        </Col>
      </Row>
      <Row>
        <Col style={ColStyle}>1 of 3</Col>
        <Col md="auto" style={ColStyle}>Variable width content</Col>
        <Col lg="2" style={ColStyle} xs>
          3 of 3
        </Col>
      </Row>
    </Container>
  </>
);

export const ResponsiveGrids = () => (
  <>
    <Description>
      The <code>Col</code> lets you specify column widths across
      6 breakpoint sizes (xs, sm, md, lg, xl and xxl).
      For every breakpoint, you can specify the amount of columns to span,
      or set the prop to <code>{`<Col lg={true} />`}</code> for auto layout widths.
    </Description>
    <Container>
      <Row>
        <Col sm={8} style={ColStyle}>sm=8</Col>
        <Col sm={4} style={ColStyle}>sm=4</Col>
      </Row>
      <Row>
        <Col sm style={ColStyle}>sm=true</Col>
        <Col sm style={ColStyle}>sm=true</Col>
        <Col sm style={ColStyle}>sm=true</Col>
      </Row>
    </Container>
    <br />

    <Description>
      You can also mix and match breakpoints to create different
      grids depending on the screen size.
    </Description>
    <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        <Col md={8} style={ColStyle} xs={12}>
          xs=12 md=8
        </Col>
        <Col md={4} style={ColStyle} xs={6}>
          xs=6 md=4
        </Col>
      </Row>

      {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
      <Row>
        <Col md={4} style={ColStyle} xs={6}>
          xs=6 md=4
        </Col>
        <Col md={4} style={ColStyle} xs={6}>
          xs=6 md=4
        </Col>
        <Col md={4} style={ColStyle} xs={6}>
          xs=6 md=4
        </Col>
      </Row>

      {/* Columns are always 50% wide, on mobile and desktop */}
      <Row>
        <Col style={ColStyle} xs={6}>xs=6</Col>
        <Col style={ColStyle} xs={6}>xs=6</Col>
      </Row>
    </Container>
    <br />

    <Description>
      The <code>Col</code> breakpoint props also have a more complicated <code>object</code>
      prop form: <code>{`{span: number, order: number, offset: number}`}</code> for specifying
      offsets and ordering effects.
      You can use the <code>order</code> property to control the <b>visual order</b> of
      your content.
    </Description>
    <Container>
      <Row>
        <Col style={ColStyle} xs>First, but unordered</Col>
        <Col style={ColStyle} xs={{ order: 12 }}>Second, but last</Col>
        <Col style={ColStyle} xs={{ order: 1 }}>Third, but second</Col>
      </Row>
    </Container>
    <br />

    <Description>
      The <code>order</code> property also supports <code>first (order: -1)</code> and
      <code>last (order: $columns+1)</code>.
    </Description>
    <Container>
      <Row>
        <Col style={ColStyle} xs={{ order: 'last' }}>First, but last</Col>
        <Col style={ColStyle} xs>Second, but unordered</Col>
        <Col style={ColStyle} xs={{ order: 'first' }}>Third, but first</Col>
      </Row>
    </Container>
    <br />

    <Description>
      For offsetting grid columns you can set an <code>offset</code> value or for
      a more general layout, use the margin class utilities.
    </Description>
    <Container>
      <Row>
        <Col md={4} style={ColStyle}>md=4</Col>
        <Col md={{ span: 4, offset: 4 }} style={ColStyle}>{`md={{ span: 4, offset: 4 }}`}</Col>
      </Row>
      <Row>
        <Col md={{ span: 3, offset: 3 }} style={ColStyle}>{`md={{ span: 3, offset: 3 }}`}</Col>
        <Col md={{ span: 3, offset: 3 }} style={ColStyle}>{`md={{ span: 3, offset: 3 }}`}</Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }} style={ColStyle}>{`md={{ span: 6, offset: 3 }}`}</Col>
      </Row>
    </Container>
  </>
);

export const SettingColumnWidthsInRow = () => (
  <>
    <Description>
      The <code>Row</code> lets you specify column widths across
      5 breakpoint sizes (xs, sm, md, lg, xl and xxl).
      For every breakpoint, you can specify the amount of columns that will fit next to each other.
      You can also specify auto to set the columns to their natural widths.
    </Description>
    <Container>
      <Row lg={6} md={4} xs={2}>
        <Col style={ColStyle}>1 of 2</Col>
        <Col style={ColStyle}>2 of 2</Col>
      </Row>
      <Row md={2} xs={1}>
        <Col style={ColStyle}>1 of 3</Col>
        <Col style={ColStyle}>2 of 3</Col>
        <Col style={ColStyle}>3 of 3</Col>
      </Row>
      <Row xs="auto">
        <Col style={ColStyle}>1 of 3</Col>
        <Col style={ColStyle}>2 of 3</Col>
        <Col style={ColStyle}>3 of 3</Col>
      </Row>
    </Container>
    <br />

    <Description>
      Note that <code>Row</code> column widths will override <code>Col</code>
      widths set on lower breakpoints when viewed on larger screens.
      The <code>{`<Col xs={6} />`}</code> size will be overriden by
      <code>{`<Row md={4} />`}</code> on medium and larger screens.
    </Description>
    <Container>
      <Row md={4}>
        <Col style={ColStyle}>1 of 3</Col>
        <Col style={ColStyle} xs={6}>2 of 3</Col>
        <Col style={ColStyle}>3 of 3</Col>
      </Row>
    </Container>
  </>
);
