import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/user/auth.service';
import { inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAdmin()
    ? true
    : inject(Router).createUrlTree(['/forbidden']);
};
