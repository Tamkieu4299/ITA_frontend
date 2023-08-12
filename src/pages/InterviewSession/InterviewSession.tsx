/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import "./InterviewSession.css";

import { useRef, useState, useEffect, MouseEventHandler } from "react";
import APP, { PAGE_URL } from "../../constants/configs";
import { v4 as uuid } from "uuid";
import { LoadingFrame } from "../../widgets/LoadingFrame/LoadingFrame";
import loadingFrameContext from "../../constants/loadingFrameContext.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "store/selectors";
import WrapperContainer from "components/WrapperContainer";
import { useAppDispatch } from "store/hooks";
import { getBinaryCodecsFile, getGenerationById, uploadFileToS3 } from "pages/Studio/studioSlice";
import { IQuestionSelection, IS3BinaryParams, IS3Params, ISendAnswer } from "pages/interface";
import {
    createAnswer,
    getQuestionById,
    sendAnswerAnalysis,
    sendQuestionSelection
} from "./interviewSessionSlice";

const taskId = uuid();
export const InterviewSession = () => {
    const [recorderVideo, setRecorderVideo] = useState<MediaRecorder | null>();
    const [recorderAudio, setRecorderAudio] = useState<MediaRecorder | null>();
    const [streamVideo, setStreamVideo] = useState<MediaStream | null>();
    const [streamAudio, setStreamAudio] = useState<MediaStream | null>();
    const [status, setStatus] = useState(false);
    const video = useRef<HTMLVideoElement>(null);
    const videoBlobRef = useRef<Blob | null>(null);
    const audioBlobRef = useRef<Blob | null>(null);
    const [isLoading, SetIsLoading] = useState<boolean>(false);
    const [videoURL, setVideoURL] = useState<string>("");
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const location = useLocation();
    const interviewSessionID = location.state.interviewSessionID;
    const selectedInterviewerId = location.state.selectedInterviewerId;
    const [totalQuestionsLeft, setTotalQuestionsLeft] = useState<number>(
        location.state.totalQuestions
    );
    const [currentQuestionID, setCurrentQuestionID] = useState(location.state.firstQuestion.id);
    const { userInfo } = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    if (!totalQuestionsLeft) {
        navigate(PAGE_URL.THANK_YOU, { state: { from: location.pathname } });
    }

    const fetchQuestionVideo = async (avatarGenerationID: string) => {
        try {
            const generationVideo: any = await dispatch(
                getGenerationById(avatarGenerationID)
            ).unwrap();
            const binaryFileParams: IS3BinaryParams = {
                bucket_name: APP.BUCKET_S3,
                path: generationVideo["path_s3"],
                type: "video"
            };

            const response: any = await dispatch(getBinaryCodecsFile(binaryFileParams)).unwrap();
            const videoBlob = new Blob([response]);
            setVideoURL(URL.createObjectURL(videoBlob));
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    const fetchGenerationIDFromQuestionID = async (questionID: string) => {
        try {
            const questionData: any = await dispatch(getQuestionById(questionID)).unwrap();
            fetchQuestionVideo(questionData["avatar_generation_id"]);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };
    useEffect(() => {
        fetchGenerationIDFromQuestionID(currentQuestionID);
    }, [currentQuestionID]);

    const fetchNextQuestion = async (askedQuestionID: string, isAnswered: boolean) => {
        const sendData: IQuestionSelection = {
            interview_session_id: interviewSessionID,
            interviewer_id: selectedInterviewerId,
            question_id: askedQuestionID,
            is_answered: isAnswered
        };
        const nextQuestionID: any = await dispatch(sendQuestionSelection(sendData)).unwrap();
        setCurrentQuestionID(nextQuestionID["question_id"]);
    };

    const handleVideoEnded = async () => {
        setIsWaiting(true);
    };

    const handleDataAvailableVideo = (ev: BlobEvent) => {
        const blob = new Blob([ev.data], { type: ev.data.type });
        videoBlobRef.current = blob;
    };

    const handleStopVideo = () => {
        if (videoBlobRef.current) {
            handleSend(videoBlobRef.current, "video");
        }
    };

    const handleDataAvailableAudio = (ev: BlobEvent) => {
        const blob = new Blob([ev.data], { type: ev.data.type });
        audioBlobRef.current = blob;
    };

    const handleStopAudio = () => {
        if (audioBlobRef.current) {
            handleSend(audioBlobRef.current, "audio");
        }
    };

    useEffect(() => {
        const openCamera = async () => {
            const mediaDevices = navigator.mediaDevices;
            const streamVideo: MediaStream = await mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            if (video.current) {
                video.current.srcObject = streamVideo;
                video.current.play();
            }
            const recorderVideo = new MediaRecorder(streamVideo);
            recorderVideo.addEventListener("dataavailable", handleDataAvailableVideo);
            recorderVideo.addEventListener("stop", handleStopVideo);
            setStreamVideo(streamVideo);
            setRecorderVideo(recorderVideo);
        };

        const openMicro = async () => {
            const mediaDevices = navigator.mediaDevices;
            const streamAudio: MediaStream = await mediaDevices.getUserMedia({
                audio: true
            });

            const recorderAudio = new MediaRecorder(streamAudio);
            recorderAudio.addEventListener("dataavailable", handleDataAvailableAudio);
            recorderAudio.addEventListener("stop", handleStopAudio);
            setStreamAudio(streamAudio);
            setRecorderAudio(recorderAudio);
        };
        openCamera();
        openMicro();
    }, []);

    const handleSend = async (file: Blob | null | undefined, type: string) => {
        if (file) {
            const userId = userInfo?.id;
            const data = new FormData();
            const sendFile = new File([file], taskId, {
                type: `${type}/${type === "video" ? "mp4" : "wav"}`
            });
            data.append("file", sendFile);
            data.append("filename", sendFile.name);
            const s3Params: IS3Params = {
                bucket_name: APP.BUCKET_S3,
                path: "server-test-01",
                type,
                file_id: taskId,
                user_id: userId || ""
            };

            try {
                // Add blob to s3
                await dispatch(uploadFileToS3({ params: s3Params, file: data }));
            } catch (err) {
                console.log(err);
            }
        }
    };

    // This function will simulate the await api for analysis process from ML
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const handleSendAnswer =
        (isAnswered: boolean): MouseEventHandler<HTMLButtonElement> =>
        async () => {
            if (recorderVideo && streamVideo && recorderAudio && streamAudio) {
                if (isAnswered) {
                    if (!status) {
                        recorderAudio.start();
                        recorderVideo.start();
                    } else {
                        fetchNextQuestion(currentQuestionID, isAnswered);
                        recorderAudio.stop();
                        recorderVideo.stop();

                        const videoUrl = `server-test-01/video/${userInfo?.id}/${taskId}.mp4`;
                        const audioUrl = `server-test-01/audio/${userInfo?.id}/${taskId}.wav`;

                        const answerParams: ISendAnswer = {
                            question_id: currentQuestionID,
                            bucket_s3: APP.BUCKET_S3,
                            video_url: videoUrl,
                            audio_url: audioUrl
                        };
                        const answerObj: any = await dispatch(createAnswer(answerParams)).unwrap();

                        await dispatch(sendAnswerAnalysis({ answer_id: answerObj["id"] }));

                        SetIsLoading(true);
                        await delay(1800);
                        setIsWaiting(false);
                        SetIsLoading(false);
                        setTotalQuestionsLeft(totalQuestionsLeft - 1);
                    }
                } else if (!isAnswered) {
                    fetchNextQuestion(currentQuestionID, isAnswered);
                    const answerParams: ISendAnswer = {
                        question_id: currentQuestionID,
                        bucket_s3: APP.BUCKET_S3,
                        video_url: "noanswer",
                        audio_url: "noanswer"
                    };
                    await dispatch(createAnswer(answerParams)).unwrap();
                    SetIsLoading(true);
                    await delay(1800);
                    setIsWaiting(false);
                    SetIsLoading(false);
                    setTotalQuestionsLeft(totalQuestionsLeft - 1);
                    return;
                }
            }
            setStatus(!status);
        };

    return (
        <div className="interviewSession">
            <WrapperContainer bodyContent>
                <div className="interviewSession__container">
                    <div className="interviewSession__left">
                        {videoURL &&
                            (!isWaiting ? (
                                <video
                                    autoPlay
                                    src={videoURL}
                                    className="interviewSession__left__video"
                                    onEnded={handleVideoEnded}
                                ></video>
                            ) : (
                                <video
                                    autoPlay
                                    src={videoURL}
                                    loop
                                    className="interviewSession__left__video"
                                    onEnded={handleVideoEnded}
                                ></video>
                            ))}
                        {isLoading && (
                            <LoadingFrame context={loadingFrameContext.loadingBetweenQuestions} />
                        )}
                    </div>

                    <div className="interviewSession__right">
                        <video ref={video} className="interviewSession__right__video"></video>
                        <div className="interviewSession__controllers">
                            <button
                                className="interviewSession__controllers__button"
                                onClick={handleSendAnswer(true)}
                            >
                                {!status ? "Start Answer" : "Send answer"}
                            </button>
                            <button
                                className="interviewSession__controllers__button"
                                onClick={handleSendAnswer(false)}
                            >
                                Skip
                            </button>
                        </div>
                    </div>
                </div>
            </WrapperContainer>
        </div>
    );
};
