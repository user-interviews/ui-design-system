import React from 'react';

import { Sidebar } from 'src/Sidebar';

import mdx from './Sidebar.mdx';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Sidebar sidebarHeaderContent={<p style={{fontSize: '1rem', fontWeight: 'bold', margin: 'none'}}>Product/UXR Team from Atlassian</p>}>
    <div>Link</div>
    <div>Link</div>
    <div>Link</div>
    <div>Link</div>
  </Sidebar>
);

Default.args = {

};
