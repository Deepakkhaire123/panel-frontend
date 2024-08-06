import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // baseUrl = 'https://7681-2401-4900-1c0b-5d9e-31b3-6137-4527-4a92.ngrok-free.app'
  baseUrl = 'http://localhost:5001'
  constructor( private http : HttpClient, private router : Router) { }

  loginUser(obj : any){
    return this.http.post(`${this.baseUrl}/api/v1/auth/login`,obj)
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  addPanels(obj : any){
    return this.http.post(`${this.baseUrl}/api/v1/panel/add-panel`,obj)
  }

  addWebsite(obj : any){
    return this.http.post(`${this.baseUrl}/api/v1/panel/add-website`,obj)
  }

  getPanels(){
    return this.http.get(`${this.baseUrl}/api/v1/panel/panels`,{responseType: 'json'})
  }

  getWebsites(id : any){
    return this.http.get(`${this.baseUrl}/api/v1/panel/panel-websites/${id}`)
  }

  changePanelPassword(id : any, payload : any){
    return this.http.put(`${this.baseUrl}/api/v1/panel/change-panel-password/${id}`, payload)
  }

  updatePanel(id : any){
    return this.http.delete(`${this.baseUrl}/api/v1/panel/update-mother-panel/${id}`)
  }

  deletePanel(id : any){
    return this.http.delete(`${this.baseUrl}/api/v1/panel/delete-panel/${id}`)
  }



  
}
