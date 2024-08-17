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
import { Activity } from './columns';
import { ArrowUpDown, EyeIcon } from 'lucide-react';
import React from 'react';
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
           ID
          <Button
            className="p-3 bg-transparent hover:bg-slate-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {/* <ArrowUpDown className="h-4 w-4 text-slate-500" /> */}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('ID')}</div>,
  },

  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2 text-white font-medium text-lg">
          Name
          <Button
            className="p-3 bg-transparent hover:bg-slate-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {/* <ArrowUpDown className="h-4 w-4 text-slate-500" /> */}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'address',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2 text-white font-medium text-lg">
          Address
          <Button
            className="p-3 bg-transparent hover:bg-slate-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('address')}</div>,
  },

  {
    accessorKey: 'orderId',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2 text-white font-medium text-lg">
          OrderId
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
      const amount = parseFloat(row.getValue('orderId'));
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="font-medium">{row.getValue('orderId')}</div>;
    },
  },
  {
    accessorKey: 'deadline',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2 text-white font-medium text-lg">
          Deadline
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
      const amount = parseFloat(row.getValue('deadline'));
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="font-medium">{row.getValue('deadline')}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2 text-white font-medium text-lg">
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
        <div className="flex items-center gap-2 text-white font-medium text-lg">
          View More
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
      // <Badge className={`bg-[${getStatusColor(row.getValue("action"))}]`}>
      <div className="justify-center align-self-center">
        <Badge className={`bg-[${getStatusColor(row.getValue('action'))}]`}>
          <EyeIcon className="h-5 w-5 pt-1" />
        </Badge>

        {/* <Button className="justify-center  ms-4 font-medium text-gray">
          Assign to Driver
        </Button> */}
        {/* <Badge className="bg-[#00ace6] text-white pr-2 pl-2 pb-1 ms-3">
          Assign
        </Badge> */}
      </div>
    ),
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
          <h2  className="font-bold text-black">Order List</h2>

          <div className="relative w-[300px]">
            <input
              style={{ background: '#f2f2f2' }}
              type="text"
              placeholder="Search for Patients..."
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
                    <TableHead key={header.id} className='bg-[#50abe3]'>
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
