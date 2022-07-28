import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostelsComponent } from './hostels.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [
  {
    path: '',
    component: HostelsComponent,
    pathMatch: 'full'
  },
  {
    path: 'rooms',
    component: RoomsComponent
  }
];

@NgModule({
  declarations: [HostelsComponent, RoomsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HostelsModule { }
