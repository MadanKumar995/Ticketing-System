import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentChatsComponent } from './agent-chats.component';

describe('ChatsComponent', () => {
  let component: AgentChatsComponent;
  let fixture: ComponentFixture<AgentChatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentChatsComponent]
    });
    fixture = TestBed.createComponent(AgentChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
