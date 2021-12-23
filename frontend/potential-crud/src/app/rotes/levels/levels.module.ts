import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelsComponent } from './levels.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LevelModalComponent } from 'src/app/components/modals/level-modal/level-modal.component';

const routes: Routes = [
  { path: '', component: LevelsComponent }
];

@NgModule({
  declarations: [
    LevelsComponent,
    LevelModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LevelsModule { }
