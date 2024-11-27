"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SubCollapsibleRow } from "./sub-collapbsible-row";
import { subSubColumns } from "./sub-sub-columns";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function SubSubTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<any, TValue>) {
    const table = useReactTable({
        data,
        columns: subSubColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="max-h-[390px] overflow-y-auto rounded-md relative !border">
            <Table className="overflow-clip">
                <TableHeader className="overflow-clip">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            className="hover:bg-zinc-300 !bg-zinc-300 !border-b-0"
                            key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        style={{
                                            maxWidth:
                                                header.column.columnDef.size,
                                            minWidth:
                                                header.column.columnDef.size,
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
                <TableBody className="[&_tr:last-child]:!border-b-0">
                    {table.getRowModel().rows?.length ? (
                        table
                            .getRowModel()
                            .rows.map((row) => (
                                <SubCollapsibleRow
                                    row={row}
                                    key={row.original.id}
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
                </TableBody>
            </Table>
        </div>
    );
}
