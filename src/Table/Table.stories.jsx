import { faFileAlt, faEllipsisV, faThumbtack } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Button from 'src/Button';
import Card from 'src/Card';
import CheckboxButton from 'src/CheckboxButton';
import { Pill } from 'src/Pill';
import {
 Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel,
} from 'src/Table';

import styled from 'styled-components';

import { useTable, useAbsoluteLayout, useColumnOrder } from "react-table";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import makeData from './makeData';

import mdx from './Table.mdx';

const Stylesx = styled.div`
  padding: 1rem;

  * {
    box-sizing: border-box;
  }

  .table {
    border: 1px solid #000;
    max-width: 700px;
    overflow-x: auto;
  }

  .header {
    font-weight: bold;
  }

  .rows {
    overflow-y: auto;
  }

  .row {
    border-bottom: 1px solid #000;
    height: 32px;

    &.body {
      :last-child {
        border: 0;
      }
    }
  }

  .cell {
    height: 100%;
    line-height: 31px;
    border-right: 1px solid #000;
    /* padding-left: 5px; */

    :last-child {
      border: 0;
    }
  }
`;

const getItemStyle = ({ isDragging, isDropAnimating }, draggableStyle) => ({
  ...draggableStyle,
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  ...(!isDragging && { transform: "translate(0,0)" }),
  ...(isDropAnimating && { transitionDuration: "0.001s" })

  // styles we need to apply on draggables
});

function Tabley({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI

  console.log('what is the data??? ', data)

  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    setColumnOrder,

    state,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useColumnOrder,
    useAbsoluteLayout,
  );

  const currentColOrder = React.useRef();

  console.log('allColumns before it gets to the table', allColumns)
  console.log('setColumnOrder before it gets to the table', setColumnOrder)
  console.log('rows before it gets to the table', rows)
  console.log('headerGroups before it gets to the table', headerGroups)
  console.log('columns before it gets to the table', columns)
  console.log('state before it gets to the table', state)

  // Render the UI for your table
  return (
    <>
      <div {...getTableProps()} className="table">
        <div>
          {headerGroups.map((headerGroup) => (
            <DragDropContext
              onDragStart={() => {
                console.log('allColumns onDragStart', allColumns)
                currentColOrder.current = allColumns.map((o) => o.id);
              }}
              onDragUpdate={(dragUpdateObj, b) => {
                // console.log("onDragUpdate", dragUpdateObj, b);

                const colOrder = [...currentColOrder.current];
                const sIndex = dragUpdateObj.source.index;
                const dIndex =
                  dragUpdateObj.destination && dragUpdateObj.destination.index;

                if (typeof sIndex === 'number' && typeof dIndex === 'number') {
                  colOrder.splice(sIndex, 1);
                  colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
                  setColumnOrder(colOrder);

                  // console.log(
                  //   "onDragUpdate",
                  //   dragUpdateObj.destination.index,
                  //   dragUpdateObj.source.index
                  // );
                  // console.log(temp);
                }
              }}
            >
              <Droppable direction="horizontal" droppableId="droppable">
                {(droppableProvided, snapshot) => (
                  <div
                    {...headerGroup.getHeaderGroupProps()}
                    className="row header-group"
                    ref={droppableProvided.innerRef}
                  >
                    {headerGroup.headers.map((column, index) => (
                      <Draggable
                        draggableId={column.id}
                        index={index}
                        isDragDisabled={!column.accessor}
                        key={column.id}
                      >
                        {(provided, snapshot) =>
                          // console.log(column.getHeaderProps());

                          // const {
                          //   style,
                          //   ...extraProps
                          // } = column.getHeaderProps();

                          // console.log(style, extraProps);

                           (
                             <div
                               {...column.getHeaderProps()}
                               className="cell header"
                             >
                               <div
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps}
                                // {...extraProps}
                                 ref={provided.innerRef}
                                 style={{
                                  ...getItemStyle(
                                    snapshot,
                                    provided.draggableProps.style,
                                  ),
                                  // ...style
                                }}
                               >
                                 {column.render('Header')}
                               </div>
                             </div>
                          )}
                      </Draggable>
                    ))}
                    {/* {droppableProvided.placeholder} */}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ))}
        </div>

        <div className="rows" {...getTableBodyProps()}>
          {rows.map(
            (row, i) =>
              prepareRow(row) || (
                <div {...row.getRowProps()} className="row body">
                  {row.cells.map((cell) => (
                    <div {...cell.getCellProps()} className="cell">
                      {cell.render('Cell')}
                    </div>
                    ))}
                </div>
              ),
          )}
        </div>
      </div>
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </>
  );
}

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      background: white;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function shuffle(arr) {
  arr = [...arr];
  const shuffled = [];
  while (arr.length) {
    const rand = Math.floor(Math.random() * arr.length);
    shuffled.push(arr.splice(rand, 1)[0]);
  }
  return shuffled;
}

function Tablex({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    visibleColumns,
    prepareRow,
    setColumnOrder,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    useColumnOrder,
  );

  const randomizeColumns = () => {
    setColumnOrder(shuffle(visibleColumns.map((d) => d.id)));
  };

  return (
    <>
      <button onClick={() => randomizeColumns({})}>Randomize Columns</button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, i) => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </>
  );
}

export default {
  title: 'Components/Table',
  component: Table,
  subcomponents: {
 TableBody, TableCell, TableHead, TableRow, TableSortLabel,
},
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
/* eslint-enable object-curly-newline */

export const Default = () => (
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

export const TableWithDnd = () => {
  const columns = React.useMemo(
    () => [

          {
            Header: "First Name",
            accessor: "firstName"
          },
          {
            Header: "Last Name",
            accessor: "lastName"
          },

          {
            Header: "Age",
            accessor: "age",
            width: 50
          },
          {
            Header: "Visits",
            accessor: "visits",
            width: 60
          },
          {
            Header: "Status",
            accessor: "status"
          },
          {
            Header: "Profile Progress",
            accessor: "progress"
          },
    ],
    []
  );

  const datam = React.useMemo(() => makeData(10), []);

  return (
    <Stylesx>
      <h1>hello world</h1>
      <Tabley columns={columns} data={datam} />
    </Stylesx>
  );
};

export const TableWithReactTable = () => {
  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
        col3: 'Time',
        col4: 'More Time',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
        col3: 'Another',
        col4: 'More Time',
      },
      {
        col1: 'whatever',
        col2: 'you want',
        col3: 'Something',
        col4: 'More Time',
      },
      {
        col1: 'huh',
        col2: 'so whatever',
        col3: 'A moment',
        col4: 'More Time',
      },
    ],
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
      {
        Header: 'Column 3',
        accessor: 'col3',
      },
      {
        Header: 'Column 4',
        accessor: 'col4',
      },
    ],
    [],
  );

  const visibleColumns = [
    'col4',
    'col1',
    'col2',
    'col3',
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setColumnOrder,
  } = useTable({ columns, data }, useColumnOrder);

  const randomizeColumns = () => {
    setColumnOrder(shuffle(visibleColumns.map((d) => d.id)));
  };

  return (
    <div>
      <button onClick={() => randomizeColumns({})}>Randomize Columns</button>

      <Table>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow>
              {headerGroup.headers.map((column) => (
                <TableCell header>
                  {column.render('Header')}
                </TableCell>
            ))}
            </TableRow>
        ))}
        </TableHead>
        <TableBody>
          {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow>
              {row.cells.map((cell) => (
                <TableCell>
                  {cell.render('Cell')}
                </TableCell>
                ))}
            </TableRow>
          );
        })}
        </TableBody>
      </Table>
    </div>
  );
};

export const TableWithFixedColumnWidths = () => (
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

export const TableOnStuff = () => {
  const columns = React.useMemo(
    () => [

          {
            Header: 'First Name',
            accessor: 'col1',
          },
          {
            Header: 'Last Name',
            accessor: 'col2',
          },
          {
            Header: 'Age',
            accessor: 'col3',
          },
          {
            Header: 'Visits',
            accessor: 'col4',
          },

    ],
    [],
  );

  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
        col3: 'Time',
        col4: 'More Time',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
        col3: 'Another',
        col4: 'More Time',
      },
      {
        col1: 'whatever',
        col2: 'you want',
        col3: 'Something',
        col4: 'More Time',
      },
      {
        col1: 'huh',
        col2: 'so whatever',
        col3: 'A moment',
        col4: 'More Time',
      },
    ],
    [],
  );

  return (
    <Styles>
      <Tablex columns={columns} data={data} />
    </Styles>
  );
};

export const TableOnCard = () => (
  <Card
    divided
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

export const TableOnCardNoPadding = () => (
  <Card
    noPadding
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

// TODO: placeholder buttons until the Button component is implemented into the DS
const kebabButton = () => <button aria-label="kebab button" style={{ background: 'none', border: 'none', color: '#337AB7' }} type="button"><FontAwesomeIcon icon={faEllipsisV} /></button>;
const editButton = () => (
  <Button leadingIcon={faFileAlt} variant="outline-primary">Edit</Button>
);
/* eslint-disable react/prop-types */
const PinButton = ({ isPinActive, ...props }) => <button style={{ background: 'none', border: 'none', color: isPinActive ? '#337AB7' : '#A1A1A1' }} type="button" {...props}><FontAwesomeIcon icon={faThumbtack} /></button>;
/* eslint-enable react/prop-types */

export const TableWithSingleActionColumn = () => (
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

export const TableWithMultipleActionColumn = () => (
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

export const TableWithStickyColumnAndHeader = () => {
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
};

export const TableWithMultipleStickyColumnsAndHeader = () => {
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
};

export const TableWithMultipleSelect = () => {
  const [selectedRows, setSelectedRows] = useState([]);
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
};

export const TableWithMultipleSelectAndMultipleStickyColumnsAndHeader = () => {
  const [selectedRows, setSelectedRows] = useState([]);
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
};

export const TableWithSorting = () => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell header>First name</TableCell>
        <TableCell header>Last name</TableCell>
        <TableCell header>Incentives earned <TableSortLabel active /></TableCell>
        <TableCell header>Unsubscribed <TableSortLabel active /></TableCell>
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

export const TableWithCellRightAlignment = () => (
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

export const TableWithCompactOption = () => {
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
};
