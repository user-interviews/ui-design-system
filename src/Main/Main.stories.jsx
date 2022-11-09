import React from 'react';

import Card, { CardSizes } from 'src/Card';
import { CardStack } from 'src/CardStack';
import Main from './Main';
import mdx from './Main.mdx';

export default {
  title: 'Layouts/Main',
  component: Main,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const navStyle = {
 height: '4.5rem', width: '100%', backgroundColor: '#177863', display: 'flex', alignItems: 'center', padding: '1rem',
};
const header1Style = { fontSize: '1.25rem', fontWeight: '700', color: '#FFFFFF' };
const header2Style = { fontSize: '1rem', fontWeight: '700' };
const flexContainerStyle = { display: 'flex', flexDirection: 'row' };
const sidebarStyle = {
 height: '100vh', width: '200px', backgroundColor: '#33312F', color: 'white', padding: '1rem',
};
const mainStyle = { backgroundColor: '#F8F4F2' };

export const Default = () => (
  <Main>
    <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>This is a header</h1>
    <p>With some paragraph text all wrapped in a <code>{'<Main>'}</code></p>
  </Main>
);

export const PageExample = () => (
  <div className="App">
    <nav className="Nav" style={navStyle}>
      <h1 style={header1Style}>Some page title</h1>
    </nav>
    <div style={flexContainerStyle}>
      <div className="Sidebar" style={sidebarStyle}>
        Some sidebar
      </div>
      <Main style={mainStyle}>
        <h2 style={header2Style}>Main content area of this page</h2>
        <p>
          Having at least one main landmark on a page helps with accessibility and allows
          assistive technology (AT) users orient themselves to a page.
        </p>
      </Main>
    </div>
  </div>
);

export const AnotherExample = () => (
  <Main>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CardStack size={CardSizes.SMALL}>
        <Card title="This is a Card" />
        <Card title="And another Card" />
        <Card title="All contained in a Main">
          <p>Always make sure every page has a Main landmark</p>
        </Card>
      </CardStack>
    </div>
  </Main>
);
