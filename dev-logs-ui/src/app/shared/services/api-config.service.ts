import { Injectable } from '@angular/core';
import { EndpointsConfig } from '../config/endpoints.config';
import { ApiEndpoints } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private endpoints: ApiEndpoints = EndpointsConfig;

  getApi<key extends keyof ApiEndpoints>(moduleName: key): ApiEndpoints[key] {
    return this.endpoints[moduleName];
  }
}