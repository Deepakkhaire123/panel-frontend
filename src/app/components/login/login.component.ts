import { Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFrom:any
  validationCode: any;
  errMsg: string = '';
  errMsg2: any;
  showPassword :any;  


  ngOnInit(): void {
    this.backgroundcolor()
    this.loginFrom=new FormGroup({
      userId:new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_.-]*$/),
      ]),
      password:new FormControl('',Validators.required),
      validationCode:new FormControl('',[
        Validators.required,
        Validators.maxLength(4),
        Validators.pattern(/^[0-9]{1,4}$/),
      ])

    })
    this.generateValidationCode();
    // this.apiService.sendLoggedData1.subscribe((re: any) => {
    //   this.errMsg = re
    // })

    // this.login()

  }

  get userId() {
    return this.loginFrom.get('userId');
  }
  get password() {
    return this.loginFrom.get('password');
  }
  get validationCodes() {
    return this.loginFrom.get('validationCode');
  }


  login(){
    if ((this.validationCode === +this.loginFrom.value.validationCode)) {
      // this.apiService.login(this.loginFrom.value);
      this.errMsg2=localStorage.getItem("errors")

      this.ngOnInit()
      this.loginFrom.reset();
    }else{
      this.errMsg = "Invalid Validation Code"

    }

    // this.errMsg2=localStorage.getItem("errors")

    // console.log(this.loginFrom.value,"lllllllllllllllllllllll");
    // this.apiService.login(this.loginFrom.value)

  }

  backgroundcolor(){
    document.body.style.backgroundColor = "#1D2C38";
  }
  numberOnly(event: any):any {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var regex2 = new RegExp(/^[0-9]{1,4}$/);
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
    if(!regex2.test(key)){
      event.preventDefault();
      return false;
    }
  }
  generateValidationCode() {
    var val = Math.floor(1000 + Math.random() * 9000);
    this.validationCode = val;
  }

  toggleShow(){
    this.showPassword = !this.showPassword;
  }



}
