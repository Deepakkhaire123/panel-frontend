import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  addDetails : any;
  showPanelList : any;
  constructor( private apiServe : ApiService){}

ngOnInit(): void {
    this.addDetails = new FormGroup({
      name : new FormControl('', Validators.required),
      userId : new FormControl('', [ Validators.required, Validators.pattern(/^[a-zA-Z0-9_.-]*$/)]),
      password : new FormControl('', Validators.required),
      business : new FormControl('', Validators.required),
      panelFor : new FormControl('', Validators.required),
    })
    this.getPanels()
  }

  getPanels(){
    this.apiServe.getPanels().subscribe((res : any)=>{
      this.showPanelList = res?.data;
    })
  }
  addData(){
    console.log(this.addDetails.value);
    this.apiServe.addPanels(this.addDetails.value).subscribe((res : any)=>{
      this.getPanels()
    })
  }
}