import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.authorizeLogin().subscribe(() => {
      if (this.authService.userDetails.userId) {
        // this.router.navigate(['home']);
      }
    });
    // console.log('inside login user', this.authService.userId);
  }

  login(loginForm: { userEmail: Pick<User, "userEmail">, password: Pick<User, "password"> }) {
    this.authService.login(loginForm.userEmail, loginForm.password).subscribe();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
