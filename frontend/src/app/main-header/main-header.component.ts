import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent {

  @Input() name!: string;

  page: string = 'Sign Up';
  route: string = 'login';
  // name!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    // this.getName();
  }

  async ngOnInit() {
  }

  navigateTo() {
    if (this.page == 'Sign Up') {
      this.page = 'Login';
      this.route = 'signup';
    } else {
      this.page = 'Sign Up'
      this.route = 'login';
    }
    this.router.navigate([this.route]);
  }

  // getName() {
  //   this.name = this.authService.getHeaderName();
  // }

  logout() {
    localStorage.removeItem('token');
    this.name = '';
    this.router.navigate(['login']);
  }

}
