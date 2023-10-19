import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainHeaderComponent } from './main-header/main-header.component';
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

import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';
import { ChatsWebSocketService } from './services/chatsWebSocket/chats-web-socket.service';

import { DateFormatPipe } from './pipes/date-format.pipe';
import { ChatWithAgentComponent } from './users/chat-with-agent/chat-with-agent.component';
import { AgentChatsComponent } from './agent/agent-chats/agent-chats.component';
import { ChatComponent } from './chats/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    HomeComponent,
    RaiseTicketComponent,
    SignUpComponent,
    LoginComponent,
    MyTicketsComponent,
    AgentSignupComponent,
    AgentLoginComponent,
    AgentHomeComponent,
    AgentTicketsComponent,
    AgentTicketsHistoryComponent,
    AgentOpenTicketComponent,
    DateFormatPipe,
    ChatWithAgentComponent,
    AgentChatsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    ChatsWebSocketService,
    DateFormatPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
