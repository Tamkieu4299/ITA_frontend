/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./JobCard.css";
import { JobDataProps } from "../../types/jobType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APP, { PAGE_URL } from "../../constants/configs";
import { TextType } from "../../types/textType";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authSelector } from "store/selectors";
import { getCVByUserId, sendQuestionGeneration } from "pages/DisplayJobList/displayJobListSlice";
import { getJDText, getQuestionList } from "pages/User/userSlice";
import { QuestionGeneration } from "pages/interface";

export const JobCard = ({ id, title }: JobDataProps) => {
    const dispatch = useAppDispatch();
    const [isShown, setIsShown] = useState(false);
    const [texts, setTexts] = useState("");
    const [CVId, setCVId] = useState("");
    const navigate = useNavigate();
    const { userInfo } = useAppSelector(authSelector);
    const toggleText = () => {
        setIsShown(!isShown);
    };

    useEffect(() => {
        const getCVIDbyUser = async () => {
            const res: any = await dispatch(
                getCVByUserId({ user_id: userInfo?.id || "" })
            ).unwrap();

            setCVId(res[0].id);
        };
        const fetchTexts = async () => {
            const texts: any = await dispatch(getJDText({ parent_id: id })).unwrap();
            let jdTexts = "";
            for (const textItem of texts as TextType[]) {
                jdTexts += `- ${textItem.text}\n`;
            }
            setTexts(jdTexts);
        };
        fetchTexts();
        getCVIDbyUser();
    }, []);

    const handleApply = async () => {
        const questionGenerationParams: QuestionGeneration = {
            cv_id: CVId,
            jd_id: id,
            bucket_name: APP.BUCKET_S3,
            path: "server-test-01"
        };
        const interviewSession: any = await dispatch(
            sendQuestionGeneration(questionGenerationParams)
        ).unwrap();
        const interviewSessionID = interviewSession["interview_session_id"];
        const questionResponse: any = await dispatch(
            getQuestionList({ interview_session_id: interviewSessionID })
        ).unwrap();

        navigate(PAGE_URL.BASE_AVATAR_LIST, { state: { questionResponse, interviewSessionID } });
    };

    return (
        <div className="jobCard">
            <div className="jobCard__container">
                <div className="jobCard__head">
                    <div className="jobCard__head__items">
                        <div>{title}</div>
                    </div>
                    <span className="jobCard__header__icon">Active</span>
                </div>
                <div className="jobCard__middle">
                    <div className="jobCard__middle__paragraph">
                        <button onClick={toggleText} className="jobCard__middle__button--read">
                            {!isShown ? "Read Job Description" : "Close Job Description"}
                        </button>
                        {isShown && <div className="jobCard__paragraph--expand">{texts}</div>}
                    </div>
                </div>
                {userInfo?.role != "interviewer" && (
                    <div className="jobCard__bottom">
                        <button className="jobCard__bottom__button" onClick={handleApply}>
                            Apply
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
