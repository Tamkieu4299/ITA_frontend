import "./Loader.css";
import React from "react";
import { useAppSelector } from "store/hooks";
import { loaderSelector } from "store/selectors";
import { CircularProgress } from "@mui/material";

export default function Loader() {
    const loader = useAppSelector(loaderSelector);
    const flag = loader.isLoading || false;

    return flag ? (
        <div className="loader-container">
            <div className="loader-gif">
                <CircularProgress size={80} />
            </div>
        </div>
    ) : (
        <></>
    );
}
