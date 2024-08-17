import { ColumnDef } from "@tanstack/react-table";

export type Activity = {
  id: string;
  ID: string;
  name: string;
  qty: string;
  status: "Pending" | "Approved" | "Rejected";
};

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },  
  {
    accessorKey: "qty",
    header: "Qty",
  },
  
];
