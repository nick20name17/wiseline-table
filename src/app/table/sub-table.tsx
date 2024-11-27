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
import { subColumns } from "./sub-columns";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function SubTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<any, TValue>) {
    const table = useReactTable({
        data,
        columns: subColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="max-h-[390px] overflow-y-auto rounded-md relative !border">
            <Table className="overflow-clip">
                <TableHeader className="overflow-clip">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            className="hover:bg-neutral-200 !bg-neutral-300 !border-b-0"
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
                        table.getRowModel().rows.map((row) => (
                            // <TableRow
                            //     className="hover:bg-neutral-200  data-[state=selected]:bg-neutral-200 odd:bg-neutral-100 "
                            //     key={row.id}
                            //     data-state={row.getIsSelected() && "selected"}>
                            //     {row.getVisibleCells().map((cell) => (
                            //         <TableCell
                            //             style={{
                            //                 maxWidth:
                            //                     cell.column.columnDef.size,
                            //                 minWidth:
                            //                     cell.column.columnDef.size,
                            //             }}
                            //             key={cell.id}>
                            //             {flexRender(
                            //                 cell.column.columnDef.cell,
                            //                 cell.getContext()
                            //             )}
                            //         </TableCell>
                            //     ))}
                            // </TableRow>
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
