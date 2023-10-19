import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWithAgentComponent } from './chat-with-agent.component';

describe('ChatWithAgentComponent', () => {
  let component: ChatWithAgentComponent;
  let fixture: ComponentFixture<ChatWithAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatWithAgentComponent]
    });
    fixture = TestBed.createComponent(ChatWithAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
