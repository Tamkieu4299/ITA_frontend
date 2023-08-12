export type Paragraph = {
    heading: string;
    paragraph: string;
} | null;

export type ParagraphModel = {
    title: string;
    content: Paragraph[];
} | null;
