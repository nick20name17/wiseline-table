"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { AnimatePresence } from "motion/react";
import * as React from "react";
import { OrdersData } from "../ebms.types";
import { CollapsibleRow } from "./collapsible-row";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<_, TValue>({
    columns,
    data,
}: DataTableProps<OrdersData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            columnPinning: {
                left: ["select", "arrow"],
            },
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <div className="space-y-4">
            <ScrollArea
                className={cn("rounded-md border overflow-auto h-[440px]")}>
                <Table>
                    <TableHeader className="sticky top-0 bg-background bg-neutral-100 z-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className={cn(
                                                header.column.getIsPinned()
                                                    ? "sticky left-0 bg-secondary border-r-0 border-b-0 shadow-[inset_-1px_-1px_0] shadow-border"
                                                    : "",
                                                header.column.id === "arrow"
                                                    ? "left-10"
                                                    : ""
                                            )}
                                            style={{
                                                maxWidth:
                                                    header.column.columnDef
                                                        .size,
                                                minWidth:
                                                    header.column.columnDef
                                                        .size,
                                            }}
                                            key={header.id}
                                            colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="[&_tr:last-child]:border-b">
                        <AnimatePresence initial={false}>
                            {table.getRowModel().rows?.length ? (
                                table
                                    .getRowModel()
                                    .rows.map((row) => (
                                        <CollapsibleRow
                                            key={row.original.id}
                                            row={row}
                                        />
                                    ))
                            ) : (
                                <TableRow className="!bg-transparent">
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-left pt-9 pl-10 !bg-transparent">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
