import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewChild, ElementRef, AfterViewChecked } from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @Input() messages: any;
  @Input() sender!: string;
  @Output() messageDataEmitter = new EventEmitter<string>();

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;


  message: string = '';

  sendToParent() {
    if (this.message) {
      // const messageData = { message: this.message };
      this.messageDataEmitter.emit(this.message);
    }
    this.message = '';
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const container = this.scrollContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

}
