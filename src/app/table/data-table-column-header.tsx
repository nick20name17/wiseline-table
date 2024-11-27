import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <button
            onClick={column.getToggleSortingHandler()}
            className="size-full justify-between flex items-center hover:text-foreground transition-colors [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
                <ArrowDown />
            ) : column.getIsSorted() === "asc" ? (
                <ArrowUp />
            ) : (
                <ChevronsUpDown />
            )}
        </button>
    );
}
