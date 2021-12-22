import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelsComponent } from './levels.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LevelsComponent }
];

@NgModule({
  declarations: [
    LevelsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LevelsModule { }
