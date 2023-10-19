import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketAndUserAgent } from 'src/app/models/ticketAndUserAgent';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-agent-tickets-history',
  templateUrl: './agent-tickets-history.component.html',
  styleUrls: ['./agent-tickets-history.component.scss']
})
export class AgentTicketsHistoryComponent {

  agentTicketsHistory$: Observable<Partial<TicketAndUserAgent>[]>;

  constructor(
    private ticketsService: TicketsService,
  ) {
    this.agentTicketsHistory$ = this.ticketsService.getAgentHistory();
  }

}
