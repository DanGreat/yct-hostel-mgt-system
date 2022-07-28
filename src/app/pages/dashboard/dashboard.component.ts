import { Component, OnInit } from '@angular/core';
import { LoadingStateService } from 'src/app/loading-state.service';
import { YctServiceService } from 'src/app/yct-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardData: any = {}

  constructor(private yctService: YctServiceService,
              private loadingService: LoadingStateService) {}

  ngOnInit(): void {
    this.getAnalysis()
  }

  getAnalysis() {
    this.loadingService.showLoading()

    this.yctService.getAnalysis().subscribe({
      next: (data: any) => {
        console.log('Dash: ', data);
        this.dashboardData = data
        this.loadingService.hideLoading()
      },
      error: (err) => {
        this.loadingService.hideLoading()
      }
    })
  }

}
