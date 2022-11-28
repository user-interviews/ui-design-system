import React from 'react';

import {
 Table, TableHead, TableRow, TableBody, TableCell,
} from '../Table';
import Typography from './Typography';
import mdx from './Typography.mdx';

export default {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const typographyData = [
  { as: 'h1', variant: 'heading3xl', fontWeight: 'regular' },
  { as: 'h2', variant: 'heading2xl', fontWeight: 'regular' },
  { as: 'h3', variant: 'headingXl', fontWeight: 'regular' },
  { as: 'h4', variant: 'headingLg', fontWeight: 'regular' },
  { as: 'h5', variant: 'headingMd', fontWeight: 'regular' },
  { as: 'h6', variant: 'headingSm', fontWeight: 'regular' },
  { as: 'h6', variant: 'headingXs', fontWeight: 'regular' },
  { as: 'p', variant: 'bodyLg', fontWeight: 'regular' },
  { as: 'p', variant: 'bodyMd', fontWeight: 'regular' },
  { as: 'p', variant: 'bodySm', fontWeight: 'regular' },
];

export const Default = () => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell header>as</TableCell>
        <TableCell header>variant</TableCell>
        <TableCell header>fontWeight</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {typographyData.map(((typography) => (
        <TableRow>
          <TableCell>
            <Typography
              as={typography.as}
              fontWeight={typography.fontWeight}
              variant={typography.variant}
            >
              {typography.as}
            </Typography>
          </TableCell>
          <TableCell><code>{typography.variant}</code></TableCell>
          <TableCell>{typography.fontWeight}</TableCell>
        </TableRow>
      )))}
    </TableBody>
  </Table>
);

export const Heading = () => (
  <>
    <Typography as="h1" variant="heading3xl">The fastest way to recruit research participants</Typography>
    <Typography as="h2" variant="heading2xl">The fastest way to recruit research participants</Typography>
    <Typography as="h3" variant="headingXl">The fastest way to recruit research participants</Typography>
    <Typography as="h4" variant="headingLg">The fastest way to recruit research participants</Typography>
    <Typography as="h5" variant="headingMd">The fastest way to recruit research participants</Typography>
    <Typography as="h6" variant="headingSm">The fastest way to recruit research participants</Typography>
    <Typography as="h6" variant="headingXs">The fastest way to recruit research participants</Typography>
  </>
);

export const Body = () => (
  <>
    <Typography as="p" variant="bodyLg">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Typography>
    <Typography as="p" variant="bodyMd">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Typography>
    <Typography as="p" variant="bodySm">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Typography>
  </>
);

export const Alignment = () => (
  <>
    <Typography as="p" textAlign="start">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Typography>
    <Typography as="p" textAlign="center">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Typography>
    <Typography as="p" textAlign="end">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Typography>
  </>
);

export const Weight = () => (
  <>
    <Typography as="p" fontWeight="bold">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Typography>
    <Typography as="p" fontWeight="medium">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Typography>
    <Typography as="p" fontWeight="regular">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Typography>
  </>
);
