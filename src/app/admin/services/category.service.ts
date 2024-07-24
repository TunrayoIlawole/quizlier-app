import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryRequestDto } from "../dto/category-request.dto";
import { Observable } from "rxjs";
import { CategoryResponseDto } from "../dto/category-response.dto";


@Injectable({ providedIn: 'root' })
export class CategoryService {
    private baseUrl = 'http://localhost:8056/core/api/v1/category';

    constructor(private http: HttpClient) {}

    createCategory(category: CategoryRequestDto): Observable<CategoryResponseDto> {
        return this.http.post<CategoryResponseDto>(`${this.baseUrl}`, category);
    }

    getCategories(): Observable<CategoryResponseDto[]> {
        return this.http.get<CategoryResponseDto[]>(`${this.baseUrl}`);
    }

    getCategory(id: String): Observable<CategoryResponseDto> {
        return this.http.get<CategoryResponseDto>(`${this.baseUrl}/${id}`)
    }

    updateCategory(id: String): Observable<CategoryResponseDto> {
        return this.http.get<CategoryResponseDto>(`${this.baseUrl}/${id}`)
    }

    deleteCategory(id: String): Observable<CategoryResponseDto> {
        return this.http.get<CategoryResponseDto>(`${this.baseUrl}/${id}`)
    }
}