import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DeveloperModalComponent } from './components/modals/developer-modal/developer-modal.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { GenrePipe } from './pipes/genre.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modals/modal/modal.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableSortDirective } from './directives/table-sort.directive';
import { RequestInterceptor } from './interceptor/request.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DeveloperModalComponent,
    ConfirmModalComponent,
    GenrePipe,
    ModalComponent,
    TableSortDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ]
})
export class AppModule { }
