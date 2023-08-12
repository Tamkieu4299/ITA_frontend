/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import "./InterviewList.scss";
import CTable from "components/CTable";
import CPagination from "components/CPagination";
import { IHandleActionParams, IRowAction, TableHeadCell } from "components/interface";
import { IconButton } from "@mui/material";
import { ActionType, PAGE_URL } from "constants/configs";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CModal, { CModalProps } from "components/CModal/CModal";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getCVById, getInterviewSessionList, getJDById } from "../userSlice";
import { authSelector, userSelector } from "store/selectors";
import { InterviewType } from "types/addedInformation";
import moment from "moment";

const headCells: TableHeadCell[] = [
    {
        id: "Name",
        padding: "normal",
        label: "Name",
        align: "left"
    },
    {
        id: "Candidate",
        padding: "normal",
        label: "Candidate",
        align: "left"
    },
    {
        id: "Date",
        padding: "normal",
        label: "Date",
        align: "left"
    },
    {
        id: "Status",
        padding: "normal",
        label: "Status",
        align: "left"
    },
    { id: "Action", label: "Action", align: "center", padding: "normal" }
];

const InterviewList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [modelContent, setModelContent] = useState<CModalProps>();
    const [interviewList, setInterviewList] = useState<InterviewType[]>([]);
    const { userInfo } = useAppSelector(authSelector);

    const handleAction = async ({ type, payload }: IHandleActionParams) => {
        const modalPopupState: CModalProps = {
            closeText: "Close",
            content: ""
        };

        switch (type) {
            case ActionType.LOG:
                navigate(`${PAGE_URL.INTERVIEW_BASE}/${payload[0]}`);
                break;
            case ActionType.DELETE:
                Object.assign(modalPopupState, {
                    handleConfirm: async () => {
                        for (const id of payload) {
                            // await dispatch(deleteTask({ taskID: [id] }));
                        }
                        // customToast(ToastType.SUCCESS, "Xóa task thành công");
                        handleUpdate();
                    },
                    confirmText: "Delete",
                    maxWidth: "xs",
                    title: "Confirm"
                });
                modalPopupState.detail = (
                    <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                        Are you sure you want to delete this interview?
                    </div>
                );
                break;
            default:
                break;
        }

        setModelContent(modalPopupState);
    };

    const displayData = interviewList.map((data) => {
        const tableRowActions: IRowAction[] = [
            {
                icon: (
                    <IconButton disableRipple sx={{ padding: "4px" }}>
                        <AssignmentIcon />
                    </IconButton>
                ),
                actionType: ActionType.LOG,
                title: "View Detail",
                handle: handleAction
            },
            {
                icon: (
                    <IconButton disableRipple sx={{ padding: "4px" }}>
                        <DeleteIcon />
                    </IconButton>
                ),
                actionType: ActionType.DELETE,
                title: "Delete interview",
                handle: handleAction
            }
        ];

        return {
            ...data,
            action: tableRowActions
        };
    });

    const handleDelete = async (selectedIds: string[]) => {
        await handleAction({ type: ActionType.DELETE, payload: selectedIds });
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = interviewList.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const handleUpdate = useCallback(async () => {
        try {
            // get list
            setSelected([]);
        } catch (err) {
            console.error(err);
            setSelected([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleUpdate();
    }, [handleUpdate]);

    useEffect(() => {
        if (userInfo) {
            const fetchData = async () => {
                const res: any = await dispatch(getInterviewSessionList()).unwrap();
                const transData: InterviewType[] = [];

                for (const data of res) {
                    // eslint-disable-next-line camelcase
                    const { id, created_at, cv_id, jd_id, status } = data;
                    const cvData: any = await dispatch(getCVById(cv_id)).unwrap();
                    const jdData: any = await dispatch(getJDById(jd_id)).unwrap();

                    transData.push({
                        name: jdData.title,
                        candidate: cvData.full_name,
                        id,
                        date: moment(created_at).format("DD/MM/YYYY HH:mm:ss"),
                        status
                    });
                }

                setInterviewList(transData);
            };

            fetchData();
        }
    }, [userInfo]);

    return (
        <div className="interview-list">
            {modelContent && <CModal {...modelContent} />}
            <div className="interview-list__filter"></div>

            <div className="interview-list__table">
                <CTable
                    data={displayData}
                    headCells={headCells}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    selected={selected}
                    handleClick={handleClick}
                    handleSelectAllClick={handleSelectAllClick}
                    isSelected={isSelected}
                    havingAction
                />
                <CPagination
                    maxLength={displayData.length}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                />
            </div>
        </div>
    );
};

export default InterviewList;
