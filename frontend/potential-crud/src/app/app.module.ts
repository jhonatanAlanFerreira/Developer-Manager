import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RequestInterceptor } from './interceptor/request.interceptor';
import { AppRoutingModule } from './rotes/AppRoutingModule';
import { RouterModule } from '@angular/router';
import { MenuOptionsComponent } from './components/menu-options/menu-options.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuOptionsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ]
})
export class AppModule { }
