import { TestBed } from '@angular/core/testing';

import { ProjectDataApiService } from './project-data-api.service';

describe('ProjectDataApiService', () => {
  let service: ProjectDataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
