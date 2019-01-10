import { TestBed } from '@angular/core/testing';

import { AccountRepositoryService } from './account-repository.service';

describe('AccountRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountRepositoryService = TestBed.get(AccountRepositoryService);
    expect(service).toBeTruthy();
  });
});
