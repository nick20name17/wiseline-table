"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OrdersData } from "../ebms.types";
import { CheckCell } from "./cells/check-cell";
import { DatePickerCell } from "./cells/date-picker-cell";
import { PriorityCell } from "./cells/priority-cell";
import { SalesOrderCell } from "./cells/sales-order-cell";
import { DataTableColumnHeader } from "./data-table-column-header";

export const subSubColumns: ColumnDef<OrdersData>[] = [
    {
        accessorKey: "customer",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Customer" />
        ),
        cell: ({ row }) => <div>{row.original?.customer || "-"}</div>,
        size: 250,
    },
    {
        accessorKey: "priority",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Prio." />
        ),
        cell: ({ row }) => <PriorityCell order={row.original} />,
        enableHiding: false,
        size: 112,
    },
    {
        accessorKey: "packages",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Pckgs." />
        ),
        cell: ({ row }) => (
            <SalesOrderCell
                key={row.original?.id}
                name="packages"
                invoice={row.original?.invoice!}
                value={row.original?.sales_order?.packages!}
                itemId={row.original?.sales_order?.id}
                orderId={row.original.id}
            />
        ),
        size: 90,
    },
    {
        accessorKey: "location",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Loc." />
        ),
        cell: ({ row }) => (
            <SalesOrderCell
                key={row.original?.id}
                name="location"
                invoice={row.original?.invoice!}
                value={row.original?.sales_order?.location!}
                itemId={row.original?.sales_order?.id}
                orderId={row.original.id}
            />
        ),
        size: 90,
    },
    {
        accessorKey: "production_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Prod. date" />
        ),
        cell: ({ row }) => <DatePickerCell order={row.original} />,
        enableHiding: false,
        size: 152,
    },
    {
        accessorKey: "ship_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ship date" />
        ),
        cell: ({ row }) => <DatePickerCell order={row.original} />,
        size: 152,
    },
    {
        accessorKey: "assigned",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ASGD" />
        ),
        cell: ({ row }) => (
            <CheckCell
                invoice={row.original.invoice}
                itemId={row.original?.sales_order?.id}
                orderId={row.original.id}
                name="assigned"
                checked={row.original?.sales_order?.assigned || false}
            />
        ),
        size: 80,
    },
    {
        accessorKey: "release_to_production",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="RTP" />
        ),
        cell: ({ row }) => (
            <CheckCell
                invoice={row.original.invoice}
                itemId={row.original?.sales_order?.id}
                orderId={row.original.id}
                name="release_to_production"
                disabled={!row.original.sales_order?.production_date}
                checked={
                    row.original?.sales_order?.release_to_production || false
                }
            />
        ),
        size: 80,
    },
    {
        accessorKey: "cutting_complete",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="CC" />
        ),
        cell: ({ row }) => (
            <CheckCell
                invoice={row.original.invoice}
                itemId={row.original?.sales_order?.id}
                orderId={row.original.id}
                name="cutting_complete"
                checked={row.original?.sales_order?.cutting_complete || false}
            />
        ),
        size: 80,
    },
    {
        accessorKey: "c_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <div>{row.original.c_name || "-"}</div>,
        size: 250,
    },
    {
        accessorKey: "c_city",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="City" />
        ),
        cell: ({ row }) => <div>{row.original.c_city || "-"}</div>,
        size: 128,
    },
    {
        accessorKey: "count_items",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Line Items" />
        ),
        cell: ({ row }) => (
            <div className="text-center">{row.original?.count_items}</div>
        ),
        size: 112,
    },
];
