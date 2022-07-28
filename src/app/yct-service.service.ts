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

  getStudent(matNo: string) {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/student/?search=${matNo}`, { headers });
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
    formData.append('roomID', body?.roomID)
    formData.append('lastName', body?.lastName)
    formData.append('matricNo', body?.matricNo)
    formData.append('phoneNumber', body?.phoneNumber)
    formData.append('school', body?.school)
    formData.append('level', body?.level)
    formData.append('profilePicture', body?.profilePicture)
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/register/`, formData, { headers });
  }

  updateStudent(body: any) {
    const formData = new FormData()
    if(body?.accountType) formData.append('accountType', body?.accountType)
    if(body?.department) formData.append('department', body?.department)
    if(body?.email) formData.append('email', body?.email)
    if(body?.firstName) formData.append('firstName', body?.firstName)
    if(body?.gender) formData.append('gender', body?.gender)
    if(body?.roomID) formData.append('roomID', body?.roomID)
    if(body?.lastName) formData.append('lastName', body?.lastName)
    if(body?.matricNo) formData.append('matricNo', body?.matricNo)
    if(body?.phoneNumber) formData.append('phoneNumber', body?.phoneNumber)
    if(body?.school) formData.append('school', body?.school)
    if(body?.level) formData.append('level', body?.level)
    if(body?.profilePicture) formData.append('profilePicture', body?.profilePicture)

    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/student/${body?.id}/`, formData, { headers });
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

  updateHostel(body: any) {
    const { name } = body
    const payload = {
      name
    }
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/hostels/${body?.id}/`, payload, { headers });
  }

  deleteHostel(id: number) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/hostels/${id}`, { headers });
  }

  // Rooms Service Request
  getRooms() {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/rooms/`, { headers });
  }

  createRoom(body: any) {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/rooms/`, body, { headers });
  }

  updateRoom(body: any) {
    const { hostel, name } = body
    const payload = {
      hostel,
      name
    }
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/rooms/${body?.id}/`, payload, { headers });
  }

  deleteRoom(id: number) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/rooms/${id}`, { headers });
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
