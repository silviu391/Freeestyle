import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggerComponent } from './logger/logger.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AuthGuardComponent } from './auth.guard/auth.guard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoggerComponent,
    AlertsComponent,
    AuthGuardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
