import { IQuestionSelection, QuestionGeneration } from "pages/interface";
import axiosClient from "../axiosClient";

const questionApi = {
    getQuestionByInterviewId: (params: { interview_session_id: string }) => {
        const url = "/api/v1/studio/question/get_by_interview_session/";
        return axiosClient.get(url, { params });
    },
    sendQuestionGeneration: (params: QuestionGeneration) => {
        const url = "/api/v1/studio/question/send/question_generation";
        return axiosClient.post(url, {}, { params });
    },
    getQuestionById: (id: string) => {
        const url = `/api/v1/studio/question/get/${id}`;
        return axiosClient.get(url);
    },
    sendQuestionSelection: (data: IQuestionSelection) => {
        const url = "/api/v1/studio/question/send/question_selection";
        return axiosClient.post(url, data);
    }
};

export default questionApi;
