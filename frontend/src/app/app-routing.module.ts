import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './users/home/home.component';
import { RaiseTicketComponent } from './users/raise-ticket/raise-ticket.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { MyTicketsComponent } from './users/my-tickets/my-tickets.component';
import { AgentSignupComponent } from './auth/agent-signup/agent-signup.component';
import { AgentLoginComponent } from './auth/agent-login/agent-login.component';
import { AgentHomeComponent } from './agent/agent-home/agent-home.component';
import { AgentTicketsComponent } from './agent/agent-tickets/agent-tickets.component';
import { AgentTicketsHistoryComponent } from './agent/agent-tickets-history/agent-tickets-history.component';
import { AgentOpenTicketComponent } from './agent/agent-open-ticket/agent-open-ticket.component';

import { UserAuthGuard } from './auth/user.auth.guard';
import { AgentAuthGuard } from './auth/agent.auth.guard';
import { ChatWithAgentComponent } from './users/chat-with-agent/chat-with-agent.component';
import { AgentChatsComponent } from './agent/agent-chats/agent-chats.component';

const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup/agent', component: AgentSignupComponent },
  { path: 'login/agent', component: AgentLoginComponent },

  {
    path: '',
    canActivate: [UserAuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'raise-ticket', component: RaiseTicketComponent },
      { path: 'my-tickets', component: MyTicketsComponent },
      { path: 'chat-with-agent', component: ChatWithAgentComponent },
    ]
  },
  {
    path: 'agent',
    canActivate: [AgentAuthGuard],
    children: [
      { path: 'home', component: AgentHomeComponent },
      { path: 'tickets', component: AgentTicketsComponent },
      { path: 'tickets-history', component: AgentTicketsHistoryComponent },
      { path: 'open-ticket/:ticketId', component: AgentOpenTicketComponent },
      { path: 'chats', component: AgentChatsComponent },
    ]
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
