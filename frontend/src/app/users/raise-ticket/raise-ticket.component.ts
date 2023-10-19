import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.scss']
})
export class RaiseTicketComponent {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  private url = 'http://localhost:3000/tickets/';

  reason: string =
    'Optional if name spelling mistake\nMandatory* if you change your Mobile number' +
    '\nMandatory* if name got change Example: old name - John -> Edit name - Tom' +
    '\n(Max 500 characters only)'
    ;
  reasonDisable: string = 'Reason to Disable account\n(Max 500 characters only)';
  ticketType: string = '';

  showType(type: string) {
    this.ticketType = type;
  }

  rasieUpdateProfile(form: { name: string, mobile: string, reason: string }) {
    const body = { ticketType: 'update', severity: 1, reqName: form.name, reqMobile: form.mobile, reason: form.reason };
    (this.http.post(`${this.url}create-ticket`, body, this.httpOptions).subscribe());
  }

  rasieDisable(form: { email: string, reason: string }) {
    const body = { ticketType: 'disable', severity: 2, reqEmail: form.email, reason: form.reason };
    this.http.post(`${this.url}create-ticket`, body, this.httpOptions).subscribe();
  }

  navigateHome() {
    window.alert('Ticket raised');
    this.router.navigate(['home']);
  }

}
