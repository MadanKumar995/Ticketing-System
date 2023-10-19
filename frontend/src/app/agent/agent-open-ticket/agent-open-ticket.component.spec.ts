import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentOpenTicketComponent } from './agent-open-ticket.component';

describe('AgentOpenTicketComponent', () => {
  let component: AgentOpenTicketComponent;
  let fixture: ComponentFixture<AgentOpenTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentOpenTicketComponent]
    });
    fixture = TestBed.createComponent(AgentOpenTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
