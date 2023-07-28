"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  totalPrice: string;
  products: string;
  isPaid: boolean;

  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Produtos",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Endereço",
  },
  {
    accessorKey: "totalPrice",
    header: "Valor total",
  },
  {
    accessorKey: "isPaid",
    header: "Pagou",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
