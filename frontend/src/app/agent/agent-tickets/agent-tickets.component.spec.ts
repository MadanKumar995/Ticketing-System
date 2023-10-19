import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTicketsComponent } from './agent-tickets.component';

describe('AgentTicketsComponent', () => {
  let component: AgentTicketsComponent;
  let fixture: ComponentFixture<AgentTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentTicketsComponent]
    });
    fixture = TestBed.createComponent(AgentTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
