import { ColumnDef } from "@tanstack/react-table";

export type Activity = {
  id: string;
  ID: string;
  name: string;
  date: string;
  email: number;
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
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "orderId",
    header: "OrderId",
  },
  {
    accessorKey: "deadline",
    header: "DeadLine",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
];
