import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Agent } from 'src/app/models/agent';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-agent-login',
  templateUrl: './agent-login.component.html',
  styleUrls: ['./agent-login.component.scss']
})
export class AgentLoginComponent {

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

  login(loginForm: { agentEmail: Pick<Agent, "agentEmail">, password: Pick<Agent, "password"> }) {
    this, this.authService.agentLogin(loginForm.agentEmail, loginForm.password).subscribe();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
