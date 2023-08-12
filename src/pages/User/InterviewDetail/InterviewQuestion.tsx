/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import React, { useState, useEffect, useMemo } from "react";
import { PairValueType } from "types/addedInformation";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Player } from "video-react";
import { Answer, NullableBlob, Question } from "types/generatedAvatar";
import { useAppDispatch } from "store/hooks";
import { getAnswerByQuestionId } from "../userSlice";
import { EmptyFolder } from "assets";
import { getBinaryFile } from "pages/Studio/studioSlice";

interface Props {
    question: Question;
    index: number;
}

const InterviewQuestion = (props: Props) => {
    const { question, index } = props;
    const dispatch = useAppDispatch();
    const [answer, setAnswer] = useState<Answer | null>(null);
    const [videoBlob, setVideoBlob] = useState<NullableBlob>(null);
    const { question_context, id } = question;
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const scores: PairValueType[] = useMemo(() => {
        if (answer) {
            const { overall_score, professional_score, confidence_score, text_relevancy_score } =
                answer;
            return [
                { title: "Overall", value: overall_score },
                { title: "Professional", value: professional_score },
                { title: "Confidence", value: confidence_score },
                { title: "Text Relevancy", value: text_relevancy_score }
            ];
        }
        return [];
    }, [answer]);

    const analysis: PairValueType[] = useMemo(() => {
        if (answer) {
            const { has_bad_words, emotion_from_text, emotion_from_video, emotion_from_audio } =
                answer;

            return [
                { title: "Have bad words", value: has_bad_words ? "True" : "False" },
                { title: "Emotion from text", value: emotion_from_text },
                { title: "Emotion from video", value: emotion_from_video },
                { title: "Emotion from audio", value: emotion_from_audio }
            ];
        }
        return [];
    }, [answer]);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const answerData: any = await dispatch(getAnswerByQuestionId(id)).unwrap();
                const { video_url, bucket_s3 } = answerData;

                const vidBlob: any = await dispatch(
                    getBinaryFile({ bucket_name: bucket_s3, path: video_url, type: "video" })
                ).unwrap();

                setVideoBlob(vidBlob);
                setAnswer(answerData);
            };

            fetchData();
        }
    }, [id]);

    return (
        <Accordion expanded={isExpanded} onChange={() => setIsExpanded(!isExpanded)}>
            <AccordionSummary
                expandIcon={isExpanded ? <RemoveCircleOutlineIcon /> : <ControlPointIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <span>{index}.</span>
                {question_context}
            </AccordionSummary>
            <AccordionDetails>
                {answer?.video_url === "noanswer" ? (
                    <div className="empty-answer">
                        <p>This question left blank!</p>
                        <img src={EmptyFolder} alt="" />
                    </div>
                ) : (
                    <>
                        <section>
                            <h2>Answer</h2>
                            <div className="answer-detail">
                                <Player src={URL.createObjectURL(new Blob([videoBlob as Blob]))} />
                            </div>
                        </section>

                        <section>
                            <h2>Score</h2>
                            <div className="analysis-scores">
                                {scores.map((score) => (
                                    <div className="answer-score" key={score.title}>
                                        <span className="answer-score__title">{score.title}</span>
                                        <div className="answer-score__circle">
                                            <span>{(score.value as number) * 100}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2>Analysis</h2>
                            <div className="analysis-review">
                                {analysis.map((review) => (
                                    <div className="flex items-center" key={review.title}>
                                        <span className="review-title">{review.title}</span>
                                        <span className="review-value">{review.value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default InterviewQuestion;
