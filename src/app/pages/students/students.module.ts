import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { StudentCardComponent } from 'src/app/components/student-card/student-card.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit',
    component: EditStudentComponent
  }
];

@NgModule({
  declarations: [StudentsComponent, StudentCardComponent, EditStudentComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    QRCodeModule,
  ]
})
export class StudentsModule { }
