import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    // console.log('insdie user home: ',this.authService.userId);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
