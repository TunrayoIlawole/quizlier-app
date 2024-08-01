export interface RegisterResponseDto {
    status: string;
    message: string;
    data : {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        userRole: string;
    }
}