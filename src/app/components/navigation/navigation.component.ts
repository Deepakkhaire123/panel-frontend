import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  userRole=localStorage.getItem("role")
  userId=localStorage.getItem("userId")
  @ViewChild('closeCreditRef') closeCreditRef: any;
  confirmPasswordErr:string=''
  userID : any;

  constructor(private apiService:ApiService){}
  ngOnInit(): void {
    this.userID = localStorage.getItem('userId')
  }



  changePasswordForm=new FormGroup({
    currentPassword:new FormControl('',Validators.required),
    // newPassword:new FormControl('',Validators.required),
    // confirmPassword:new FormControl('',Validators.required),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])

  })
  // getUserId(id:any){
  //   this.userId=id
  //   // console.log(id,"llllll+++");

  // }



  get currentPassword() {
    return this.changePasswordForm.get('currentPassword');
  }
  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }
  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  changePassword(){
    let userId=localStorage.getItem("id")
    console.log(userId, this.changePasswordForm.value);
    
    if(this.changePasswordForm.invalid){
      this.showAlert2("All Fields are Required");
    }else{
      if(this.changePasswordForm.value.newPassword===this.changePasswordForm.value.confirmPassword){
        this.apiService.changeOwnPass(userId, this.changePasswordForm.value).subscribe((res : any)=>{
          console.log(res);
          this.showAlert1(res?.message);
          this.changePasswordForm.reset();
          this.closeCreditRef.nativeElement.click();
        },(error)=>{
          this.confirmPasswordErr = error.error.message
        })
        
      }else{
        this.confirmPasswordErr="New Password and Confirm Password are  not same";
        // this.changePasswordForm.reset()
      }
    }
    setTimeout(() => {
      this.confirmPasswordErr = '';
    }, 3000);


  }

  logout(){
    this.apiService.logout();
  }

  closePopRese(){
    this.changePasswordForm.reset()
  }

  showAlert1(message: any) {
    const swalWithStyle = Swal.mixin({
      customClass: {
        popup: 'my-custom-popup'
      }
    });
    swalWithStyle.fire({
      width: 400,
      color: '#000',
      icon: "success",
      title: message,
      timer: 3000,
    });
    const customCss = `
      .swal2-popup.my-custom-popup {
        border: 5px solid green;
        border-radius: 10px;
      }
      .swal2-styled.swal2-confirm {
        background: green;
        border-color:green
    }
    `;
    const style = document.createElement('style');
    style.textContent = customCss;
    document.head.append(style);
  }
  
  showAlert2(message: any) {
    const swalWithStyle = Swal.mixin({
      customClass: {
        popup: 'my-custom-popup'
      }
    });
    swalWithStyle.fire({
      width: 400,
      color: '#000',
      icon: "error",
      title: message,
      timer: 3000,
    });
    const customCss = `
      .swal2-popup.my-custom-popup {
        border: 5px solid red;
        border-radius: 10px;
      }
      .swal2-styled.swal2-confirm {
        background: red;
        border-color:red
    }
    `;
    const style = document.createElement('style');
    style.textContent = customCss;
    document.head.append(style);
  }
}
