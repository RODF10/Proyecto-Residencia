import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkRedirectGuard } from './check-redirect.guard';

describe('checkRedirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkRedirectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
