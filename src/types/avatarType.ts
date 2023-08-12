export type avatarCircleProps = {
    index: number;
    username: string;
    position: string;
    image: string;
    handleClickAvatar: (index: number) => void;
};

export type InterviewDataProps = {
    audioID: string;
    userID: string;
    username: string;
    role: string;
    image: string;
    avatarId: string;
    waitingAvatarId: string;
};

export type AvatarGenerationProps = {
    id: string;
    audio_id: string;
    image_id: string;
    video_id: string;
    user_id: string;
    bucket_s3: string;
    path_s3: string;
    type: string;
};

export type AvatarInterviewCardProps = {
    audioID: string;
    userID: string;
    username: string;
    position: string;
    image: string;
    avatar: string;
    handleOpenTerms: (interviewerid: string) => void;
};

export type DisplayAvatarListProps = {
    cv_texts: string;
    jd_texts: string;
};
