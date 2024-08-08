import React from 'react';
import classNames from 'classnames';

import {
 Table, TableBody, TableCell, TableHead, TableRow,
} from 'src/Table';

import './Spacing.scss';

import mdx from './Spacing.mdx';

/* eslint-disable object-curly-newline */
const data = [
  { id: 1, token: 'synth-spacing-1', px: '4' },
  { id: 2, token: 'synth-spacing-2', px: '8' },
  { id: 3, token: 'synth-spacing-3', px: '12' },
  { id: 4, token: 'synth-spacing-4', px: '16' },
  { id: 5, token: 'synth-spacing-5', px: '20' },
  { id: 6, token: 'synth-spacing-6', px: '24' },
  { id: 7, token: 'synth-spacing-7', px: '28' },
  { id: 8, token: 'synth-spacing-8', px: '32' },
  { id: 9, token: 'synth-spacing-9', px: '36' },
  { id: 10, token: 'synth-spacing-10', px: '40' },
  { id: 11, token: 'synth-spacing-11', px: '44' },
  { id: 12, token: 'synth-spacing-12', px: '48' },
];

export function Spacing() {
  return (
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
            <TableCell><code>${row.token}</code></TableCell>
            <TableCell>{row.px}</TableCell>
            <TableCell>
              <div className={classNames('spacing-example', row.token)} />
            </TableCell>
          </TableRow>
      )))}
      </TableBody>
    </Table>
  );
}

export default {
  title: 'Foundations/Spacing',
  component: Spacing,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
