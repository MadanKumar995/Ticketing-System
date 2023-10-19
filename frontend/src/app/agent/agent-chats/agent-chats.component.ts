import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatsWebSocketService } from 'src/app/services/chatsWebSocket/chats-web-socket.service';

@Component({
  selector: 'app-agent-chats',
  templateUrl: './agent-chats.component.html',
  styleUrls: ['./agent-chats.component.scss']
})
export class AgentChatsComponent {

  agentChats: any;
  reqChats: any;
  showReqContainer: boolean = false;

  sender = 'agent';

  ticketId!: number;
  receiverId!: string;
  receiverName!: string;
  newMessage!: string;
  messages: any;
  // newMessage = '';

  constructor(
    private authService: AuthService,
    private webSocketService: ChatsWebSocketService
  ) {
    this.webSocketService.getAgentChats().pipe(
      tap((agentChats) => {
        console.log('agent Chats are: ', agentChats);
        if (agentChats[0] == 'GetAgentChats') {
          this.agentChats = agentChats[1];
        }
      })
    ).subscribe();
    this.getReqChats();
  }

  getChats() { }

  getMessages(ticketId: number, userId: any, userName: any) {
    this.receiverId = userId;
    this.receiverName = userName;
    this.ticketId = ticketId
    this.webSocketService.getChatMessages(this.ticketId).pipe(
      tap((msgs) => {
        if (msgs[0] == 'messages') {
          this.messages = msgs[1];
        }
      })
    ).subscribe();
  }

  sendMessage(message: string) {
    const sender = `a-${this.authService.agentDetails.agentId}`;
    // const message = this.newMessage;

    if (message && this.ticketId) {
      this.webSocketService.createMessage(this.ticketId, sender, `u-${this.receiverId}`, message).subscribe(() => {
        // this.newMessage = '';
      });
    }
  }

  toggleReq() {
    this.showReqContainer = !this.showReqContainer;
  }

  getReqChats() {
    this.webSocketService.getReqChats().pipe(
      tap((reqChats) => {
        if (reqChats[0] == 'GetReqChats') {
          this.reqChats = reqChats[1];
          console.log('insdie reqChats: ', this.reqChats[1]);
        }
      })
    ).subscribe();
  }

  acceptChat(ticketId: number, agentSeverity: number, severity: number) {
    const agentId = this.authService.agentDetails.agentId;
    this.webSocketService.acceptChat(agentId, ticketId, agentSeverity, severity).pipe(
      tap(() => {
        this.webSocketService.getAgentChats().pipe(
          tap((agentChats) => {
            console.log('agent Chats are: ', agentChats);
            if (agentChats[0] == 'GetAgentChats') {
              this.agentChats = agentChats[1];
            }
          })
        ).subscribe();
      })
    ).subscribe();
  }

}
