import { ReactNode } from "react";
import { ActionType } from "constants/configs";

type alignPadding = "left" | "right" | "center";
type cellPadding = "checkbox" | "none" | "normal";

export interface IRowAction {
    title: string;
    handle: (data: IHandleActionParams) => Promise<void>;
    icon?: ReactNode;
    actionType: ActionType;
}

export interface IHandleActionParams {
    type: ActionType;
    payload: string[];
}

export interface TableHeadCell {
    padding: cellPadding;
    id: string;
    label: string;
    align: alignPadding;
}
