import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OptionRequestDto } from "../dto/option-request.dto";
import { OptionResponseDto } from "../dto/option-response.dto";

@Injectable({ providedIn: 'root' })
export class OptionService {
    private baseUrl = 'http://localhost:8056/core/api/v1/option';

    constructor(private http: HttpClient) {}

    createOption(option: OptionRequestDto, questionId: string | number): Observable<OptionResponseDto> {
        return this.http.post<OptionResponseDto>(`${this.baseUrl}`, option);
    }

    // put question id
    getOptions(questionId: string | number): Observable<OptionResponseDto[]> {
        return this.http.get<OptionResponseDto[]>(`${this.baseUrl}`);
    }

    getOption(id: string | number): Observable<OptionResponseDto> {
        return this.http.get<OptionResponseDto>(`${this.baseUrl}/${id}`)
    }

    updateOption(id: string | number): Observable<OptionResponseDto> {
        return this.http.get<OptionResponseDto>(`${this.baseUrl}/${id}`)
    }

    deleteOption(id: string | number): Observable<OptionResponseDto> {
        return this.http.get<OptionResponseDto>(`${this.baseUrl}/${id}`)
    }
}