export interface CategoryResponseDto {
    status: string;
    message: string;
    data : {
        id: string;
        name: string;
        description: string;
    }
}