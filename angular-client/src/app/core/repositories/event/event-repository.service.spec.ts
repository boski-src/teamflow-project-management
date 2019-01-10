import { TestBed } from '@angular/core/testing';

import { EventRepositoryService } from './event-repository.service';

describe('EventRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventRepositoryService = TestBed.get(EventRepositoryService);
    expect(service).toBeTruthy();
  });
});
