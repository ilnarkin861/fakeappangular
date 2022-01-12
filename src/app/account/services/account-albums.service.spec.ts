import { TestBed } from '@angular/core/testing';

import { AccountAlbumsService } from './account-albums.service';

describe('AccountAlbumsService', () => {
  let service: AccountAlbumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountAlbumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
