import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostelsComponent } from './hostels.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HostelsComponent
  }
];

@NgModule({
  declarations: [HostelsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HostelsModule { }
