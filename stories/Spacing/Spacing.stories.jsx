import React from 'react';

import {
 Table, TableBody, TableCell, TableHead, TableRow,
} from 'src/Table';
import { colors } from 'src/Styles';

import mdx from './Spacing.mdx';

export default {
  title: 'Foundations/Spacing',
  component: Spacing,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

/* eslint-disable object-curly-newline */
const data = [
  { id: 1, token: '$ux-spacing-10', rem: '0.25', px: '4' },
  { id: 2, token: '$ux-spacing-20', rem: '0.5', px: '8' },
  { id: 3, token: '$ux-spacing-30', rem: '0.75', px: '12' },
  { id: 4, token: '$ux-spacing-40', rem: '1', px: '16' },
  { id: 5, token: '$ux-spacing-50', rem: '1.5', px: '24' },
  { id: 6, token: '$ux-spacing-60', rem: '2', px: '32' },
  { id: 7, token: '$ux-spacing-70', rem: '3', px: '48' },
];

export const Spacing = () => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell header>Token</TableCell>
        <TableCell header>rem</TableCell>
        <TableCell header>px</TableCell>
        <TableCell header>Example</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map(((row) => (
        <TableRow key={row.id}>
          <TableCell><code>{row.token}</code></TableCell>
          <TableCell>{row.rem}</TableCell>
          <TableCell>{row.px}</TableCell>
          <TableCell>
            <div style={{ height: `${row.rem}rem`, width: `${row.rem}rem`, backgroundColor: colors.UX_PURPLE }} />
          </TableCell>
        </TableRow>
      )))}
    </TableBody>
  </Table>
);
