export interface OptionResponseDto {
    status: string;
    message: string;
    data : {
        id: number,
        optionText: string,
        isCorrect: boolean,
        questionId: number
    }
}