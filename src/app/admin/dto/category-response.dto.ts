import { Question } from "../models/question.interface";

export interface CategoryResponseDto {
    status: string;
    message: string;
    data : {
        id: string | number;
        name: string;
        description: string;
        question?: Question[];
    }
}