import { TestBed } from '@angular/core/testing';

import { AuthRepositoryService } from './auth-repository.service';

describe('AuthRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthRepositoryService = TestBed.get(AuthRepositoryService);
    expect(service).toBeTruthy();
  });
});
