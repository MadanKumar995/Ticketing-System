import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { TicketAndUserAgent } from 'src/app/models/ticketAndUserAgent';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-agent-open-ticket',
  templateUrl: './agent-open-ticket.component.html',
  styleUrls: ['./agent-open-ticket.component.scss']
})
export class AgentOpenTicketComponent {

  // reason: string = 'abcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygyabcdsadasdasdsadasds adsa d  jijiji jijij iji ji jj i hy y gugbuygb ygy'

  ticketId: number;

  ticketDetails$: Observable<Partial<TicketAndUserAgent>[]>;

  reason = 'hello!';

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketsService,
    private errorHandlerService: ErrorHandlerService,
  ) {
    this.ticketId = parseInt(this.route.snapshot.paramMap.get('ticketId') || '0', 10);
    this.ticketDetails$ = this.ticketService.getAgentTicket(this.ticketId);
  }

  changeTicketStatus(status: string, remarks: string, setStatus: string) {
    if (status == 'open') {
      this.ticketService.updateTicketStatus({ status: setStatus, remarks: remarks, ticketId: this.ticketId }).pipe(
        tap(() => {
          this.ticketDetails$ = this.ticketService.getAgentTicket(this.ticketId)
        })

      ).subscribe();
    } else if (status == 'in-progress') {
      this.ticketService.updateTicketStatus({ status: setStatus, remarks: remarks, ticketId: this.ticketId }).pipe(
        tap(() => {
          this.ticketDetails$ = this.ticketService.getAgentTicket(this.ticketId)
        })

      ).subscribe();
    }
  }

  updateName(userId: number, prevName: string, userName: string, reqName: string, userMobile: string) {
    if (userName != reqName) {
      this.ticketService.updateProfile({ userId: userId, userName: reqName, userMobile: userMobile }).pipe(
        tap(() => {
          this.ticketDetails$ = this.ticketService.getAgentTicket(this.ticketId)
        })

      ).subscribe();
      //update
    } else {
      this.ticketService.updateProfile({ userId: userId, userName: prevName, userMobile: userMobile }).pipe(
        tap(() => {
          this.ticketDetails$ = this.ticketService.getAgentTicket(this.ticketId)
        })

      ).subscribe();
      // revert
    }

  }

  updateMobile(userId: number, prevMobile: string, userMobile: string, reqMobile: string, userName: string) {
    if (userMobile != reqMobile) {
      this.ticketService.updateProfile({ userId: userId, userName: userName, userMobile: reqMobile }).pipe(
        tap(() => {
          this.ticketDetails$ = this.ticketService.getAgentTicket(this.ticketId)
        })

      ).subscribe();
      //update
    } else {
      this.ticketService.updateProfile({ userId: userId, userName: userName, userMobile: prevMobile }).pipe(
        tap(() => {
          this.ticketDetails$ = this.ticketService.getAgentTicket(this.ticketId)
        })

      ).subscribe();
      // revert
    }
  }

  changeUserAccStatus(status: string, userId: number) {
    this.ticketService.changeuserAccStatus({ status, userId }).pipe(
      tap(() => {
        this.ticketDetails$ = this.ticketService.getAgentTicket(this.ticketId)
      })

    ).subscribe();
  }

}
