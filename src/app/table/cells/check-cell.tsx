import { CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

interface CheckCellProps {
    disabled?: boolean;
    checked: boolean;
    orderId: string;
    name: "assigned" | "release_to_production" | "cutting_complete";
    invoice: string;
    itemId: number;
}

export const CheckCell: React.FC<CheckCellProps> = ({
    disabled = false,
    checked,
    orderId,
    invoice,
    name,
    itemId,
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    const onPressChanage = (checked: boolean) => {
        setIsChecked(checked);
    };

    return (
        <div className="mx-auto flex items-center justify-center">
            {false || name === "cutting_complete" ? (
                <div
                    className={cn(
                        "flex items-center",
                        disabled && "cursor-not-allowed opacity-50 grayscale"
                    )}>
                    {isChecked ? (
                        <>
                            <CheckCircle2 className="mr-1.5 h-4 w-4 flex-shrink-0 text-green-700" />
                            Yes
                        </>
                    ) : (
                        <>
                            <Circle className="mr-1.5 h-4 w-4 flex-shrink-0 text-foreground" />
                            No
                        </>
                    )}
                </div>
            ) : (
                <Toggle
                    disabled={disabled}
                    pressed={isChecked}
                    onPressedChange={onPressChanage}
                    className={cn(
                        "h-8 cursor-pointer data-[state=on]:border-green-600 data-[state=on]:bg-green-700/10",
                        disabled && "cursor-not-allowed opacity-50 grayscale"
                    )}
                    variant="outline"
                    asChild
                    aria-label="Toggle grouped">
                    {isChecked ? (
                        <div>
                            <CheckCircle2 className="mr-1.5 h-4 w-4 flex-shrink-0 text-green-700" />
                            Yes
                        </div>
                    ) : (
                        <div>
                            <Circle className="mr-1.5 h-4 w-4 flex-shrink-0 text-foreground" />
                            No
                        </div>
                    )}
                </Toggle>
            )}
        </div>
    );
};
