import { faFileAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Card from 'src/Card';
import CheckboxButton from 'src/CheckboxButton';
import {
 Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel,
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

const sortableData = [
  { id: 1, firstName: 'Anna', lastName: 'Boston', incentivesEarned: 0, unsubscribed: false},
  { id: 2, firstName: 'Carly', lastName: 'Dixon', incentivesEarned: 1, unsubscribed: true},
  { id: 3, firstName: 'Erin', lastName: 'Fitzgerald', incentivesEarned: 10, unsubscribed: true},
  { id: 4, firstName: 'Gregg', lastName: 'Harris', incentivesEarned: 20, unsubscribed: true},
  { id: 5, firstName: 'Izzie', lastName: 'Jackson', incentivesEarned: 100, unsubscribed: false},
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

// TODO: placeholder buttons until the Button component is implemented into the DS
const kebabButton = () => <button style={{background: 'none', border: 'none', color: '#337AB7'}}><FontAwesomeIcon icon={faEllipsisV}/></button>
const editButton = () => <button style={{background: 'none', border: '1px solid #337AB7', borderRadius: '4px', color: '#337AB7', fontWeight: "700", padding: "4px 8px"}}><FontAwesomeIcon icon={faFileAlt} style={{marginRight: "10px"}}/>Edit</button>

export const TableWithSingleActionColumn = () => (
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
        <TableCell header>Edit</TableCell>
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
          <TableCell>{editButton()}</TableCell>
        </TableRow>
      )))}
    </TableBody>
  </Table>
);

export const TableWithMultipleActionColumn = () => (
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
        <TableCell header>Edit</TableCell>
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
          <TableCell>{kebabButton()}</TableCell>
        </TableRow>
      )))}
    </TableBody>
  </Table>
);

export const TableWithSorting = () => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell header><CheckboxButton/></TableCell>
        <TableCell header>First name</TableCell>
        <TableCell header>Last name</TableCell>
        <TableCell header>Incentives earned <TableSortLabel active/></TableCell>
        <TableCell header>Unsubscribed <TableSortLabel active/></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {sortableData.map((row => (
        <TableRow key={data.id}>
          <TableCell><CheckboxButton/></TableCell>
          <TableCell>{row.firstName}</TableCell>
          <TableCell>{row.lastName}</TableCell>
          <TableCell>{row.incentivesEarned}</TableCell>
          <TableCell>{row.unsubscribed ? 'True' : 'False'}</TableCell>
        </TableRow>
      )))}
    </TableBody>
  </Table>
);
