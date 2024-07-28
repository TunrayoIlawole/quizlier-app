import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QuestionRequestDto } from "../dto/question-request.dto";
import { QuestionResponseDto } from "../dto/question-response.dto";

@Injectable({ providedIn: 'root' })
export class QuestionService {
    private baseUrl = 'http://localhost:8056/core/api/v1/question';

    constructor(private http: HttpClient) {}

    createQuestion(question: QuestionRequestDto, categoryId: string | number): Observable<QuestionResponseDto> {
        return this.http.post<QuestionResponseDto>(`${this.baseUrl}`, question);
    }

    // put category id
    getQuestions(categoryId: string | number): Observable<QuestionResponseDto[]> {
        return this.http.get<QuestionResponseDto[]>(`${this.baseUrl}`);
    }

    getQuestion(id: string | number ): Observable<QuestionResponseDto> {
        return this.http.get<QuestionResponseDto>(`${this.baseUrl}/${id}`)
    }

    updateQuestion(id: string | number): Observable<QuestionResponseDto> {
        return this.http.get<QuestionResponseDto>(`${this.baseUrl}/${id}`)
    }

    deleteQuestion(id: string | number): Observable<QuestionResponseDto> {
        return this.http.get<QuestionResponseDto>(`${this.baseUrl}/${id}`)
    }
}