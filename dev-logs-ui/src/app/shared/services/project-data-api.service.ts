import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AddProjectRequestBody, ApiResponseMessage, Project, ProjectDataEndpoints, UpdateProjectRequestBody } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from './api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataApiService {
  baseURL: string = environment.baseUrl;
  private projectEndpoints: ProjectDataEndpoints

  constructor(private http: HttpClient, apiConfig: ApiConfigService) {
    this.projectEndpoints = apiConfig.getApi('projectData')
  }


  getAllProjectsForCategory(id: string): Observable<Project[]> {
    return this.http.get<Project[]>(
      this.baseURL + this.projectEndpoints.getAllProjectsByCategory.replace(':id', id)
    )
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(
      this.baseURL + this.projectEndpoints.getProjectById.replace(':id', id)
    )
  }

  createProject(requestBody: AddProjectRequestBody): Observable<ApiResponseMessage> {
    return this.http.post<ApiResponseMessage>(
      this.baseURL + this.projectEndpoints.addProject,
      requestBody
    )
  }

  updateProject(requestBody: UpdateProjectRequestBody): Observable<ApiResponseMessage> {
    return this.http.put<ApiResponseMessage>(
      this.baseURL + this.projectEndpoints.updateProject,
      requestBody
    )
  }

  deleteProjectById(id: string): Observable<ApiResponseMessage> {
    return this.http.delete<ApiResponseMessage>(
      this.baseURL + this.projectEndpoints.deleteProject.replace(':id', id)
    )
  }
}
