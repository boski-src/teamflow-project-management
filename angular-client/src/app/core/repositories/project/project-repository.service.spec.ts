import { TestBed } from '@angular/core/testing';

import { ProjectRepositoryService } from './project-repository.service';

describe('ProjectRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectRepositoryService = TestBed.get(ProjectRepositoryService);
    expect(service).toBeTruthy();
  });
});
