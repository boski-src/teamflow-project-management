import { TestBed } from '@angular/core/testing';

import { TeamRepositoryService } from './team-repository.service';

describe('TeamRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamRepositoryService = TestBed.get(TeamRepositoryService);
    expect(service).toBeTruthy();
  });
});
