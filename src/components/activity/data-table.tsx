import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Dialog,
  DialogContent,
  Input,
} from '../ui';
import { Modal } from 'antd';

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
import { Activity } from './columns';
import { ArrowUpDown, EyeIcon, MoreHorizontal } from 'lucide-react';
import React, { useState } from 'react';
import { colors } from '../../styles/colors';

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

//const [isOpen, setIsOpen] = useState(false);

export const columns: ColumnDef<Activity>[] = [
  // {
  //   accessorKey: 'ID',
  //   header: 'ID',
  //   cell: ({ row }) => <div className="capitalize">{row.getValue('ID')}</div>,
  // },
  {
    accessorKey: 'ID',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2 text-white font-medium text-lg">
          Batch ID
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
      <div className="capitalize font-medium text-md"> {"Batch#123"}</div>
    ),
  },

  {
    accessorKey: 'deliveryTime',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2 text-white font-medium text-lg">
          Time
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
      <div className="capitalize font-medium text-md">
        {row.getValue('deliveryTime')}
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2 text-white font-medium text-lg">
          Date
          <Button
            className="p-3 bg-transparent hover:bg-slate-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize font-medium text-md">
        {row.getValue('date')}
      </div>
    ),
  },

  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2 text-white font-medium text-lg">
          Type
          <Button
            className="p-3 bg-transparent hover:bg-slate-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {/* <ArrowUpDown className="h-4 w-4 text-slate-500" /> */}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('type'));
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="font-medium text-md">{row.getValue('type')}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2 text-white font-medium text-lg">
          status
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
      <div className="capitalize font-medium text-md">{'pending'}</div>
    ),
  },
  {
    accessorKey: 'action',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2 text-white font-medium text-lg">
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
      const [isDialogShow, setIsDialogShow] = useState(false); // State to track if the dialog is open
      const [isView, setIsView] = useState('block');

      const handleClick = () => {
        setIsOpen(true);
        setIsDialogOpen(true);
      };
      const handleClickDriver = () => {
        setIsShow(true);
        setIsDialogShow(true);
      };

      return (
        <div className="justify-center align-self-center">
          <Badge className={`bg-[${getStatusColor(row.getValue('action'))}]`}>
            <EyeIcon className="h-5 w-5 pt-1" onClick={handleClick} />
          </Badge>
          <Badge
            onClick={handleClickDriver}
            className="bg-[#00ace6] text-white pr-2 pl-2 pb-1 ms-3"
          >
            Assign
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
                <p className="text-bold font-medium text-lg">Batch#123</p>
                <p className="font-medium text-lg">Pending</p>
              </div>
              <div>
                <div className="mb-3 pl-10 pr-10 flex flex-row items-center justify-between">
                  <div>
                    <p>Order ID</p>
                    <p className="text-bold font-medium text-lg">1234567</p>
                  </div>

                  <div>
                    <p>Order Type</p>
                    <p className="text-bold font-medium text-lg">Normal</p>
                  </div>
                </div>

                <div className="mb-3 pl-10 pr-10 flex flex-row items-center justify-between">
                  <div>
                    <p>Asign to </p>
                    <p className="text-bold font-medium text-lg">john Deo</p>
                  </div>

                  <div>
                    <p>Deadline Date</p>
                    <p className="text-bold font-medium text-lg">17 may 2024</p>
                  </div>
                </div>

                <div className="pl-10 pr-10 flex flex-row items-center justify-between">
                  <div>
                    <p>Delivery Time </p>
                    <p className="text-bold font-medium text-lg">1 to 4 pm</p>
                  </div>

                  <div>
                    <p>Order ID</p>
                    <p className="text-bold font-medium text-lg">1234567</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            open={show}
            onCancel={() => setIsShow(false)}
            footer={[
              <Button key="back"   className={` mr-4 text-white bg-green-500 hover:bg-green-600 `}
              >
                {/* Initiate */}
                {isView === 'block' ? 'Assign' : 'Ok'}
              </Button>,
              <Button
              className=" mr-10 text-black bg-white border border-gray-100 hover:bg-gray-100"
                key="back"
                onClick={() => setIsShow(false)}
              >
                Cancel
              </Button>,
            ]}
          >
            <div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-bold font-medium text-lg">Select Driver</p>
                <select
                      name="deliveryTime"
                     
                      className="p-3 m-3 rounded border-[1.5px] border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Select Driver</option>
                      <option value="9 to 12 am">John Deo </option>
                      <option value="12 to 3 pm">Alex Leo</option>
                      <option value="3 to 6 pm">Gerry merry</option>
                      {/* Add more options as needed */}
                    </select>
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
    <div className="w-full shadow-md">
      <div className="rounded-[10px] border border-stroke bg-white py-6 px-7.5 shadow-md dark:bg-boxdark">
        <div className="flex items-center justify-between pb-5">
          <h2 className="font-bold text-black">Batch List</h2>

          <div className="relative w-[300px]">
            <input
              style={{ background: '#f2f2f2' }}
              type="text"
              placeholder="Search for Batch..."
              className="w-full pl-10 pr-2 py-1 rounded-full  bg-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 left-1 flex items-center pl-2">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
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
                    <TableHead key={header.id} className="bg-[#50abe3]">
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
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
