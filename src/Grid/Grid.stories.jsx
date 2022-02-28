import React from 'react';

import Card from 'src/Card';
import Grid from 'src/Grid';

import mdx from './Grid.mdx';

export default {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Grid
    container
    justifyContent="center"
    spacing={2}
  >
    <Grid item md={6} xs={12}>
      <Card size="md" title="Grid Card 1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus sem id metus
        tincidunt sodales. Aenean elit felis, pharetra eu condimentum vitae, efficitur
        vel lorem. Fusce ac risus id ante pellentesque tristique. Morbi consequat
        tincidunt erat ac pretium. Nullam ullamcorper tortor nulla. Maecenas sit amet
        arcu vitae mi euismod suscipit. Fusce finibus faucibus dictum.
      </Card>
    </Grid>
    <Grid item md={6} xs={12}>
      <Card size="md" title="Grid Card 2">
        Phasellus quis pulvinar ligula. Pellentesque turpis mauris, vehicula sed venenatis
        sed, aliquet feugiat felis. Ut nisl lorem, ullamcorper id suscipit fermentum, tempus
        eu ex. Quisque a posuere nisl. Donec vitae risus vel eros ornare tempus. Nullam a
        venenatis tortor, id pharetra lacus. Interdum et malesuada fames ac ante ipsum primis
        in faucibus.
      </Card>
    </Grid>
  </Grid>
);
