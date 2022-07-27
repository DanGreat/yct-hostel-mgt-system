import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit {

  @Input('studentData') studentData: any;

  constructor() { }

  ngOnInit(): void {
  }

  matNo() {
    return (this.studentData && this.studentData.matric_no) ? this.studentData?.matric_no.toUpperCase() : ''
  }

  setDefault(ev: any) {
    ev.target.src = '../../assets/default-photo.jpg'
  }
   

}
