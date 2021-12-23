import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopersComponent } from './developers.component';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperModalComponent } from 'src/app/components/modals/developer-modal/developer-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: DevelopersComponent }
];

@NgModule({
  declarations: [
    DevelopersComponent,
    DeveloperModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    DevelopersComponent
  ]
})
export class DevelopersModule { }
