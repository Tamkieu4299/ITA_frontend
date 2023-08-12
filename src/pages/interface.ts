import { ReactNode } from "react";
import { InterviewType } from "types/addedInformation";
import {
    GeneratedAvatar,
    NullableBlob,
    NullableFile,
    NullableString,
    Question
} from "types/generatedAvatar";
import { User } from "types/userType";
export interface IAuth {
    token?: NullableString;
    userInfo?: Partial<User>;
}

export interface IStudio {
    activeTabIndex: number;
    avatarList: GeneratedAvatar[];
}

export interface IUser {
    interviewList: InterviewType[];
    questionList: Question[];
}

export interface IStudioForm {
    file: NullableFile;
    recorder: NullableBlob;
    audio: NullableFile;
    fileName: string;
    audioName: string;
}

export interface IVideoParams {
    file_name: string;
    user_id: string;
    language: string;
    duration: number;
}

export interface IVideoUpload {
    file: FormData;
    params: IVideoParams;
}

export interface IImageParams {
    file_name: string;
    user_id: string;
}

export interface IImageUpload {
    file: FormData;
    params: IImageParams;
}

export interface talkingMLParams {
    bucket_name: string;
    task_id: string;
    video_key: string;
    image_key: string;
    audio_key: string;
    text: string;
}

export interface QuestionGeneration {
    cv_id: string;
    jd_id: string;
    bucket_name: string;
    path: string;
}

export interface IS3BinaryParams {
    bucket_name: string;
    path: string;
    type: string;
}

export interface IS3Upload {
    file: FormData;
    params: IS3Params;
}

export interface IS3Params {
    bucket_name: string;
    path: string;
    type: string;
    file_id: string;
    user_id: string;
}

export interface CVUpload {
    file: FormData;
    params: CVParams;
}

export interface CVParams {
    user_id: string;
    full_name: string;
    email: string;
    phone_number: string;
    description: string;
    bucket_name: string;
    path: string;
}

export interface IFormLogin {
    username: string;
    password: string;
}

export interface IFormAuth extends IFormLogin {
    confirmPassword: string;
}

export interface ISidebarItem {
    title: string;
    icon: JSX.Element;
    to: string;
    isActive: boolean;
}

export interface BaseProps {
    children?: ReactNode;
}

export interface IQuestionSelection {
    interview_session_id: string;
    interviewer_id: string;
    question_id: string;
    is_answered: boolean;
}

export interface ISendAnswer {
    bucket_s3: string;
    video_url: string;
    audio_url: string;
    question_id: string;
}
