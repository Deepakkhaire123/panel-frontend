import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

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
  constructor(private apiService:ApiService){}
  ngOnInit(): void {
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

  updatePassword(){
    let userId=localStorage.getItem("_id")
    if(this.changePasswordForm.invalid){
      // this.showAlert2("invailed password pattern");
    }else{
      if(this.changePasswordForm.value.newPassword===this.changePasswordForm.value.confirmPassword){

        // this.apiService.changePassword(this.changePasswordForm.value).subscribe((res:any)=>{
        //   this.confirmPasswordErr=""

        //   this.closeCreditRef.nativeElement.click();
        //   this.showAlert1("Updated successfully");
        //   this.changePasswordForm.reset()
        //   setTimeout(() => {
        //     this.logout()
        //   }, 2000);
        // },(error) => {
        //   this.confirmPasswordErr=error.error.message
        //   localStorage.setItem("errors",error.error.message)
        //   this.showAlert2(this.confirmPasswordErr);
        // })
      }else{
        this.confirmPasswordErr="newPassword and confirmPassword are  not same"
        this.changePasswordForm.reset()
      }
    }


  }

  logout(){
  }

  closePopRese(){
    this.changePasswordForm.reset()
  }

  // showAlert1(message: any) {
  //   const swalWithStyle = Swal.mixin({
  //     customClass: {
  //       popup: 'my-custom-popup'
  //     }
  //   });
  //   swalWithStyle.fire({
  //     width: 400,
  //     color: '#000',
  //     icon: "success",
  //     title: message,
  //     timer: 3000,
  //   });
  //   const customCss = `
  //     .swal2-popup.my-custom-popup {
  //       border: 5px solid green;
  //       border-radius: 10px;
  //     }
  //     .swal2-styled.swal2-confirm {
  //       background: green;
  //       border-color:green
  //   }
  //   `;
  //   const style = document.createElement('style');
  //   style.textContent = customCss;
  //   document.head.append(style);
  // }
  
  // showAlert2(message: any) {
  //   const swalWithStyle = Swal.mixin({
  //     customClass: {
  //       popup: 'my-custom-popup'
  //     }
  //   });
  //   swalWithStyle.fire({
  //     width: 400,
  //     color: '#000',
  //     icon: "error",
  //     title: message,
  //     timer: 3000,
  //   });
  //   const customCss = `
  //     .swal2-popup.my-custom-popup {
  //       border: 5px solid red;
  //       border-radius: 10px;
  //     }
  //     .swal2-styled.swal2-confirm {
  //       background: red;
  //       border-color:red
  //   }
  //   `;
  //   const style = document.createElement('style');
  //   style.textContent = customCss;
  //   document.head.append(style);
  // }
}
