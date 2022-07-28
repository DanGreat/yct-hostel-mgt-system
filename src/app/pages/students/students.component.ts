import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { LoadingStateService } from 'src/app/loading-state.service';
import { YctServiceService } from 'src/app/yct-service.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, AfterViewInit {

  
  @ViewChild('generateCardBtn', { static: false, read: ElementRef }) generateCardBtn!: ElementRef;
  @ViewChild('studentCard', { static: false, read: ElementRef }) studentCard!: ElementRef;
  @ViewChild('viewedStudentCard', { static: false, read: ElementRef }) viewedStudentCard!: ElementRef;  
  
  studentData = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phoneNumber: '',
    department: '',
    matricNo: '',
    accountType: 'student',
    roomID: '',
    school: '',
    level: '',
    profilePicture: ''
  }

  viewedStudent: any = {}
  registeredStudent : any = {}

  rooms: any = []
  hostels: any = []
  students: any = []
  next: string = '';

  constructor(private yctService: YctServiceService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private loadingService: LoadingStateService) { }

  ngOnInit(): void {
    this.getHotels()
    this.getRooms()
    this.getStudents()
  }

  ngAfterViewInit(): void {
    this.generateCardBtn.nativeElement.classList.add('d-none')
  }
  
  hideGenerateBtn() {
    this.generateCardBtn.nativeElement.classList.add('d-none')
  }

  getStudents(all?: string, url?: string) {
    if(all) this.loadingService.showLoading()
    this.yctService.getStudents(url).subscribe({
      next: (data: any) => {
        this.next = data?.next

        if(url) {
          this.students = this.students.concat(data?.results)
        } else {
          this.students = data?.results
        }
        
        if(all) this.loadingService.hideLoading()
      },
      error: (err) => {
        console.log('Hostel Err: ', err);
        if(all) this.loadingService.hideLoading()
      }
    })
  }

  loadMore() {
    this.getStudents('all', this.next)
  }
  
  getRooms() {
    this.yctService.getRooms().subscribe({
      next: (data: any) => {
        this.rooms = data?.results
      },
      error: (err) => {
        console.log('Hostel Err: ', err);
      }
    })
  }

  getHotels() {
    this.yctService.getHostels().subscribe({
      next: (data: any) => {
        this.hostels = data?.results
      },
      error: (err) => {
        console.log('Hostel Err: ', err);
      }
    })
  }

  setDefault(ev: any) {
    ev.target.src = '../../assets/default-photo.jpg'
  }

  filterStudents(ev: any) {
    const value = ev.target.value

    if(!value) {
      this.getStudents('all')
      return
    }

    this.loadingService.showLoading()
    this.yctService.filterStudent(value).subscribe({
      next: (data: any) => {
        this.students = data?.results
        this.loadingService.hideLoading()
      },
      error: (err) => {
        console.log('Hostel Err: ', err)
        this.loadingService.hideLoading()
      }
    })
  }

  downloadCard()  {
    html2canvas(this.studentCard.nativeElement).then((canvas) => {
        canvas.toBlob((blob: any) => {
            let link = document.createElement("a");
            link.download = "Student-Card.png";
            link.href = URL.createObjectURL(blob);
            link.click();
        },'image/png');
    });
  }

  downloadViewedCard()  {
    html2canvas(this.viewedStudentCard.nativeElement).then((canvas) => {
        canvas.toBlob((blob: any) => {
            let link = document.createElement("a");
            link.download = "Student-Card.png";
            link.href = URL.createObjectURL(blob);
            link.click();
        },'image/png');
    });
  }

  getProfilePic(ev: any) {
    const file = ev.target.files[0]
    this.studentData.profilePicture = file    
  }

  addStudent() {
    this.loadingService.showLoading()
    this.yctService.registerStudent(this.studentData).subscribe({
      next: (data) => {
        this.toastr.success('Student Registered Successfully')
        this.registeredStudent = data;
        this.emptyFields()
        this.generateCardBtn.nativeElement.classList.remove('d-none')
        this.loadingService.hideLoading()
        this.getStudents()
      },
      error: (err) => {
        console.log('Student Register Err: ', err);
        this.loadingService.hideLoading()
      }
    })
  }

  viewStudent(student: any) {
    console.log('Viewed Student: ', student);
    this.viewedStudent = student
  }

  editStudent(student: any) {
    this.router.navigate(['edit'], { relativeTo: this.route, state: { student } })  
  }

  deleteStudent(id: number) {

    const shouldDelete = confirm('Are you sure you want to delete this student?')

    if(shouldDelete) {
      this.loadingService.showLoading()
      this.yctService.deleteStudent(id).subscribe({
        next: (data: any) => {
          console.log('Student Deleted: ', data);
          this.toastr.info(data?.detail)
          this.loadingService.hideLoading()
          this.getStudents('all')
        },
        error: (err) => {
          console.log('Student Register Err: ', err);
          this.loadingService.hideLoading()
        }
      })
    }
  }

  emptyFields() {
    this.studentData.firstName = ''
    this.studentData.lastName = ''
    this.studentData.email = ''
    this.studentData.gender = ''
    this.studentData.phoneNumber = ''
    this.studentData.matricNo = ''
    this.studentData.roomID = ''
    this.studentData.department = ''
    this.studentData.school = ''
    this.studentData.level = ''
    this.studentData.profilePicture = ''
  }

}
