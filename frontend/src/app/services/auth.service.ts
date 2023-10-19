import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, catchError, first, tap } from 'rxjs';

import { User } from '../models/user';
import { ErrorHandlerService } from './error-handler.service';
import { Agent } from '../models/agent';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:3000/auth/";

  // isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  // userId!: Pick<User, "userId">;
  userDetails: { userId: number, userName: string, userEmail: string, accountStatus: string, userMobile: string }
    = { userId: 0, userName: '', userEmail: '', accountStatus: '', userMobile: '' };
  // agentId!: number;
  // agentDetails!: Partial<Agent>;
  agentDetails: { agentId: number, agentName: string, agentEmail: string, agentMobile: string, agentSeverity: number, agentStatus: string }
    = { agentId: 0, agentName: '', agentEmail: '', agentMobile: '', agentSeverity: 0, agentStatus: '' };
  // agentId!: number;
  // agentName!: string;
  // agentEmail!: string;
  // agentMobile!: number;
  // agentSeverity!: number;
  // agentStatus!: string;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
  ) { }

  signUp(user: Omit<User, "userId" | "accountStatus">): Observable<User> {
    return this.http.post<User>(`${this.url}signup`, user, this.httpOptions)
      .pipe(
        first(),
        tap(() => {
          window.alert('Account Created Please Login to Continue');
          this.router.navigate(['login']);
        }),
        catchError(this.errorHandlerService.handleError<User>('Sign Up'))
      );
  }

  login(
    userEmail: Pick<User, "userEmail">,
    password: Pick<User, "password">
  ): Observable<{
    token: string; userDetails: any
  }> {
    return this.http
      .post<{
        token: string; userDetails: any
      }>(`${this.url}login`, { userEmail, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; userDetails: any }) => {
          this.userDetails = tokenObject.userDetails;

          localStorage.setItem("token", tokenObject.token);
          // this.isUserLoggedIn$.next(true);
          this.router.navigate(['home']);
        }),
        catchError(this.errorHandlerService.handleError<{
          token: string; userDetails: any
        }>('Login'))
      );
  }

  authorizeLogin(): Observable<any> {
    return this.http.post<any>(`${this.url}authorize`, '')
      .pipe(
        first(),
        tap((userDetails: any) => {
          if (userDetails.agentDetails) {
            // this.agentId = userDetails.agentId;
            // this.agentDetails.agentId = userDetails.agentId;
            this.agentDetails = userDetails.agentDetails;
            this.router.navigate(['agent/home']);
          } else {
            this.userDetails = userDetails.userDetails;
            this.router.navigate(['home']);
            // console.log('agent id is: ', this.agentDetails.agentId);
          }
        }),
        catchError(this.errorHandlerService.handleError<any>('authorize failed', {}))
      );
  }

  agentSignUp(agent: Omit<Agent, "agentId" | "agentStatus">): Observable<Agent> {
    return this.http.post<Agent>(`${this.url}signup/agent`, agent, this.httpOptions)
      .pipe(
        first(),
        tap(() => {
          window.alert('Account Created Please Login to Continue');
          this.router.navigate(['login/agent']);
        }),
        catchError(this.errorHandlerService.handleError<Agent>('Agent Sign Up'))
      );
  }

  agentLogin(
    agentEmail: Pick<Agent, "agentEmail">,
    password: Pick<Agent, "password">
  ): Observable<{
    token: string; agentDetails: any
  }> {
    return this.http
      .post<{
        token: string; agentDetails: any
      }>(`${this.url}login/agent`, { agentEmail, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; agentDetails: any }) => {

          localStorage.setItem("token", tokenObject.token);
          // this.agentId = tokenObject.agentId;

          // this.agentDetails.agentId = tokenObject.agentId,
          this.agentDetails = tokenObject.agentDetails;
          console.log('inside agent login token: ', this.agentDetails);
          // console.log('agentid is: ', this.agentId);

          // this.isUserLoggedIn$.next(true);
          this.router.navigate(['agent/home']);
        }),
        catchError(this.errorHandlerService.handleError<{
          token: string; agentDetails: any
        }>('Login'))
      );
  }

}
