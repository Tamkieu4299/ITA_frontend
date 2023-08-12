/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { Popover, PopoverProps } from "@mui/material";
import { IRowAction } from "components/interface";
import React, { Dispatch, forwardRef } from "react";
import "./cellPopover.scss";

interface Props extends PopoverProps {
    className?: string;
    tableRowActions: IRowAction[];
    setAnchorPopoverEl: Dispatch<
        React.SetStateAction<Element | ((element: Element) => Element) | null | undefined>
    >;
    targetId: string;
}

const CellPopover = forwardRef<any, Props>((props: Props, ref) => {
    const { className, targetId, setAnchorPopoverEl, tableRowActions, ...restProps } = props;

    return (
        <Popover
            ref={ref}
            slotProps={{ paper: { className: `cell-popover ${className}` } }}
            {...restProps}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
            {tableRowActions.map((action) => (
                <div
                    className="cell-popover__action"
                    key={action.title}
                    onClick={() => {
                        setAnchorPopoverEl(null);
                        action.handle({ type: action.actionType, payload: [targetId] });
                    }}
                >
                    {action.icon}
                    <span>{action.title}</span>
                </div>
            ))}
        </Popover>
    );
});

export default CellPopover;
