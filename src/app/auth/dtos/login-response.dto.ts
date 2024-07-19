export interface LoginResponseDto {
    status: string;
    message: string;
    data : {
        id: string;
        username: string;
        email: string;
        token: string;
    }
}


// update this in the backend. Create response dto?