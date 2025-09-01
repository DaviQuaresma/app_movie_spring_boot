import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { middlewareGuard } from './middleware-guard';

describe('middlewareGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => middlewareGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
