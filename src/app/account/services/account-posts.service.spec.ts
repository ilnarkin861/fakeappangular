import { TestBed } from '@angular/core/testing';

import { AccountPostsService } from './account-posts.service';

describe('AccountPostsService', () => {
  let service: AccountPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
