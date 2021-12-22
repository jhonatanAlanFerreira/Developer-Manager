import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../components/modals/confirm-modal/confirm-modal.component';
import { ModalComponent } from '../components/modals/modal/modal.component';
import { TableSortDirective } from '../directives/table-sort.directive';
import { GenrePipe } from '../pipes/genre.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleBarComponent } from '../components/title-bar/title-bar.component';



@NgModule({
  declarations: [
    ConfirmModalComponent,
    GenrePipe,
    ModalComponent,
    TableSortDirective,
    TitleBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ConfirmModalComponent,
    GenrePipe,
    ModalComponent,
    TableSortDirective,
    FormsModule,
    ReactiveFormsModule,
    TitleBarComponent,
  ]
})
export class SharedModule { }
