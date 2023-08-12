export type AddedInformation = {
    title: string;
    url: string;
    desc: string;
} | null;

export type InterviewType = {
    id: string;
    name: string;
    status: string;
    candidate: string;
    date: string;
};

export type QuestionType = {
    id: string;
    question_context: string;
    answer: string;
    video_url: string;
    overall_score: number;
    confidence_score: number;
    text_relevancy_score: number;
    professional_score: number;
    has_bad_words: boolean;
    emotion_from_text: string;
    emotion_from_audio: string;
    emotion_from_video: string;
};

export type PairValueType = { title: string; value: string | number };
