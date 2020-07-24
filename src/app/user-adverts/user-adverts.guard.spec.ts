import { TestBed } from '@angular/core/testing';

import { UserAdvertsGuard } from './user-adverts.guard';

describe('UserAdvertsGuard', () => {
  let guard: UserAdvertsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserAdvertsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
