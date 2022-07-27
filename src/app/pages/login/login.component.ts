import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingStateService } from 'src/app/loading-state.service';
import { YctServiceService } from 'src/app/yct-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  }

  constructor(private router: Router,
              private toastr: ToastrService,
              private yctService: YctServiceService,
              private loadingService: LoadingStateService) { }

  ngOnInit(): void {
  }

  login() {
    console.log('Cred: ', this.credentials);
    this.loadingService.showLoading()
    this.yctService.login(this.credentials).subscribe({
      next: (data: any) => {
        this.loadingService.hideLoading()
        
        if(data?.token) {

          const dashboardOverview = {
            totalStudents: data?.total_student,
            totalAdmins: data?.total_admin,
            totalHostels: data?.total_hostel
          }

          const { profile_picture, account_type, user_detail } = data?.data
          const userData = {
            profile_picture,
            user_detail,
            account_type
          }

          localStorage.setItem('token', data?.token)
          localStorage.setItem('dashboard', JSON.stringify(dashboardOverview))
          localStorage.setItem('user', JSON.stringify(userData))

        }
        
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        this.toastr.error(err.detail)
        this.loadingService.hideLoading()
        console.log('Login Err: ', err);
      }
    })
    
  }

}
