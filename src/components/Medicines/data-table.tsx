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
    No.
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
         Medicine
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
    accessorKey: 'qty',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2 text-white font-medium text-lg">
          Qty
          <Button
            className="p-3 bg-transparent hover:bg-slate-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {/* <ArrowUpDown className="h-4 w-4 text-slate-500 color-white" /> */}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('qty')}</div>,
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
<div className="w-1/2 shadow-md">
  <div className="border-[#50abe3] shadow-md rounded-lg overflow-hidden">
    <Table className="w-full border-[#50abe3]-collapse">
      <TableHeader className="bg-[#50abe3]">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="border-none">
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="border-none">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className="border-b border-none last:border-b-0"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="border-none">
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
              className="h-24 text-center border-none"
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
