/* eslint-disable @typescript-eslint/no-explicit-any */
import "./DisplayAvatarList.css";
import { useState, useEffect } from "react";
import { ModelBox } from "../../components/ModelBox/ModelBox";
import descArray from "../../constants/termsData.json";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "../../types/userType";
import AvatarCircle from "../../widgets/AvatarCircle/AvatartCircle";
import AvatarInterviewCard from "../../components/AvatarInterviewCard/AvatarInterviewCard";
import { InterviewDataProps, AvatarGenerationProps } from "../../types/avatarType";
import { PAGE_URL } from "../../constants/configs";
import { GeneratedAvatar } from "../../types/generatedAvatar";
import WrapperContainer from "components/WrapperContainer";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authSelector } from "store/selectors";
import { getBaseGeneration, getUserById } from "./displayAvatarListSlice";

export const DisplayAvatarList = () => {
    const [showModal, setShowModal] = useState(false);
    const [baseAvatarGenerations, setBaseAvatarGenerations] = useState<AvatarGenerationProps[]>([]);
    const [allInterviewers, setAllInterviewers] = useState<User[]>([]);
    const [interviewData, setInterviewData] = useState<InterviewDataProps[]>([]);
    const [displayId, setDisPlayId] = useState(0);
    const [selectedInterviewerId, setSelectedInterviewerId] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const questionResponse = location.state.questionResponse;
    const interviewSessionID = location.state.interviewSessionID;
    const { userInfo } = useAppSelector(authSelector);

    useEffect(() => {
        const fetchDisplayAvatars = async () => {
            const getBaseAvatars: any = await dispatch(getBaseGeneration()).unwrap();
            const allUsers: User[] = [];
            await Promise.all(
                getBaseAvatars.map(async (base: GeneratedAvatar) => {
                    const getUser: any = await dispatch(getUserById(base.user_id)).unwrap();
                    allUsers.push(getUser);
                })
            );
            setBaseAvatarGenerations(getBaseAvatars);
            setAllInterviewers(allUsers);
        };
        fetchDisplayAvatars();
    }, []);

    useEffect(() => {
        const constructInterviewData = () => {
            const interviewDataArray: Array<InterviewDataProps> = [];
            for (const baseAvatarGeneration of baseAvatarGenerations) {
                const interviewer: User = allInterviewers.filter(
                    (interviewer: User) => interviewer?.id === baseAvatarGeneration.user_id
                )[0];
                if (!interviewer) return;
                const interviewData: InterviewDataProps = {
                    audioID: baseAvatarGeneration.audio_id,
                    userID: interviewer.id,
                    username: interviewer.username,
                    role: interviewer.position,
                    image: `server-test-01/image/${userInfo?.id}/ronaldo.jpg`,
                    avatarId: baseAvatarGeneration.id,
                    waitingAvatarId: "server-test-01/interview_session/ronaldo_waiting.mp4"
                };
                interviewDataArray.push(interviewData);
            }
            setInterviewData(interviewDataArray);
        };
        constructInterviewData();
    }, [baseAvatarGenerations, allInterviewers]);

    const handleClickAvatar = (ind: number) => {
        setDisPlayId(ind);
    };

    const handleOpenTerms = (interviewerId: string) => {
        setShowModal(true);
        setSelectedInterviewerId(interviewerId);
    };

    const handleNavigateToInterview = async () => {
        const firstQuestion = questionResponse[0];
        navigate(PAGE_URL.INTERVIEW_SESSION, {
            state: {
                firstQuestion,
                interviewSessionID,
                selectedInterviewerId,
                totalQuestions: questionResponse.length
            }
        });
    };

    return (
        <div className="displayAvatarList">
            <WrapperContainer bodyContent>
                <div className="displayAvatarList__container">
                    <div className="displayAvatarList__avatar__list">
                        {interviewData.length &&
                            interviewData.map((story: InterviewDataProps, index) => {
                                let username = story.username.split(" ").join("").toLowerCase();
                                username =
                                    username.length <= 10 ? username : `${username.slice(0, 8)}...`;
                                const position =
                                    story.role.length <= 10
                                        ? story.role
                                        : `${story.role.slice(0, 8)}...`;
                                return (
                                    <AvatarCircle
                                        key={index}
                                        index={index}
                                        username={username}
                                        image={story.image}
                                        position={position}
                                        handleClickAvatar={handleClickAvatar}
                                    />
                                );
                            })}
                    </div>
                    <div className="displayAvatarList__avatar__cards">
                        <div className="displayAvatarList__avatar__card">
                            {interviewData.length && (
                                <AvatarInterviewCard
                                    key={interviewData[displayId].audioID}
                                    audioID={interviewData[displayId].audioID}
                                    userID={interviewData[displayId].userID}
                                    username={interviewData[displayId].username}
                                    image={interviewData[displayId].image}
                                    position={interviewData[displayId].role}
                                    avatar={interviewData[displayId].waitingAvatarId}
                                    handleOpenTerms={handleOpenTerms}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {showModal ? (
                    <>
                        <div className="displayAvatarList__modelbox">
                            <div className="displayAvatarList__modelbox__container">
                                <div className="displayAvatarList__modelbox__items">
                                    <ModelBox descArray={descArray[0]} />
                                    <div className="displayAvatarList__modelbox__buttons">
                                        <button
                                            className="displayAvatarList__modelbox__button"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Decline
                                        </button>
                                        <button
                                            className="displayAvatarList__modelbox__button-accept"
                                            type="button"
                                            onClick={handleNavigateToInterview}
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="displayAvatarList__modelbox__fade"></div>
                    </>
                ) : null}
            </WrapperContainer>
        </div>
    );
};
