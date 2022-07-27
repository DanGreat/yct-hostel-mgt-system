import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingStateService } from 'src/app/loading-state.service';
import { YctServiceService } from 'src/app/yct-service.service';

@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.scss']
})
export class HostelsComponent implements OnInit {

  hostels: any = {}
  hostel = ''

  constructor(private yctService: YctServiceService,
              private toastr: ToastrService,
              private loadingService: LoadingStateService) { }

  ngOnInit(): void {
    this.getHostels()
  }

  getHostels() {
    this.yctService.getHostels().subscribe({
      next: (data: any) => {
        console.log('Hostel: ', data)
        this.hostels = data?.results
      },
      error: (err) => {
        this.toastr.error(err.detail)
        console.log('Hostel Err: ', err);
      }
    })
  }

  addHostel() {
    this.loadingService.showLoading()
    const body = {
      name: this.hostel
    }
    this.yctService.createHostel(body).subscribe({
      next: (data) => {
        this.loadingService.hideLoading()
        console.log('Hostel: ', data);
        this.toastr.success('Hostel Created Successfully')
        this.getHostels()
      },
      error: (err) => {
        this.toastr.error(err.detail)
        this.loadingService.hideLoading()
        console.log('Hostel Err: ', err);
      }
    })
  }

  deleteHostel(id: number) {
    const shouldDelete = confirm('Are you sure you want to delete this hostel?')

    if(shouldDelete) {
      this.loadingService.showLoading()
      this.yctService.deleteHostel(id).subscribe({
        next: () => {
          this.toastr.info('Hostel Deleted')
          this.loadingService.hideLoading()
          this.getHostels()
        },
        error: (err) => {
          this.toastr.error(err.detail)
          console.log('Student Register Err: ', err);
          this.loadingService.hideLoading()
        }
      })
    }
  }

}
