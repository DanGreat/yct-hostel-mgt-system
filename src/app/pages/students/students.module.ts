import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { StudentCardComponent } from 'src/app/components/student-card/student-card.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent
  }
];

@NgModule({
  declarations: [StudentsComponent, StudentCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    QRCodeModule,
  ]
})
export class StudentsModule { }
