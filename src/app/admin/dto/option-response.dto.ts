export interface OptionResponseDto {
    status: string;
    message: string;
    data : {
        id; number,
        option_text: string,
        isCorrect: boolean
    }
}