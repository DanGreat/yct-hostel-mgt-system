import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminsComponent
  }
];

@NgModule({
  declarations: [AdminsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminsModule { }
