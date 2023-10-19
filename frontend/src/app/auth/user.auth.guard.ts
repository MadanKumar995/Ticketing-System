import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const UserAuthGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    // console.log('in user auth user id is: ', authService.userId);
    if (authService.userDetails.userId) {
        return true;
    }
    return router.parseUrl('/login');
};