import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YctServiceService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Token ${token}`,
    });
  }

  // Auth
  login(body: any) {
    return this.http.post(`${this.baseUrl}/login/`, body);
  }

  // Analysis
  getAnalysis() {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/analysis/`, { headers })
  }


  // Students Service Request
  getStudents(url?: string) {
    const endpoint = (url) ? url : `${this.baseUrl}/student/`
    const headers = this.getHeaders();
    return this.http.get(endpoint, { headers });
  }

  filterStudent(hostelId: number) {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/student/?hostelID=${hostelId}`, { headers });
  }

  registerStudent(body: any) {
    const formData = new FormData()
    formData.append('accountType', body?.accountType)
    formData.append('department', body?.department)
    formData.append('email', body?.email)
    formData.append('firstName', body?.firstName)
    formData.append('gender', body?.gender)
    formData.append('hostelID', body?.hostelID)
    formData.append('lastName', body?.lastName)
    formData.append('matricNo', body?.matricNo)
    formData.append('phoneNumber', body?.phoneNumber)
    formData.append('profilePicture', body?.profilePicture)
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/register/`, formData, { headers });
  }


  deleteStudent(id: number) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/student/${id}`, { headers });
  }

  // Hostel Service Request
  getHostels() {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/hostels/`, { headers });
  }

  createHostel(body: any) {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/hostels/`, body, { headers });
  }

  deleteHostel(id: number) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/hostels/${id}`, { headers });
  }

  // Admin Service Request
  getAdmins() {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/admins/`, { headers });
  }

  registerAdmin(body: any) {
    const formData = new FormData()
    formData.append('accountType', body?.accountType)
    formData.append('email', body?.email)
    formData.append('firstName', body?.firstName)
    formData.append('gender', body?.gender)
    formData.append('lastName', body?.lastName)
    formData.append('phoneNumber', body?.phoneNumber)
    formData.append('password', body?.password)
    formData.append('profilePicture', body?.profilePicture)

    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/register/`, formData, { headers });
  }

  deleteAdmin(id: number) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/admins/${id}`, { headers });
  }

}
