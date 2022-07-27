import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userData: any = {}

  constructor(private router: Router) { 
    const user = localStorage.getItem('user')
    this.userData = user ? JSON.parse(user) : {}    
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  setDefault(ev: any) {
    ev.target.src = '../../assets/default-photo.jpg'
  }

}
