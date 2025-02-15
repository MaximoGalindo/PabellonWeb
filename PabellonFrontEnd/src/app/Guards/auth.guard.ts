import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  let isLogged = false;
  authService.isLoggedUser$.subscribe(status => isLogged = status).unsubscribe();

  if (isLogged) {
    return true;
  } else {
    router.navigate(['admin/login']); 
    return false;
  }
};
