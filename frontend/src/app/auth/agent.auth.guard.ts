import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const AgentAuthGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.agentDetails.agentId) {
        return true;
    }
    return router.parseUrl('/agent/login');
};