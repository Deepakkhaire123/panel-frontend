import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  addDetails : any;

ngOnInit(): void {
    this.addDetails = new FormGroup({
      username : new FormControl('', Validators.required),
      userId : new FormControl('', [ Validators.required, Validators.pattern(/^[a-zA-Z0-9_.-]*$/)]),
      password : new FormControl('', Validators.required),
      business : new FormControl('', Validators.required),
      userType : new FormControl('', Validators.required),
    })
  }

  addData(){
    console.log(this.addDetails.value);
    
  }
}