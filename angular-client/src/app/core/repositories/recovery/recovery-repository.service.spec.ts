import { TestBed } from '@angular/core/testing';

import { RecoveryRepositoryService } from './recovery-repository.service';

describe('RecoveryRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecoveryRepositoryService = TestBed.get(RecoveryRepositoryService);
    expect(service).toBeTruthy();
  });
});
