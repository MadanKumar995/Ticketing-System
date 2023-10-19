import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketAndUserAgent } from 'src/app/models/ticketAndUserAgent';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-agent-tickets',
  templateUrl: './agent-tickets.component.html',
  styleUrls: ['./agent-tickets.component.scss']
})
export class AgentTicketsComponent {

  agentTickets$: Observable<Partial<TicketAndUserAgent>[]>;

  constructor(
    private ticketsService: TicketsService,
    private router: Router,
  ) {
    this.agentTickets$ = this.ticketsService.getAgentTickets();
  }

  navigateTo(route: any) {
    console.log(route);
    this.router.navigate([`agent/open-ticket/${route}`]);
  }

}
