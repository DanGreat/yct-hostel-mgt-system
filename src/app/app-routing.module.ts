import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule)
  },
  {
    path: 'admins',
    loadChildren: () => import('./pages/admins/admins.module').then(m => m.AdminsModule)
  },
  {
    path: 'hostels',
    loadChildren: () => import('./pages/hostels/hostels.module').then(m => m.HostelsModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
