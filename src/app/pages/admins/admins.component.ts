import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingStateService } from 'src/app/loading-state.service';
import { YctServiceService } from 'src/app/yct-service.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  admins: any = []
  adminData = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    gender: '',
    phoneNumber: '',
    accountType: 'admin',
    profilePicture: ''
  }
  next: string = '';

  constructor(private yctService: YctServiceService, 
              private loadingService: LoadingStateService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAdmins()
  }

  getAdmins(url?: string) {
    if(url) this.loadingService.showLoading()
    this.yctService.getAdmins(url).subscribe({
      next: (data: any) => {
        console.log('Admin Registered: ', data);
        this.next = data?.next

        if(url) {
          this.admins = this.admins.concat(data?.results)
        } else {
          this.admins = data?.results
        }

        if(url) this.loadingService.hideLoading()
      },
      error: (err) => {
        if(url) this.loadingService.hideLoading()
        console.log('Admin Err: ', err);
      }
    })
  }

  loadMore() {
    this.getAdmins(this.next)
  }

  getProfilePic(ev: any) {
    const file = ev.target.files[0]
    this.adminData.profilePicture = file
    console.log('Admin: ', this.adminData);
  }

  addAdmin() {
    this.loadingService.showLoading()
    console.log('Admin: ', this.adminData);
    this.yctService.registerAdmin(this.adminData).subscribe({
      next: (data) => {
        this.toastr.success('Admin Registered Successfully')
        this.loadingService.hideLoading()
        this.emptyFields()
        this.getAdmins()
      },
      error: (err) => {
        this.loadingService.hideLoading()
        console.log('Admin Register Err: ', err);
      }
    })
  }

  deleteAdmin(id: number) {
    const shouldDelete = confirm('Are you sure you want to delete this Admin?')

    if(shouldDelete) {
      this.loadingService.showLoading()
      this.yctService.deleteAdmin(id).subscribe({
        next: (data) => {
          console.log('Student Deleted: ', data);
          this.toastr.info('Admin Deleted')
          this.loadingService.hideLoading()
          this.getAdmins()
        },
        error: (err) => {
          console.log('Student Register Err: ', err);
          this.loadingService.hideLoading()
        }
      })
    }
  }

  emptyFields() {
    this.adminData.firstName = ''
    this.adminData.lastName = ''
    this.adminData.email = ''
    this.adminData.gender = ''
    this.adminData.phoneNumber = ''
    this.adminData.profilePicture = ''
    this.adminData.password = ''
  }

}
