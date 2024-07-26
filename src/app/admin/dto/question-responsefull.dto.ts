import { Option } from "../models/option.interface";
import { OptionResponseDto } from "./option-response.dto";

export interface QuestionResponseFullDto {
    status: string;
    message: string;
    data : {
        id; number,
        question: string,
        options: Option[]
    }
}