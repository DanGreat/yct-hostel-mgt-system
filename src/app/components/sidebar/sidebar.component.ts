import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  accountType: string = ''

  constructor(private router: Router) { 
    const user = localStorage.getItem('user')
    const userData = user ? JSON.parse(user) : {}
    this.accountType = userData.account_type    
  }

  ngOnInit(): void {
  }

  activeUrl(url: string) {
    return this.router.url === url
  }

}
