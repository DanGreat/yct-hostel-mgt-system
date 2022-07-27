import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingStateService {

  loading = new BehaviorSubject<boolean>(false);
  readonly $loadingState = this.loading.asObservable();

  constructor() { }

  showLoading() {
    this.loading.next(true)
  }

  hideLoading() {
    this.loading.next(false)
  }
}
