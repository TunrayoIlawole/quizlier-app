import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from "./user.model";
import { RegisterDto } from "./dtos/register.dto";
import { Observable } from "rxjs";
import { LoginDto } from "./dtos/login.dto";
import { RegisterResponseDto } from "./dtos/register-response.dto";
import { LoginResponseDto } from "./dtos/login-response.dto";

@Injectable({ providedIn: 'root' })
export class AuthService {
    // to be updated
    private baseUrl = 'http://localhost:8052/auth/api/v1/auth';
    private jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient) {}

    register(user: RegisterDto, isAdmin: boolean): Observable<RegisterResponseDto> {
        return isAdmin ? this.http.post<RegisterResponseDto>(`${this.baseUrl}/signup/admin`, user) : this.http.post<RegisterResponseDto>(`${this.baseUrl}/signup`, user);
    }

    login(credentials: LoginDto): Observable<LoginResponseDto> {
        return this.http.post<LoginResponseDto>(`${this.baseUrl}/signin`, credentials);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getTokenExpirationDate(token: string): Date | null {
        if (!token) return null;

        return this.jwtHelper.getTokenExpirationDate(token);
    }
}