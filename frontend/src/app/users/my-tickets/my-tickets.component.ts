import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketAndUserAgent } from 'src/app/models/ticketAndUserAgent';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent {

  allTickets$: Observable<Partial<TicketAndUserAgent>[]>;

  constructor(
    private ticketsService: TicketsService,
  ) {
    this.allTickets$ = this.ticketsService.getAllTickets();
  }

}
