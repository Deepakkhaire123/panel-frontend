import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from '../enviornments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // baseUrl = 'https://7681-2401-4900-1c0b-5d9e-31b3-6137-4527-4a92.ngrok-free.app'
  baseUrl = environment.url
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
  // ?panelFor=AGENT,USER&business=B2B,B2C
  getPanels(data : any, data1 : any){
    return this.http.get(`${this.baseUrl}/api/v1/panel/panels?business=${data}&panelFor=${data1}`,{responseType: 'json'})
  }

  getWebsites(id : any){
    return this.http.get(`${this.baseUrl}/api/v1/panel/panel-websites/${id}`)
  }

  changePanelPassword(id : any, payload : any){
    return this.http.put(`${this.baseUrl}/api/v1/panel/change-panel-password/${id}`, payload)
  }

  updatePanel(id : string, payload: any){
    return this.http.put(`${this.baseUrl}/api/v1/panel/update-panel-name/${id}`, payload)
  }

  deletePanel(id : any){
    return this.http.delete(`${this.baseUrl}/api/v1/panel/delete-panel/${id}`)
  }

  changeOwnPass(id : any, obj : any){
    return this.http.put(`${this.baseUrl}/api/v1/auth/change-password-user/${id}`,obj)
  }

}
