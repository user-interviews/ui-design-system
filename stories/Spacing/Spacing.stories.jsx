import React from 'react';

import {
 Table, TableBody, TableCell, TableHead, TableRow,
} from 'src/Table';
import { colors } from 'src/Styles';

import mdx from './Spacing.mdx';

/* eslint-disable object-curly-newline */
const data = [
  { id: 1, token: '$ux-spacing-10', px: '4' },
  { id: 2, token: '$ux-spacing-20', px: '8' },
  { id: 3, token: '$ux-spacing-30', px: '12' },
  { id: 4, token: '$ux-spacing-40', px: '16' },
  { id: 5, token: '$ux-spacing-50', px: '24' },
  { id: 6, token: '$ux-spacing-60', px: '32' },
  { id: 7, token: '$ux-spacing-70', px: '48' },
];

export const Spacing = () => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell header>Token</TableCell>
        <TableCell header>px</TableCell>
        <TableCell header>Example</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map(((row) => (
        <TableRow key={row.id}>
          <TableCell><code>{row.token}</code></TableCell>
          <TableCell>{row.px}</TableCell>
          <TableCell>
            <div style={{ height: `${row.px}px`, width: `${row.px}px`, backgroundColor: colors.UX_PURPLE }} />
          </TableCell>
        </TableRow>
      )))}
    </TableBody>
  </Table>
);

export default {
  title: 'Foundations/Spacing',
  component: Spacing,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
