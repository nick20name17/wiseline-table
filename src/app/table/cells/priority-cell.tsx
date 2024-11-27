"use client";

import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { OrdersData } from "@/app/ebms.types";

interface PriorityCellProps {
    order: OrdersData;
}
const priorities = [
    {
        name: "NOW",
        color: "#CE2C31",
        position: 120,
        id: 75,
    },
    {
        name: "ASAP",
        color: "#EF5E01",
        position: 110,
        id: 76,
    },
    {
        name: "8:00",
        color: "#FFCA14",
        position: 100,
        id: 77,
    },
    {
        name: "9:00",
        color: "#FFCA14",
        position: 90,
        id: 78,
    },
    {
        name: "10:00",
        color: "#FFCA14",
        position: 80,
        id: 79,
    },
    {
        name: "11:00",
        color: "#FFCA14",
        position: 70,
        id: 80,
    },
    {
        name: "12:00",
        color: "#FFCA14",
        position: 60,
        id: 81,
    },
    {
        name: "1:00",
        color: "#FFCA14",
        position: 50,
        id: 82,
    },
    {
        name: "2:00",
        color: "#FFCA14",
        position: 40,
        id: 83,
    },
    {
        name: "3:00",
        color: "#FFCA14",
        position: 30,
        id: 84,
    },
    {
        name: "4:00",
        color: "#FFCA14",
        position: 20,
        id: 85,
    },
    {
        name: "5:00",
        color: "#FFCA14",
        position: 10,
        id: 86,
    },
];
export const PriorityCell: React.FC<PriorityCellProps> = ({ order }) => {
    const priorityId = order?.sales_order?.priority?.id;

    const [defalutValue, setDefaultValue] = useState(
        priorityId ? String(priorityId) : ""
    );

    useEffect(() => {
        setDefaultValue(priorityId ? String(priorityId) : "");
    }, [priorityId]);

    const successToast = (message: string) => {
        toast.success(`Priority of ${order.invoice} order`, {
            description: message + " successfully",
        });
    };

    const errorToast = (message: string) => {
        toast.error(`Priority of ${order.invoice} order`, {
            description: message,
        });
    };

    const handleAddSalesOrder = async () => {
        successToast("Added");
    };

    const handlePatchSalesOrder = async () => {
        successToast("Updated");
    };

    const [open, setOpen] = useState(false);

    const handleResetPriority = async (id: number) => {
        successToast("Reseted");
    };

    const handleItemMutation = (value: string) => {
        if (order?.sales_order?.id) {
            handlePatchSalesOrder();
        } else {
            handleAddSalesOrder();
        }
    };

    const onValueChange = (value: string) => {
        setDefaultValue(value);
        handleItemMutation(value);
    };

    const isWorkerOrClient = false;

    return isWorkerOrClient ? (
        <Button
            variant="ghost"
            className="pointer-events-none text-center font-normal">
            <span>
                {order?.sales_order?.priority?.name || (
                    <span className="opacity-50">Not selected</span>
                )}
            </span>
        </Button>
    ) : (
        <Select
            open={open}
            onOpenChange={setOpen}
            disabled={!priorities?.length || isWorkerOrClient}
            defaultValue={defalutValue}
            value={defalutValue}
            onValueChange={onValueChange}>
            <SelectTrigger className="text-left">
                <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="max-h-[230px]">
                {priorities?.map((priority) => (
                    <SelectItem
                        key={priority.id}
                        value={priority.id?.toString()}>
                        <div className="flex items-center justify-between gap-x-1.5">
                            <div
                                className="h-3 w-3 rounded-sm"
                                style={{
                                    backgroundColor: priority?.color,
                                }}></div>
                            {priority.name}
                        </div>
                    </SelectItem>
                ))}

                <Separator className="my-1" />

                <Button
                    disabled={!priorities?.length || isWorkerOrClient}
                    onClick={() => handleResetPriority(order?.sales_order?.id)}
                    className="h-8 w-full font-normal"
                    variant="ghost">
                    <RefreshCcw className="mr-2 h-3 w-3" />
                    Reset
                </Button>
            </SelectContent>
        </Select>
    );
};
