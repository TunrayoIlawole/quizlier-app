import { Option } from "../models/option.interface";


export interface QuestionResponseDto {
    status: string;
    message: string;
    data : {
        id: number,
        question: string,
        categoryId: number,
        options: Option[]
    }
}