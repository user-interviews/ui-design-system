import React, { useState } from 'react';

import { faFileAlt, faEllipsisV, faThumbtack } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../Button';
import Card from '../Card';
import CheckboxButton from '../CheckboxButton';
import { Pill } from '../Pill';
import {
 Table, TableBody, TableCell, TableFoot, TableHead, TableRow, TableSortLabel,
} from '.';

import mdx from './Table.mdx';

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

/* eslint-disable object-curly-newline */
const data = [
  { id: 1, firstName: 'Riley', lastName: 'Researcher', new: false, status: 'Approved', email: 'riley@userinterviews.com', phoneNumber: '+18888888888', dateAdded: '01/22/2021', lastInvited: '3 days ago', lastApplied: '1 day ago', date: '03/25/2021', boolean: true, decimal: false, pickAny: false, incentivesEarned: 5 },
  { id: 2, firstName: 'Basel', lastName: 'Fakhoury', new: true, status: 'Approved', email: 'basel123@userinterviews.com', phoneNumber: '+467234460393409', dateAdded: '04/08/2020', lastInvited: null, lastApplied: null, date: '03/25/2021', boolean: true, decimal: false, pickAny: false, incentivesEarned: 5 },
  { id: 3, firstName: 'Bob', lastName: 'Saris', new: false, status: 'Paid', email: 'bob456@userinterviews.com', phoneNumber: '', dateAdded: '01/26/2020', lastInvited: '2 days ago', lastApplied: null, date: '03/25/2021', boolean: true, decimal: false, pickAny: false, incentivesEarned: 5 },
  { id: 4, firstName: 'Dennis', lastName: 'Meng', new: false, status: 'Confirmed', email: 'dennis789@userinterviews.com', phoneNumber: '', dateAdded: '12/21/2020', lastInvited: '6 days ago', lastApplied: '5 days ago', date: '03/25/2021', boolean: true, decimal: false, pickAny: false, incentivesEarned: 5 },
  { id: 5, firstName: 'Erin', lastName: 'May', new: true, status: 'Confirmed', email: 'erin007@userinterviews.com', phoneNumber: '+1499090234', dateAdded: '09/21/2020', lastInvited: null, lastApplied: '23 days ago', date: '03/25/2021', boolean: true, decimal: false, pickAny: false, incentivesEarned: 5 },
  { id: 6, firstName: 'John-Henry', lastName: 'Forster', new: true, status: 'Qualified', email: 'jh247@userinterviews.com', phoneNumber: '+1888938488', dateAdded: '03/14/2021', lastInvited: null, lastApplied: null, date: '03/25/2021', boolean: true, decimal: false, pickAny: false, incentivesEarned: 5 },
  { id: 7, firstName: 'Jason', lastName: 'Basuil', new: true, status: 'Approved', email: 'jason909085119@userinterviews.com', phoneNumber: '', dateAdded: '01/01/2021', lastInvited: null, lastApplied: null, date: '03/25/2021', boolean: true, decimal: false, pickAny: false, incentivesEarned: 5 },
  { id: 8, firstName: 'Rachel', lastName: 'Rapollo', new: true, status: 'Qualified', email: 'rachel777@userinterviews.com', phoneNumber: '+40988881822329308', dateAdded: '07/21/2019', lastInvited: null, lastApplied: null, date: '03/25/2021', boolean: true, decimal: false, pickAny: false, incentivesEarned: 5 },
  { id: 9, firstName: 'JoJo', lastName: 'Lee', new: true, status: 'Approved', email: 'jojo330@userinterviews.com', phoneNumber: '+1898374888', dateAdded: '09/17/2020', lastInvited: '1 day ago', lastApplied: '2 days ago', date: '03/25/2021', boolean: true, decimal: false, pickAny: false, incentivesEarned: 5 },
  { id: 10, firstName: 'Faustino', lastName: 'Gaitan', new: true, status: 'Approved', email: 'faus555@userinterviews.com', phoneNumber: '+90918394789', dateAdded: '06/13/2019', lastInvited: null, lastApplied: null, date: '03/25/2021', boolean: true, decimal: false, pickAny: false, incentivesEarned: 5 },
];

const sortableData = [
  { id: 1, firstName: 'Anna', lastName: 'Boston', incentivesEarned: 0, unsubscribed: false },
  { id: 2, firstName: 'Carly', lastName: 'Dixon', incentivesEarned: 1, unsubscribed: true },
  { id: 3, firstName: 'Erin', lastName: 'Fitzgerald', incentivesEarned: 10, unsubscribed: true },
  { id: 4, firstName: 'Gregg', lastName: 'Harris', incentivesEarned: 20, unsubscribed: true },
  { id: 5, firstName: 'Izzie', lastName: 'Jackson', incentivesEarned: 100, unsubscribed: false },
];

const incentiveData = [
  { id: 1, participant: 'Anna', incentive: '$50.00', processingFee: '$0.00', recruitFee: '$0.00', amount: '$50.00' },
  { id: 2, participant: 'Carly', incentive: '$25.00', processingFee: '$0.00', recruitFee: '$0.00', amount: '$25.00' },
  { id: 3, participant: 'Erin', incentive: '$100.00', processingFee: '$0.00', recruitFee: '$0.00', amount: '$100.00' },
  { id: 4, participant: 'Gregg', incentive: '$250.00', processingFee: '$0.00', recruitFee: '$0.00', amount: '$250.00' },
  { id: 5, participant: 'Izzie', incentive: '$180.00', processingFee: '$0.00', recruitFee: '$0.00', amount: '$180.00' },
  { id: 6, participant: 'Anna', incentive: '$50.00', processingFee: '$0.00', recruitFee: '$0.00', amount: '$50.00' },
  { id: 7, participant: 'Carly', incentive: '$25.00', processingFee: '$0.00', recruitFee: '$0.00', amount: '$25.00' },
  { id: 8, participant: 'Erin', incentive: '$100.00', processingFee: '$0.00', recruitFee: '$0.00', amount: '$100.00' },
  { id: 9, participant: 'Gregg', incentive: '$250.00', processingFee: '$0.00', recruitFee: '$0.00', amount: '$250.00' },
];
/* eslint-enable object-curly-newline */

export function Default() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell header />
          <TableCell header>Status</TableCell>
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
        {data.map(((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.new ? <Pill color="blue" text="New" /> : null}</TableCell>
            <TableCell>{row.status}</TableCell>
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
}

export function LoadingDefault() {
  return (
    <Table isLoading>
      <TableHead>
        <TableRow>
          <TableCell header />
          <TableCell header>Status</TableCell>
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
        {data.map(((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.new ? <Pill color="blue" text="New" /> : null}</TableCell>
            <TableCell>{row.status}</TableCell>
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
}

export function LoadingCustomColumns() {
  return (
    <Table isLoading loadingColumns={[75, 100, 250, 250, 100]} loadingRows={4}>
      <TableHead>
        <TableRow>
          <TableCell header />
          <TableCell header>Status</TableCell>
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
        {data.map(((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.new ? <Pill color="blue" text="New" /> : null}</TableCell>
            <TableCell>{row.status}</TableCell>
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
}

export function TableNoHoverState() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell header />
          <TableCell header>Status</TableCell>
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
        {data.map(((row) => (
          <TableRow key={row.id} removeHover>
            <TableCell>{row.new ? <Pill color="blue" text="New" /> : null}</TableCell>
            <TableCell>{row.status}</TableCell>
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
}

export function TableWithFixedColumnWidths() {
  return (
    <Table style={{ tableLayout: 'fixed' }}>
      <TableHead>
        <TableRow>
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
        {data.map(((row) => (
          <TableRow key={row.id}>
            {/* TODO: Wrap this TableCell in a Popover to show overflow text
              once that component is finished */}
            <TableCell maxWidth={192}>{row.email} (with a max-width)</TableCell>
            <TableCell minWidth={320}>{row.firstName} (with a min-width)</TableCell>
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
}

export function TableOnCard() {
  return (
    <Card
      divided
      size="sm"
      subTitle="Manage a set of templates that can be applied to a project’s automated emails."
      title="Email Template Sets"
    >
      <div
        id="Some table container"
        style={{
        display: 'block',
        maxWidth: 'fit-content',
        overflowX: 'auto',
        overflowY: 'auto',
        whiteSpace: 'nowrap',
    }}
      >
        <Table>
          <TableHead>
            <TableRow>
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
            {data.map(((row) => (
              <TableRow key={row.id}>
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
      </div>
    </Card>
  );
}

export function TableOnCardNoPadding() {
  return (
    <Card
      noPadding
      size="sm"
    >
      <div
        id="Some table container"
        style={{
        display: 'block',
        maxWidth: 'fit-content',
        overflowX: 'auto',
        overflowY: 'auto',
        whiteSpace: 'nowrap',
    }}
      >
        <Table>
          <TableHead>
            <TableRow>
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
            {data.map(((row) => (
              <TableRow key={row.id}>
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
      </div>
    </Card>
  );
}

// TODO: placeholder buttons until the Button component is implemented into the DS
const kebabButton = () => <button aria-label="kebab button" style={{ background: 'none', border: 'none', color: '#337AB7' }} type="button"><FontAwesomeIcon icon={faEllipsisV} /></button>;
const editButton = () => (
  <Button leadingIcon={faFileAlt} variant="outline-primary">Edit</Button>
);
/* eslint-disable react/prop-types */
function PinButton({ isPinActive, ...props }) {
  return <button style={{ background: 'none', border: 'none', color: isPinActive ? '#337AB7' : '#A1A1A1' }} type="button" {...props}><FontAwesomeIcon icon={faThumbtack} /></button>;
}
/* eslint-enable react/prop-types */

export function TableWithSingleActionColumn() {
  return (
    <Table>
      <TableHead>
        <TableRow>
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
        {data.map(((row) => (
          <TableRow key={row.id}>
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
}

export function TableWithMultipleActionColumn() {
  return (
    <Table>
      <TableHead>
        <TableRow>
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
        {data.map(((row) => (
          <TableRow key={row.id}>
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
}

export function TableWithStickyColumnAndHeader() {
  const [isStickyColumn, setIsStickyColumn] = useState(true);

  const handlePinClick = () => {
    setIsStickyColumn((prev) => !prev);
  };

  return (
    <Table>
      <TableHead>
        <TableRow stickyRow>
          <TableCell header stickyColumn={isStickyColumn} stickyColumnOffsetX={0} stickyLeft>
            Email <span style={{ float: 'right' }}><PinButton isPinActive={isStickyColumn} onClick={handlePinClick} /></span>
          </TableCell>
          <TableCell header>First name</TableCell>
          <TableCell header>Last name</TableCell>
          <TableCell header>Phone number</TableCell>
          <TableCell header>Date added</TableCell>
          <TableCell header>Last invited</TableCell>
          <TableCell header>Last applied</TableCell>
          <TableCell header>Date</TableCell>
          <TableCell header>Boolean</TableCell>
          <TableCell header>Decimal</TableCell>
          <TableCell header>Pick any</TableCell>
          <TableCell alignRight header>Incentives earned</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(((row) => (
          <TableRow key={row.id}>
            <TableCell
              stickyColumn={isStickyColumn}
              stickyColumnOffsetX={0}
              stickyLeft
            >{row.email}
            </TableCell>
            <TableCell>{row.firstName}</TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell>{row.phoneNumber}</TableCell>
            <TableCell>{row.dateAdded}</TableCell>
            <TableCell>{row.lastInvited ? row.lastInvited : `-`}</TableCell>
            <TableCell>{row.lastApplied ? row.lastApplied : `-`}</TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.boolean ? 'True' : `-`}</TableCell>
            <TableCell>{row.decimal ? 'True' : `-`}</TableCell>
            <TableCell>{row.pickAny ? 'True' : `-`}</TableCell>
            <TableCell alignRight>{row.incentivesEarned}</TableCell>
          </TableRow>
        )))}
      </TableBody>
    </Table>
  );
}

export function TableWithMultipleStickyColumnsAndHeader() {
  const [isStickyColumn, setIsStickyColumn] = useState(true);

  const handlePinClick = () => {
    setIsStickyColumn((prev) => !prev);
  };

  return (
    <Table>
      <TableHead>
        <TableRow stickyRow>
          <TableCell
            header
            stickyColumn={isStickyColumn}
            stickyColumnOffsetX={0}
            stickyLeft
          >
            Email
          </TableCell>
          <TableCell
            header
            stickyColumn={isStickyColumn}
            stickyColumnOffsetX={160}
            stickyLeft
          >
            First name <span style={{ float: 'right' }}><PinButton isPinActive={isStickyColumn} onClick={handlePinClick} /></span>
          </TableCell>
          <TableCell header>Last name</TableCell>
          <TableCell header>Phone number</TableCell>
          <TableCell header>Date added</TableCell>
          <TableCell header>Last invited</TableCell>
          <TableCell header>Last applied</TableCell>
          <TableCell header>Date</TableCell>
          <TableCell header>Boolean</TableCell>
          <TableCell header>Decimal</TableCell>
          <TableCell header stickyColumn={isStickyColumn}>Pick any</TableCell>
          <TableCell
            header
            stickyColumn={isStickyColumn}
            stickyColumnOffsetX={0}
            stickyRight
          >
            Action
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(((row) => (
          <TableRow key={row.id}>
            <TableCell
              maxWidth={160}
              stickyColumn={isStickyColumn}
              stickyColumnOffsetX={0}
              stickyLeft
            >{row.email}
            </TableCell>
            <TableCell
              minWidth={160}
              stickyColumn={isStickyColumn}
              stickyColumnOffsetX={160}
              stickyLeft
            >{row.firstName}
            </TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell>{row.phoneNumber}</TableCell>
            <TableCell>{row.dateAdded}</TableCell>
            <TableCell>{row.lastInvited ? row.lastInvited : `-`}</TableCell>
            <TableCell>{row.lastApplied ? row.lastApplied : `-`}</TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.boolean ? 'True' : `-`}</TableCell>
            <TableCell>{row.decimal ? 'True' : `-`}</TableCell>
            <TableCell stickyColumn={isStickyColumn}>{row.pickAny ? 'True' : `-`}</TableCell>
            <TableCell
              alignRight
              stickyColumn={isStickyColumn}
              stickyColumnOffsetX={0}
              stickyRight
            >
              {editButton()}
            </TableCell>
          </TableRow>
        )))}
      </TableBody>
    </Table>
  );
}

export function TableWithFooter() {
  return (
    <Table>
      <TableHead>
        <TableRow stickyRow>
          <TableCell header>Participant</TableCell>
          <TableCell header>Incentive</TableCell>
          <TableCell header>Processing fee</TableCell>
          <TableCell header>Recruit fee</TableCell>
          <TableCell header>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {incentiveData.map(((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.participant}</TableCell>
            <TableCell>{row.incentive}</TableCell>
            <TableCell>{row.processingFee}</TableCell>
            <TableCell>{row.recruitFee}</TableCell>
            <TableCell>{row.amount}</TableCell>
          </TableRow>
        )))}
      </TableBody>
      <TableFoot stickyRow>
        <TableRow>
          <TableCell header>Total</TableCell>
          <TableCell header>$1030.00</TableCell>
          <TableCell header>$0.00</TableCell>
          <TableCell header>$0.00</TableCell>
          <TableCell header>$1030.00</TableCell>
        </TableRow>
      </TableFoot>
    </Table>
  );
}

export function TableWithMultipleSelect() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isSelectAllCheckboxChecked, setIsSelectAllCheckboxChecked] = useState(false);

  const handleCheckboxSelectSingle = (id) => {
    if (!selectedRows.includes(id)) {
      setSelectedRows((oldArray) => [...oldArray, id]);
    } else if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    }
  };

  const handleCheckboxSelectAll = (rowData) => {
    setIsSelectAllCheckboxChecked((prev) => !prev);

    if (selectedRows.length > 0 && isSelectAllCheckboxChecked) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rowData.map((row) => row.id));
    }
  };

  const isChecked = (id) => selectedRows.includes(id);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell header>
            <CheckboxButton id="checkbox" onChange={() => handleCheckboxSelectAll(data)} />
          </TableCell>
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
        {data.map(((row) => (
          <TableRow
            clickable
            key={row.id}
            selected={selectedRows.includes(row.id)}
            onClick={() => handleCheckboxSelectSingle(row.id)}
          >
            <TableCell>
              <CheckboxButton
                checked={isChecked(row.id)}
                id="checkbox"
                onChange={() => handleCheckboxSelectSingle(row.id)}
              />
            </TableCell>
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
}

export function TableWithMultipleSelectAndMultipleStickyColumnsAndHeader() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isSelectAllCheckboxChecked, setIsSelectAllCheckboxChecked] = useState(false);

  const handleCheckboxSelectSingle = (id) => {
    if (!selectedRows.includes(id)) {
      setSelectedRows((oldArray) => [...oldArray, id]);
    } else if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    }
  };

  const handleCheckboxSelectAll = (rowData) => {
    setIsSelectAllCheckboxChecked((prev) => !prev);

    if (selectedRows.length > 0 && isSelectAllCheckboxChecked) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rowData.map((row) => row.id));
    }
  };

  const isChecked = (id) => selectedRows.includes(id);

  const [isStickyColumn, setIsStickyColumn] = useState(true);

  const handlePinClick = () => {
    setIsStickyColumn((prev) => !prev);
  };

  return (
    <Table>
      <TableHead>
        <TableRow stickyRow>
          <TableCell header stickyColumn={isStickyColumn} stickyColumnOffsetX={0} stickyLeft>
            <CheckboxButton id="checkbox" onChange={() => handleCheckboxSelectAll(data)} />
          </TableCell>
          <TableCell header stickyColumn={isStickyColumn} stickyColumnOffsetX={61} stickyLeft>Email <span style={{ float: 'right' }}><PinButton isPinActive={isStickyColumn} onClick={handlePinClick} /></span></TableCell>
          <TableCell header>First name</TableCell>
          <TableCell header>Last name</TableCell>
          <TableCell header>Phone number</TableCell>
          <TableCell header>Date added</TableCell>
          <TableCell header>Last invited</TableCell>
          <TableCell
            header
            stickyColumn={isStickyColumn}
            stickyColumnOffsetX={0}
            stickyRight
          >
            Action
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(((row) => (
          <TableRow
            clickable
            key={row.id}
            selected={selectedRows.includes(row.id)}
            onClick={() => handleCheckboxSelectSingle(row.id)}
          >
            <TableCell stickyColumn={isStickyColumn} stickyColumnOffsetX={0} stickyLeft>
              <CheckboxButton
                checked={isChecked(row.id)}
                id="checkbox"
                onChange={() => handleCheckboxSelectSingle(row.id)}
              />
            </TableCell>
            <TableCell
              stickyColumn={isStickyColumn}
              stickyColumnOffsetX={61}
              stickyLeft
            >{row.email}
            </TableCell>
            <TableCell>{row.firstName}</TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell>{row.phoneNumber}</TableCell>
            <TableCell>{row.dateAdded}</TableCell>
            <TableCell>{row.lastInvited ? row.lastInvited : `-`}</TableCell>
            <TableCell
              stickyColumn={isStickyColumn}
              stickyColumnOffsetX={0}
              stickyRight
            >{kebabButton()}
            </TableCell>
          </TableRow>
        )))}
      </TableBody>
    </Table>
  );
}

export function TableWithSorting() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell header>First name</TableCell>
          <TableCell header>Last name</TableCell>
          <TableCell header>Incentives earned <TableSortLabel /></TableCell>
          <TableCell header>Unsubscribed <TableSortLabel /></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortableData.map(((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.firstName}</TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell>{row.incentivesEarned}</TableCell>
            <TableCell>{row.unsubscribed ? 'True' : 'False'}</TableCell>
          </TableRow>
      )))}
      </TableBody>
    </Table>
  );
}

export function TableWithCellRightAlignment() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell header>First name</TableCell>
          <TableCell header>Last name</TableCell>
          <TableCell header>Incentives earned</TableCell>
          <TableCell header>Unsubscribed</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortableData.map(((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.firstName}</TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell alignRight>{row.incentivesEarned}</TableCell>
            <TableCell>{row.unsubscribed ? 'True' : 'False'}</TableCell>
          </TableRow>
      )))}
      </TableBody>
    </Table>
  );
}

export function TableWithCompactOption() {
  const [isCompact, setIsCompact] = useState(true);
  const handleIsCompactClick = () => {
    setIsCompact((prev) => !prev);
  };

  return (
    <div>
      <Button variant="outline-primary" onClick={handleIsCompactClick}>Toggle density</Button>
      <p>{isCompact ? 'Compact' : 'Default'}</p>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell header />
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
          {data.map(((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.new ? <Pill color="blue" text="New" /> : null}</TableCell>
              <TableCell compact={isCompact}>{row.email}</TableCell>
              <TableCell compact={isCompact}>{row.firstName}</TableCell>
              <TableCell compact={isCompact}>{row.lastName}</TableCell>
              <TableCell compact={isCompact}>{row.phoneNumber}</TableCell>
              <TableCell compact={isCompact}>{row.dateAdded}</TableCell>
              <TableCell compact={isCompact}>{row.lastInvited ? row.lastInvited : `-`}</TableCell>
              <TableCell compact={isCompact}>{row.lastApplied ? row.lastApplied : `-`}</TableCell>
            </TableRow>
        )))}
        </TableBody>
      </Table>
    </div>
  );
}
