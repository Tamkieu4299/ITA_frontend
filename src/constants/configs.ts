const APP = {
    NODE_ENV: window.__RUNTIME_CONFIG__.NODE_ENV,
    API_URL: window.__RUNTIME_CONFIG__.API_URL,
    BUCKET_S3: window.__RUNTIME_CONFIG__.BUCKET_S3
};

export enum PAGE_URL {
    HOME = "/",
    STUDIO = "/studio",
    STUDIO_CREATE = "/studio/create",
    STUDIO_EDIT_BASE = "/studio/edit",
    STUDIO_PREVIEW = "/studio/preview",
    STUDIO_FINAL = "/studio/final",
    STUDIO_EDIT_DETAIL = "/studio/edit/:generationId",
    CV_INFORMATION = "/cv_information",
    JD_INFORMATION = "/jd_information",
    BASE_AVATAR_LIST = "/display_avatar_list",
    DETAIL_AVATAR_LIST = "/display_avatar_list/:cvId/:jdId",
    JOB_LIST = "/display_job_list",
    INTERVIEW_SESSION = "/interview_session",
    THANK_YOU = "/thank-you",
    AUTH = "/auth",
    LOGIN = "/auth/login",
    SIGNUP = "/auth/signup",
    USER = "/user",
    ACCOUNT = "/user/my-account",
    INTERVIEW_BASE = "/user/interview",
    INTERVIEW_DETAIL = "/user/interview/:interviewId",
    all = "*"
}

export const STORAGE_KEY = {
    AUTH: "auth"
};

export enum ActionType {
    DELETE = "delete",
    CANCEL = "cancel",
    LOG = "log",
    ACTIVATE = "activate",
    DOWNLOAD = "download",
    EDIT = "edit"
}

export default APP;
