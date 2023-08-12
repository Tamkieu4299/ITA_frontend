/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./InterviewDetail.scss";

import React, { useEffect, useState } from "react";
import IntervieweeProfile from "./IntervieweeProfile";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { userSelector } from "store/selectors";
import InterviewQuestion from "./InterviewQuestion";
import {
    getCVById,
    getInterviewSessionById,
    getJDById,
    getJDText,
    getQuestionList
} from "../userSlice";
import { CVType, JDType } from "types/generatedAvatar";

const InterviewDetail = () => {
    const dispatch = useAppDispatch();
    const [cvData, setCvData] = useState<CVType | null>(null);
    const [jdData, setJdData] = useState<JDType | null>(null);
    const { interviewId } = useParams();
    const { questionList } = useAppSelector(userSelector);

    useEffect(() => {
        if (interviewId) {
            try {
                const fetchData = async () => {
                    const data: any = await dispatch(getInterviewSessionById(interviewId)).unwrap();
                    const { cv_id, jd_id, id } = data;
                    const cvData: any = await dispatch(getCVById(cv_id)).unwrap();
                    const jdData: any = await dispatch(getJDById(jd_id)).unwrap();
                    const jdTexts: any = await dispatch(getJDText({ parent_id: jd_id })).unwrap();
                    await dispatch(getQuestionList({ interview_session_id: id }));

                    setCvData(cvData);
                    setJdData({ ...jdData, text: jdTexts.map((item: any) => item.text) });
                };

                fetchData();
            } catch (err) {
                console.error(err);
            }
        }
    }, [interviewId]);

    return (
        <div className="interview-detail">
            <div className="interviewee-profile">
                {cvData && <IntervieweeProfile data={cvData} />}
            </div>

            <div className="interviewee-result">
                <h1 className="text-center mb-3">{jdData?.title}</h1>
                {jdData?.text &&
                    jdData.text.map((data, idx) => (
                        <p className="jd-text mb-4" key={idx}>
                            {data}
                        </p>
                    ))}

                <div className="interviewee-answers">
                    {questionList.map((question, idx) => (
                        <InterviewQuestion key={question.id} question={question} index={idx + 1} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InterviewDetail;
