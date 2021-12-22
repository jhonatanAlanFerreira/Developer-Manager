import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../components/modals/confirm-modal/confirm-modal.component';
import { ModalComponent } from '../components/modals/modal/modal.component';
import { TableSortDirective } from '../directives/table-sort.directive';
import { GenrePipe } from '../pipes/genre.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConfirmModalComponent,
    GenrePipe,
    ModalComponent,
    TableSortDirective
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
    ReactiveFormsModule
  ]
})
export class SharedModule { }
