import { Question } from "./question.interface";

export interface Category {
    id : number | string;
    name: string;
    description: string;
    question?: Question[];
}