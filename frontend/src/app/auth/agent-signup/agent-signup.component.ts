import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-agent-signup',
  templateUrl: './agent-signup.component.html',
  styleUrls: ['./agent-signup.component.scss']
})
export class AgentSignupComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.authorizeLogin().subscribe(() => {
      if (this.authService.agentDetails.agentId) {
        // this.router.navigate(['agent/home']);
      }
    });
  }

  signUp(signupForm: { agentName: string, agentEmail: string, agentMobile: string, agentSeverity: number, password: string }) {
    this.authService
      .agentSignUp(signupForm)
      .subscribe((msg) => console.log(msg));
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
