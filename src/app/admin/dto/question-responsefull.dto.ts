import { OptionResponseDto } from "./option-response.dto";

export interface QuestionResponseDto {
    status: string;
    message: string;
    data : {
        id; number,
        question: string,
        options: OptionResponseDto[]
    }
}