import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.scss']
})
export class AgentHomeComponent {

  // isOn = false;

  agentStatus: string;

  private url = 'http://localhost:3000/agent/change-status';

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.agentStatus = this.authService.agentDetails.agentStatus;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  changeAgentStatus() {
    let status = '';
    if (this.agentStatus == 'off-duty') {
      status = 'on-duty';
    } else if (this.agentStatus == 'on-duty') {
      status = 'off-duty';
    }
    // this.isOn = !this.isOn;
    const body = { type: 'changeAgentStatus', agentStatus: status }
    this.authService.agentDetails.agentStatus = status;
    this.agentStatus = status;
    this.http.post(this.url, body).subscribe();
  }

}
