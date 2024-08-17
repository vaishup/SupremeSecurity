import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';

import { Activity } from './columns';
import { ArrowUpDown, EyeIcon } from 'lucide-react';
import { colors } from '../../styles/colors';
import { Modal } from 'antd';

const getStatusColor = (value: string) => {
  switch (value) {
    case 'Pending':
      return colors.pending;
    case 'pending':
      return colors.pending;
    case 'Failed':
      return colors.danger;
    case 'rejected':
      return colors.danger;
    case 'Success':
      return colors.primary;
    case 'completed':
      return colors.primary;
    default:
      return '#fff'; // Return a default color if none of the cases match
  }
};

export const columns: ColumnDef<Activity>[] = [
  // {
  //   accessorKey: 'ID',
  //   header: 'ID',
  //   cell: ({ row }) => <div className="capitalize">{row.getValue('ID')}</div>,
  // },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Driver Name
          <Button
            className="p-3 bg-transparent hover:bg-slate-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {/* <ArrowUpDown className="h-4 w-4 text-slate-500" /> */}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className='font-medium text-md' >{row.getValue('name')}</div>,
  },

  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
         Driver's Email
          <Button
            className="p-3 bg-transparent hover:bg-slate-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {/* <ArrowUpDown className="h-4 w-4 text-slate-500" /> */}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className='font-medium text-md'>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Date
          <Button
            className="p-3 bg-transparent hover:bg-slate-100 font-medium text-md"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            <ArrowUpDown className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('date')}</div>,
  },

  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Status
          <Button
            className="p-3 bg-transparent hover:bg-slate-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {/* <ArrowUpDown className="h-4 w-4 text-slate-500" /> */}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <Badge
        className={`text-white bg-[${getStatusColor(row.getValue('status'))}]`}
      >
        {row.getValue('status').charAt(0).toUpperCase() +
          row.getValue('status').slice(1)}
      </Badge>
    ),
  },
  {
    accessorKey: 'action',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          View More
          <Button
            className="p-3 bg-transparent hover:bg-slate-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          ></Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [show, setIsShow] = useState(false);
      const [isDialogOpen, setIsDialogOpen] = useState(false); // State to track if the dialog is open
      const [isView, setIsView] = useState('block');

      const handleClick = () => {
        setIsOpen(true);
        setIsDialogOpen(true);
      };
     

      return (
        <div className="justify-center align-self-center">
          <Badge className={`bg-[${getStatusColor(row.getValue('action'))}]`}>
            <EyeIcon className="h-5 w-5 pt-1" onClick={handleClick} />
          </Badge>
         
          <Modal
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={[
              // <Button key="back">
              //   {/* Initiate */}
              //   {isView === 'block' ? 'Initiate' : 'Ok'}
              // </Button>,
              <Button
                className="text-black bg-white border-gray"
                key="back"
                onClick={() => setIsOpen(false)}
              >
                OK
              </Button>,
            ]}
          >
             <div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-bold font-medium text-lg">Driver's Details</p>
                <p className="font-medium text-lg">Pending</p>
              </div>
              <div>
                <div className="mb-3 pl-10 pr-10 flex flex-row items-center justify-between">
                  <div>
                    <p>Driver ID</p>
                    <p className="text-bold font-medium text-lg">1234567</p>
                  </div>

                  <div>
                    <p>Driver's Email</p>
                    <p className="text-bold font-medium text-lg">abc@gmail.com</p>
                  </div>
                </div>

                <div className="mb-3 pl-10 pr-10 flex flex-row items-center justify-between">
                  <div className='justify-between'>
                    <p>Driver's Joining Date</p>
                    <p className="text-bold font-medium text-lg">17 may 2024o</p>
                  </div>

                  <div className=''>
                    <p>Driver's Address</p>
                    <p className="text-bold font-medium text-lg">Abc drive  vaughn Ontario</p>
                  </div>
                </div>


                <div className="pl-10 pr-10 flex flex-row items-center justify-between">
                  <div>
                    <p>Delivery Availability </p>
                    <p className="text-bold font-medium text-lg">1 to 4 pm</p>
                  </div>

                  {/* <div>
                    <p>Order ID</p>
                    <p className="text-bold font-medium text-lg">1234567</p>
                  </div> */}
                </div>
              </div>
            </div>
          </Modal>

      
        </div>
      );
    },
  },
];

type ActivityDataTableProps = {
  data: Activity[];
};

export function ActivityDataTable({ data }: ActivityDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-[10px] border border-stroke bg-white py-6 px-7.5 shadow-default dark:bg-boxdark">
        <div className="flex items-center justify-between pb-5">
          {/* <h2  className="font-bold text-black">Batch List</h2> */}

          <div className="
          relative w-[300px]">
            <input
              style={{ background: '#f2f2f2' }}
              type="text"
              placeholder="Search for Drivers..."
              className="w-full pl-10 pr-2 py-1 rounded-full  bg-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 left-1 flex items-center pl-2">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m1.2-4.95a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
              </svg>
            </span>
          </div>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className=''>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
