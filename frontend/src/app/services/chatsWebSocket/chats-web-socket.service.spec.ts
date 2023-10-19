import { TestBed } from '@angular/core/testing';

import { ChatsWebSocketService } from './chats-web-socket.service';

describe('ChatsWebSocketService', () => {
  let service: ChatsWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatsWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
