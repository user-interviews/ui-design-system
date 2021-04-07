import React from 'react';
import Card from 'src/Card';
import {
 Table, TableBody, TableCell, TableHead, TableRow,
} from 'src/Table';

export default {
  title: 'Design System/Table',
  component: Table,
};

export const BasicTable = () => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell header><input type="radio" /></TableCell>
        <TableCell header>Email</TableCell>
        <TableCell header>First name</TableCell>
        <TableCell header>Last name</TableCell>
        <TableCell header>Phone number</TableCell>
        <TableCell header>Date added</TableCell>
        <TableCell header>Last invited</TableCell>
        <TableCell header>Last applied</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell><input type="radio" /></TableCell>
        <TableCell>riley@userinterviews.com</TableCell>
        <TableCell>Riley</TableCell>
        <TableCell>Researcher</TableCell>
        <TableCell>+18888888888</TableCell>
        <TableCell>01/21/2021</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><input type="radio" /></TableCell>
        <TableCell>riley@userinterviews.com</TableCell>
        <TableCell>Riley</TableCell>
        <TableCell>Researcher</TableCell>
        <TableCell>+18888888888</TableCell>
        <TableCell>01/21/2021</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><input type="radio" /></TableCell>
        <TableCell>riley@userinterviews.com</TableCell>
        <TableCell>Riley</TableCell>
        <TableCell>Researcher</TableCell>
        <TableCell>+18888888888</TableCell>
        <TableCell>01/21/2021</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const TableOnCard = () => (
  <Card
    divided
    subTitle="Manage a set of templates that can be applied to a project’s automated emails."
    title="Email Template Sets"
  >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell header><input type="radio" /></TableCell>
          <TableCell header>Email</TableCell>
          <TableCell header>First name</TableCell>
          <TableCell header>Last name</TableCell>
          <TableCell header>Phone number</TableCell>
          <TableCell header>Date added</TableCell>
          <TableCell header>Last invited</TableCell>
          <TableCell header>Last applied</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell><input type="radio" /></TableCell>
          <TableCell>riley@userinterviews.com</TableCell>
          <TableCell>Riley</TableCell>
          <TableCell>Researcher</TableCell>
          <TableCell>+18888888888</TableCell>
          <TableCell>01/21/2021</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><input type="radio" /></TableCell>
          <TableCell>riley@userinterviews.com</TableCell>
          <TableCell>Riley</TableCell>
          <TableCell>Researcher</TableCell>
          <TableCell>+18888888888</TableCell>
          <TableCell>01/21/2021</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><input type="radio" /></TableCell>
          <TableCell>riley@userinterviews.com</TableCell>
          <TableCell>Riley</TableCell>
          <TableCell>Researcher</TableCell>
          <TableCell>+18888888888</TableCell>
          <TableCell>01/21/2021</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
);
