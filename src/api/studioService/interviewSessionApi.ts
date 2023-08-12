import axiosClient from "../axiosClient";

const interviewSessionApi = {
    getInterviewSessionList: () => {
        const url = "/api/v1/studio/interview_session/";
        return axiosClient.get(url);
    },
    getInterviewSessionById: (id: string) => {
        const url = `/api/v1/studio/interview_session/get/${id}`;
        return axiosClient.get(url);
    }
};

export default interviewSessionApi;
