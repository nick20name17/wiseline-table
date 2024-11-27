"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
    name: "packages" | "location";
    value: number;
    orderId: string;
    itemId: number | undefined;
    invoice: string;
}

export const SalesOrderCell: React.FC<Props> = ({
    value,
    orderId,
    name,
    itemId,
    invoice,
}) => {
    const [currentValue, setCurrentValue] = useState(value);

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        setCurrentValue(value);
    };

    return (
        <div>
            {false ? (
                <Button
                    variant="ghost"
                    className="pointer-events-none w-full text-center font-normal">
                    <span> {currentValue || "-"}</span>
                </Button>
            ) : (
                <Input
                    min={0}
                    value={currentValue || ""}
                    type="number"
                    inputMode="numeric"
                    placeholder="0"
                    onChange={onValueChange}
                />
            )}
        </div>
    );
};
