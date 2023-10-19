import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ticketing-System';
  name!: string;

  constructor(
    private authService: AuthService,
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.authorizeLogin().subscribe(() => {

        if (this.authService.userDetails.userId) {
          this.name = this.authService.userDetails.userName;
        } else if (this.authService.agentDetails.agentId) {
          this.name = this.authService.agentDetails.agentName;
        }

        // this.authService.userId = val.userId;
      });
    }
    // console.log('in comp : ', this.authService.userId);
  }

}
