import { TestBed } from '@angular/core/testing';

import { TaskRepositoryService } from './task-repository.service';

describe('TaskRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskRepositoryService = TestBed.get(TaskRepositoryService);
    expect(service).toBeTruthy();
  });
});
