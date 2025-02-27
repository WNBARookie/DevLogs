import { Injectable } from '@angular/core';
import {
  AddItemRequestBody,
  ApiResponseMessage,
  Item,
  ItemDataEndpoints,
  UpdateItemRequestBody,
} from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiConfigService } from './api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemDataApiService {
  baseURL: string = environment.baseUrl;
  private itemEndpoints: ItemDataEndpoints;

  constructor(private http: HttpClient, apiConfig: ApiConfigService) {
    this.itemEndpoints = apiConfig.getApi('itemData');
  }

  getAllItemsForProject(id: string): Observable<Item[]> {
    return this.http.get<Item[]>(
      this.baseURL + this.itemEndpoints.getAllItemsForProject.replace(':id', id)
    );
  }

  getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(
      this.baseURL + this.itemEndpoints.getItemById.replace(':id', id)
    );
  }

  createItem(requestBody: AddItemRequestBody): Observable<ApiResponseMessage> {
    return this.http.post<ApiResponseMessage>(
      this.baseURL + this.itemEndpoints.addItem,
      requestBody
    );
  }

  updateItem(
    requestBody: UpdateItemRequestBody
  ): Observable<ApiResponseMessage> {
    return this.http.put<ApiResponseMessage>(
      this.baseURL + this.itemEndpoints.updateItem,
      requestBody
    );
  }

  deleteItemById(id: string): Observable<ApiResponseMessage> {
    return this.http.delete<ApiResponseMessage>(
      this.baseURL + this.itemEndpoints.deleteItem.replace(':id', id)
    );
  }
}
