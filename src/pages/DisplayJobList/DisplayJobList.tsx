/* eslint-disable @typescript-eslint/no-explicit-any */
import "./DisplayJobList.css";
import { useEffect, useState } from "react";
import { JobCard } from "../../components/JobCard/JobCard";
import { Job } from "../../types/jobType";
import WrapperContainer from "components/WrapperContainer";
import { useAppDispatch } from "store/hooks";
import { getAllJds } from "./displayJobListSlice";

export const DisplayJobList = () => {
    const [jobs, setJobs] = useState<Array<Job>>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchAllJobs = async () => {
            const res: any = await dispatch(getAllJds()).unwrap();
            setJobs(res);
        };
        fetchAllJobs();
    }, []);

    return (
        <div className="displayJobList">
            <WrapperContainer bodyContent>
                <div className="displayJobList__container">
                    <div className="displayJobList__job__list">
                        {jobs.map((job: Job, index) => {
                            return <JobCard key={index} id={job.id} title={job.title} />;
                        })}
                    </div>
                </div>
            </WrapperContainer>
        </div>
    );
};
