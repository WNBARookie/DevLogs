import { TestBed } from '@angular/core/testing';

import { ItemDataApiService } from './item-data-api.service';

describe('ItemDataApiService', () => {
  let service: ItemDataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemDataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
