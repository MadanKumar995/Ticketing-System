import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from '../error-handler.service';
import { TicketAndUserAgent } from 'src/app/models/ticketAndUserAgent';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private userGetTicketsUrl = 'http://localhost:3000/tickets/getUserTickets/';
  private agentGetTicketsUrl = 'http://localhost:3000/tickets/getAgentTickets/';

  private agentTicketsUrl = 'http://localhost:3000/tickets/agent/';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  getAllTickets(): Observable<Partial<TicketAndUserAgent>[]> {
    return this.http.get<Partial<TicketAndUserAgent>[]>(`${this.userGetTicketsUrl}`, { responseType: "json" }).pipe(
      tap(() => console.log('got all user tickets')),
      catchError(this.errorHandlerService.handleError<TicketAndUserAgent[]>('get All tickets', []))
    );
  }

  getAgentTickets(): Observable<Partial<TicketAndUserAgent>[]> {
    return this.http.get<Partial<TicketAndUserAgent>[]>(`${this.agentGetTicketsUrl}${this.authService.agentDetails.agentId}`, { responseType: "json" }).pipe(
      tap(() => console.log('got agent tickets')),
      catchError(this.errorHandlerService.handleError<TicketAndUserAgent[]>('get agent tickets', []))
    );
  }

  getAgentHistory(): Observable<Partial<TicketAndUserAgent>[]> {
    return this.http.get<Partial<TicketAndUserAgent>[]>
      (`${this.agentGetTicketsUrl}history/${this.authService.agentDetails.agentId}`, { responseType: "json" }).pipe(
        tap(() => console.log('got agent tickets history')),
        catchError(this.errorHandlerService.handleError<TicketAndUserAgent[]>('get agent tickets history', []))
      );
  }

  getAgentTicket(ticketId: number): Observable<Partial<TicketAndUserAgent>[]> {
    return this.http.get<Partial<TicketAndUserAgent>[]>
      (`${this.agentGetTicketsUrl}ticket/${ticketId}`, { responseType: "json" }).pipe(
        catchError(this.errorHandlerService.handleError<TicketAndUserAgent[]>('get ticket for agent history', []))
      );
  }

  getUserTicket(ticketId: number) {
    // user dashboard particular ticket
    return
  }

  updateProfile(nameAndMobile: { userId: number, userName: string, userMobile: string | undefined }) {
    return this.http.put(`${this.agentTicketsUrl}update`, nameAndMobile).pipe(
      catchError(this.errorHandlerService.handleError('update profile failed', []))
    );
  }

  updateTicketStatus(status: { status: string, remarks: string, ticketId: number }) {
    return this.http.put(`${this.agentTicketsUrl}update/ticket-status`, status).pipe(
      catchError(this.errorHandlerService.handleError('update ticket status failed', []))
    );
  }

  changeuserAccStatus(data: { status: string, userId: number }) {
    return this.http.put(`${this.agentTicketsUrl}changeAccStatus`, data).pipe(
      catchError(this.errorHandlerService.handleError('change user acc status failed', []))
    );
  }

}
