import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { flexRender, Row } from "@tanstack/react-table";
import { motion } from "motion/react";
import { OrdersData } from "../ebms.types";
import { columns } from "./columns";
import { SubSubTable } from "./sub-sub-table";

interface CollapsibleRowProps<TData> {
    row: Row<OrdersData>;
}

export const SubCollapsibleRow: React.FC<CollapsibleRowProps<any>> = ({
    row,
}) => {
    const MotionTableRow = motion(TableRow, {
        forwardMotionProps: true,
    });

    const MotionTableCell = motion(TableCell, {
        forwardMotionProps: true,
    });

    return (
        <Collapsible asChild>
            <>
                <MotionTableRow
                    layout
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 0.15,
                            type: "spring",
                        },
                    }}
                    data-state={row.getIsSelected() ? "selected" : undefined}>
                    {row.getVisibleCells().map((cell) => (
                        <MotionTableCell
                            layout
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.15,
                                    type: "spring",
                                },
                            }}
                            className={cn(
                                cell.column.getIsPinned()
                                    ? "sticky top-7 z-30 left-0 bg-secondary border-r-0 shadow-[inset_-1px_0_0]  shadow-border"
                                    : "",
                                cell.column.id === "arrow" ? "left-10" : ""
                            )}
                            style={{
                                maxWidth: cell.column.columnDef.size,
                                minWidth: cell.column.columnDef.size,
                            }}
                            key={cell.id}>
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                        </MotionTableCell>
                    ))}
                </MotionTableRow>
                <CollapsibleContent asChild>
                    <motion.tr
                        layout
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.15,
                                type: "spring",
                            },
                        }}>
                        <td
                            className="max-w-[100vw] py-2 pr-3 pl-2 bg-background"
                            colSpan={row.getVisibleCells().length}>
                            <SubSubTable
                                columns={columns}
                                data={[row.original]}
                            />
                        </td>
                    </motion.tr>
                </CollapsibleContent>
            </>
        </Collapsible>
    );
};
