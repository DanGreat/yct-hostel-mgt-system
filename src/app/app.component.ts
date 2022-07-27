import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingStateService } from './loading-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yct-hostel-verification-system';
  isLoading: boolean = false;

  constructor(private router: Router, private loadingService: LoadingStateService) {

    this.loadingService.$loadingState.subscribe(loading => {
      this.isLoading = loading
    })
  }

  loginUrl(url: string) {
    return this.router.url === url;
  }
}
