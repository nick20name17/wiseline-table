"use client";

import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon, RotateCcw } from "lucide-react";

import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { OrdersData } from "@/app/ebms.types";
import { cn } from "@/lib/utils";

interface DatePickerCellProps {
    order: OrdersData;
}

export const getDateToastMessage = (
    date: string | null,
    scheduled: boolean | null | undefined
) => {
    const isEmptyDate = date === null;

    if (isEmptyDate && scheduled === true) {
        return "Production date has been reset. Order moved to Unscheduled";
    }

    if (!isEmptyDate && scheduled === false) {
        return `Production date has been changed to ${format(
            date,
            "MM/dd/yy EEE"
        )}. Order moved to Scheduled`;
    }

    if (isEmptyDate && scheduled === undefined) {
        return "Production date has been reset";
    }

    return `Production date has been changed to ${format(
        date || "",
        "MM/dd/yy EEE"
    )}`;
};

export const DatePickerCell: React.FC<DatePickerCellProps> = ({ order }) => {
    const productionDate = order.sales_order?.production_date
        ? parseISO(order.sales_order?.production_date)
        : undefined;

    const [date, setDate] = useState<Date | undefined>(
        productionDate || new Date()
    );

    return false ? (
        <Button
            variant="ghost"
            className={cn(
                "pointer-events-none w-full justify-start px-2 text-left font-normal",
                !date && "text-muted-foreground"
            )}>
            <CalendarIcon className="mr-2 size-3 flex-shrink-0" />

            {date ? format(date!, "MM/dd/yy EEE") : <span>Not selected</span>}
        </Button>
    ) : (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={order?.completed}
                    variant="outline"
                    className={cn(
                        "w-full justify-start px-1.5 text-left font-normal",
                        !date && "text-muted-foreground"
                    )}>
                    <CalendarIcon className=" !size-3 flex-shrink-0" />
                    {date ? (
                        format(date, "dd.MM.yyyy EEE")
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    onSelect={setDate}
                    mode="single"
                    selected={date}
                    initialFocus
                />
                <div className="flex w-full items-center justify-start gap-x-3 p-3 pt-0">
                    <Button className="flex-1">Set Date</Button>
                    <Button className="flex-1" variant="secondary">
                        Cancel
                    </Button>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    disabled={!productionDate}
                                    size="icon"
                                    variant="destructive">
                                    <RotateCcw className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span>Reset date</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </PopoverContent>
        </Popover>
    );
};
