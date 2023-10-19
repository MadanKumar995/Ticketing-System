import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { AuthService } from '../auth.service';

// import * as socketIo from 'socket.io-client';
// import * as Connection from '../../models/socket/connection';

@Injectable({
  providedIn: 'root'
})
export class ChatsWebSocketService {
  private socket$: WebSocketSubject<any>;

  // private clientSocket: socketIo.Socket;

  private createMsgUrl = 'http://localhost:3000/chats/';

  constructor(private http: HttpClient,
    private authService: AuthService,

  ) {
    // this.clientSocket = socketIo.connect('http://localhost:4040');
    this.socket$ = webSocket('ws://localhost:8080');
  }

  getChatMessages(ticketId: number) {
    const messageData = {
      ticketId,
    };
    // return this.socket.fromEvent(`${messageData} abcd`);


    this.socket$.next(JSON.stringify(['GetMessages', messageData]));
    return this.socket$.asObservable();
  }

  reqNewChat(ticketId: number) {
    const messageData = {
      ticketId,
    };
    this.socket$.next(JSON.stringify(['ReqNewChat', messageData]));
    return this.socket$.asObservable();
  }

  createMessage(ticketId: number, sender: string, receiver: string, message: string): Observable<any> {
    return this.http.post<any>(`${this.createMsgUrl}createMessage`, { ticketId: ticketId, sender: sender, receiver: receiver, message: message });
  }

  getAgentChats() {
    const messageData = {
      agentId: this.authService.agentDetails.agentId,
    };
    this.socket$.next(JSON.stringify(['GetAgentChats', messageData]));
    return this.socket$.asObservable();
  }

  getReqChats() {
    const messageData = {
      agentSeverity: this.authService.agentDetails.agentSeverity,
    };
    this.socket$.next(JSON.stringify(['GetReqChats', messageData]));
    return this.socket$.asObservable();
  }

  acceptChat(agentId: number, ticketId: number, agentSeverity: number, severity: number) {
    return this.http.put(`${this.createMsgUrl}acceptChat`,
      { agentId: agentId, ticketId: ticketId, agentSeverity: agentSeverity, severity: severity });
  }

  getReceiverIdforUser(ticketId: number) {
    const messageData = {
      ticketId,
    };
    this.socket$.next(JSON.stringify(['GetReceiverIdforUser', messageData]));
    return this.socket$.asObservable();
  }

}
