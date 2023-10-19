import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.authorizeLogin().subscribe(() => {
      if (this.authService.userDetails.userId) {
        // this.router.navigate(['home']);
      }
    });
  }

  signUp(signupForm: { userName: string, userEmail: string, userMobile: string, password: string }) {
    this.authService
      .signUp(signupForm)
      .subscribe((msg) => console.log(msg));
    console.log(signupForm);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
