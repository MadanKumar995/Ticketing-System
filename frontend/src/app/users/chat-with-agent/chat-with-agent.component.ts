import { Component } from '@angular/core';

import { ChatsWebSocketService } from '../../services/chatsWebSocket/chats-web-socket.service';
import { first, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-with-agent',
  templateUrl: './chat-with-agent.component.html',
  styleUrls: ['./chat-with-agent.component.scss']
})
export class ChatWithAgentComponent {

  chatStatus!: string;

  sender = 'user';
  receiverId!: number;

  messages: any;
  // senderId: number = 1; // Example sender ID
  // receiverId: number = 2; // Example receiver ID
  ticketId!: number; // Example ticket ID
  enterTicket!: number;
  // newMessage = '';

  // users: { id: number, name: string }[] = [];
  // name = '';

  constructor(
    private webSocketService: ChatsWebSocketService,
    private authService: AuthService,
  ) {
    // this.socketService.listenToServer('change').subscribe((change) => {
    // });
    // this.socketService.listenToServer('create').subscribe((user) => {
    // });
  }

  // onCreate(user: { id: number, name: string }) {
  //   this.users.push(user);
  // }

  // createUser(name: string) {
  //   const user = { id: Date.now().toString(), name };
  //   this.socketService.emitToServer('create', user);
  // }

  // updateUser(name: string, id: number) {
  //   this.socketService.emitToServer('change', { id, name });
  // }

  ngOnInit(): void {

  }

  getChat() {
    this.ticketId = this.enterTicket;
    if (this.ticketId) {

      this.webSocketService.reqNewChat(this.ticketId).pipe(
        tap((status) => {
          if (status[0] == 'ReqNewChat') {
            if (status[1].status == 'open') {
              this.chatStatus = 'open';
              this.webSocketService.getChatMessages(this.ticketId).pipe(
                tap((msgs) => {
                  if (msgs[0] == 'messages') {

                    this.messages = msgs[1];
                    this.webSocketService.getReceiverIdforUser(this.ticketId).pipe(
                      tap((receiverId) => {

                        if (receiverId[0] == 'GetReceiverIdforUser') {
                          this.receiverId = receiverId[1][0].agentId;
                        }
                      })
                    ).subscribe();

                  }
                })
              ).subscribe();

            } else {
              this.chatStatus = 'na';
            }
          }
        })
      ).subscribe();


    }
  }

  sendMessage(message: string) {
    // const sender = 'u-2';
    // const receiver = 'a-3';
    // const ticketId = 5; // Example ticket ID

    const sender = this.authService.userDetails.userId;
    const receiver = `a-${this.receiverId}`;

    if (message) {
      this.webSocketService.createMessage(this.ticketId, `u-${sender}`, receiver, message).subscribe(() => {
        // this.newMessage = '';
      });
    }
    // subscribe(
    //   (response) => {
    //     console.log('message sent succesfully', response);
    //     this.newMessage = '';
    //   },
    //   (error) => {
    //     console.error('Error sending messsage: ', error);
    //   }
    // )
  }

  printmsgs() {
    console.log(this.messages);
  }

}
