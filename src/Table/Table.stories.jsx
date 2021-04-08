import React from 'react';
import Card from 'src/Card';
import CheckboxButton from 'src/CheckboxButton';
import {
 Table, TableBody, TableCell, TableHead, TableRow,
} from 'src/Table';

export default {
  title: 'Design System/Table',
  component: Table,
};

/* eslint-disable */
const data = [
  { id: 1, firstName: 'Riley', lastName: 'Researcher', email: 'riley@userinterviews.com', phoneNumber: '+18888888888', dateAdded: '01/21/2021', lastInvited: null, lastApplied: null },
  { id: 2, firstName: 'Riley', lastName: 'Researcher', email: 'riley@userinterviews.com', phoneNumber: '+18888888888', dateAdded: '01/21/2021', lastInvited: null, lastApplied: null },
  { id: 3, firstName: 'Riley', lastName: 'Researcher', email: 'riley@userinterviews.com', phoneNumber: '+18888888888', dateAdded: '01/21/2021', lastInvited: null, lastApplied: null },
  { id: 4, firstName: 'Riley', lastName: 'Researcher', email: 'riley@userinterviews.com', phoneNumber: '+18888888888', dateAdded: '01/21/2021', lastInvited: null, lastApplied: null },
  { id: 5, firstName: 'Riley', lastName: 'Researcher', email: 'riley@userinterviews.com', phoneNumber: '+18888888888', dateAdded: '01/21/2021', lastInvited: null, lastApplied: null },
]
/* eslint-disable */

export const BasicTable = () => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell header><CheckboxButton/></TableCell>
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
      {data.map((row => (
        <TableRow key={data.id}>
          <TableCell><CheckboxButton/></TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>{row.firstName}</TableCell>
          <TableCell>{row.lastName}</TableCell>
          <TableCell>{row.phoneNumber}</TableCell>
          <TableCell>{row.dateAdded}</TableCell>
          <TableCell>{row.lastInvited ? row.lastInvited : `-`}</TableCell>
          <TableCell>{row.lastApplied ? row.lastApplied : `-`}</TableCell>
        </TableRow>
      )))}
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
          <TableCell header><CheckboxButton/></TableCell>
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
        {data.map((row => (
          <TableRow key={data.id}>
            <TableCell><CheckboxButton/></TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.firstName}</TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell>{row.phoneNumber}</TableCell>
            <TableCell>{row.dateAdded}</TableCell>
            <TableCell>{row.lastInvited ? row.lastInvited : `-`}</TableCell>
            <TableCell>{row.lastApplied ? row.lastApplied : `-`}</TableCell>
          </TableRow>
        )))}
      </TableBody>
    </Table>
  </Card>
);
