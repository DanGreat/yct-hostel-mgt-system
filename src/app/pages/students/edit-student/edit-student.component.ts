import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingStateService } from 'src/app/loading-state.service';
import { YctServiceService } from 'src/app/yct-service.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  studentData = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phoneNumber: '',
    department: '',
    matricNo: '',
    roomID: '',
    school: '',
    level: '',
    profilePicture: ''
  }

  studentRoom = null
  rooms: any = []

  constructor(private yctService: YctServiceService,
    private toastr: ToastrService,
    private router: Router,
    private loadingService: LoadingStateService) { 

      if (router.getCurrentNavigation()?.extras.state) {
        const record = this.router.getCurrentNavigation()?.extras.state?.['student'];
        this.setRecords(record)
      }

      
      
  }

  ngOnInit() {
    this.getRooms()
  }

  setRecords(records: any) {
    this.studentData.id = records?.id
    this.studentData.firstName = records?.user_detail?.first_name
    this.studentData.lastName = records?.user_detail?.last_name
    this.studentData.email = records?.user_detail?.email
    this.studentData.gender = records?.gender
    this.studentData.phoneNumber = records?.phone_number
    this.studentData.department = records?.department
    this.studentData.matricNo = records?.matric_no
    this.studentData.school = records?.school
    this.studentData.level = records?.level
    this.studentRoom = records?.room?.room_name
  }


  getProfilePic(ev: any) {
    const file = ev.target.files[0]
    this.studentData.profilePicture = file 
  }

  selectRoom(ev: any) {
    this.studentData.roomID = ev.target.value
  }


  updateStudent() {
    this.loadingService.showLoading()
    console.log('Update: ', this.studentData);
    
    this.yctService.updateStudent(this.studentData).subscribe({
      next: (data: any) => {
        this.loadingService.hideLoading()
        this.toastr.success('Student Updated Successfully')
        this.router.navigate(['/students'])
      },
      error: (err) => {
        this.loadingService.hideLoading()
        console.log('Hostel Err: ', err);
      }
    })
  }

  getRooms() {
    this.yctService.getRooms().subscribe({
      next: (data: any) => {
        this.rooms = data?.results
      },
      error: (err) => {
        this.toastr.error(err.detail)
        console.log('Hostel Err: ', err);
      }
    })
  }

  

}
