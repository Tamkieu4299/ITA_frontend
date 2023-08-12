import { ISendAnswer } from "pages/interface";
import axiosClient from "../axiosClient";

const answerApi = {
    getAnswerByQuestionId: (id: string) => {
        const url = `/api/v1/studio/answer/get_by_question_id/${id}`;
        return axiosClient.get(url);
    },
    createAnswer: (params: ISendAnswer) => {
        const url = "/api/v1/studio/answer/create";
        return axiosClient.post(url, {}, { params });
    },
    sendAnswerAnalysis: (data: { answer_id: string }) => {
        const url = "/api/v1/studio/answer/send/answer_analysis";
        return axiosClient.post(url, data);
    }
};

export default answerApi;
