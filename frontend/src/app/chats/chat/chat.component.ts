import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @Input() messages: any;
  @Input() sender!: string;
  @Output() messageDataEmitter = new EventEmitter<string>();

  message: string = '';

  sendToParent() {
    if (this.message) {
      // const messageData = { message: this.message };
      this.messageDataEmitter.emit(this.message);
    }
    this.message = '';
  }

}
