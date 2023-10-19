import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTicketsHistoryComponent } from './agent-tickets-history.component';

describe('AgentTicketsHistoryComponent', () => {
  let component: AgentTicketsHistoryComponent;
  let fixture: ComponentFixture<AgentTicketsHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentTicketsHistoryComponent]
    });
    fixture = TestBed.createComponent(AgentTicketsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
