import { TestBed } from '@angular/core/testing';

import { CategoryDataApiService } from './category-data-api.service';

describe('CategoryDataApiService', () => {
  let service: CategoryDataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
