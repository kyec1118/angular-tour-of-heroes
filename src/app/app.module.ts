import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeroesComponent,
    FormsModule,
    CommonModule,
    MessagesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
