import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category, CategoryDataEndpoints } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from './api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataApiService {
  baseURL: string = environment.baseUrl;
  private categoryEndpoints: CategoryDataEndpoints

  constructor(private http: HttpClient, apiConfig: ApiConfigService) {
    this.categoryEndpoints = apiConfig.getApi('categoryData');
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      this.baseURL + this.categoryEndpoints.getAllCategories
    )
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(
      this.baseURL + this.categoryEndpoints.getCategoryById.replace(':id', id)
    )
  }
}
