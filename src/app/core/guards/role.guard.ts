import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService)
  const router = inject(Router)

  if (!authenticationService.isRoleLevelTwo()) {
    router.navigateByUrl("checking/fair")
  }

  return true;
};
