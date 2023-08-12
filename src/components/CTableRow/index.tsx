/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

import CCheckbox from "components/CCheckbox";
import CellPopover from "components/CellPopover/CellPopover";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TableCell, TableRow, TableRowProps } from "@mui/material";

interface Props extends TableRowProps {
    isSelected: boolean;
    row: any;
    index: number;
    handleClick: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    havingAction?: boolean;
}

const CTableRow = (props: Props) => {
    const { row, isSelected, handleClick, havingAction = false } = props;
    const { id, ...dataRow } = row;

    const [anchorPopoverEl, setAnchorPopoverEl] = useState<
        Element | ((element: Element) => Element) | null | undefined
    >();

    const closePopover = () => {
        setAnchorPopoverEl(null);
    };

    const handleClickActionRow = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        setAnchorPopoverEl(e.currentTarget);
    };

    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={-1}
            selected={isSelected}
        >
            <TableCell padding="checkbox" align="center">
                <CCheckbox
                    disableRipple
                    size="small"
                    color="primary"
                    checked={isSelected}
                    onChange={(event) => handleClick(event, id)}
                />
            </TableCell>
            {Object.keys(dataRow).map((key, idx) => {
                const dataLength = Object.keys(dataRow).length;

                return !havingAction || idx < dataLength - 1 ? (
                    <TableCell key={`cell-${idx}`} align={"left"}>
                        <span
                            className={
                                key === "status" ? `cell-variant cell-variant__${dataRow[key]}` : ""
                            }
                        >
                            {dataRow[key]}
                        </span>
                    </TableCell>
                ) : (
                    <TableCell key={`cell-${idx}`} align={"center"}>
                        <div className="d-flex align-items-center justify-content-center" key={id}>
                            <MoreVertIcon onClick={handleClickActionRow} />
                            <CellPopover
                                setAnchorPopoverEl={setAnchorPopoverEl}
                                tableRowActions={dataRow[key]}
                                targetId={id}
                                open={!!anchorPopoverEl}
                                anchorEl={anchorPopoverEl}
                                onClose={closePopover}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right"
                                }}
                            />
                        </div>
                    </TableCell>
                );
            })}
        </TableRow>
    );
};

export default CTableRow;
