import { TestBed } from '@angular/core/testing';

import { ChatRepositoryService } from './chat-repository.service';

describe('ChatRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatRepositoryService = TestBed.get(ChatRepositoryService);
    expect(service).toBeTruthy();
  });
});
