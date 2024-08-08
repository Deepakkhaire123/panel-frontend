import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { passwordValidator } from 'src/app/services/password.validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('closeRef') closeRef: any;
  @ViewChild('closeRefa') closeRefa: any;
  addDetails: any;
  showPanelList: any;
  changePasswordForm: any;
  inputText1: string = '';
  cursorPosition1: number = 0;
  panelId: any;
  errMsg = '';
  drpdwn = false;
  Bdrpdwn = false;
  updatePanelForm: any;
  showPassword: any;
  panelForArr = ['USER', 'AGENT']
  businessArr = ['B2B', 'B2C']
  defaultBusiOpt : any = [];
  defaultUsersOpt : any = [];
  constructor(private apiServe: ApiService) {}
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.drpdwn')) {
      this.drpdwn = false;
      this.Bdrpdwn = false;
    }
  }
  ngOnInit(): void {
    this.defaultBusiOpt.push(...this.businessArr)
    this.defaultUsersOpt.push(...this.panelForArr)
    this.backgroundcolor();
    this.addDetails = new FormGroup({
      name: new FormControl('', Validators.required),
      userId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_.-]*$/),
      ]),
      password: new FormControl('', Validators.required),
      business: new FormControl('', Validators.required),
      panelFor: new FormControl('', Validators.required),
    });
    this.getPanels(this.defaultBusiOpt,this.defaultUsersOpt);

    this.changePasswordForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ]),
      currentPassword: new FormControl('', Validators.required),
    });

    this.updatePanelForm = new FormGroup({
      panelName: new FormControl('', [Validators.required]),
    });
  }

  getPanels(data:any, data1 : any) {
    this.apiServe.getPanels(data, data1).subscribe((res: any) => {
      this.showPanelList = res?.data;
    });
  }
  addData() {
    console.log(this.addDetails.value);
    if(this.addDetails.valid){
    this.apiServe.addPanels(this.addDetails.value).subscribe((res: any) => {
      if (res) {
        this.showAlert1('Panel added Successfully');
        this.getPanels(this.defaultBusiOpt,this.defaultUsersOpt);
      }
    });
  }else{
    this.showAlert2('All Fields are Required')
  }
  }
  updateCursorPosition1(event: any) {
    this.cursorPosition1 = event.target.selectionStart;
  }

  get currentPassword() {
    return this.changePasswordForm.get('currentPassword');
  }
  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }
  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }
  get userId() {
    return this.addDetails.get('userId');
  }
  get password() {
    return this.addDetails.get('password');
  }
  changePassword(id: any) {
    this.panelId = id;
  }
  updatePassword() {
    console.log(
      this.changePasswordForm.value.newPassword ===
        this.changePasswordForm.value.confirmPassword
    );
    if(this.changePasswordForm.valid){
    if (
      this.changePasswordForm.value.newPassword ===
      this.changePasswordForm.value.confirmPassword
    ) {
      let data = {
        currentPassword: this.changePasswordForm.value.currentPassword,
        newPassword: this.changePasswordForm.value.newPassword,
      };
      console.log(data, this.panelId);
      this.apiServe.changePanelPassword(this.panelId, data).subscribe(
        (res: any) => {
          this.changePasswordForm.reset();
          this.showAlert1('Password updated Successfully');
          this.getPanels(this.defaultBusiOpt,this.defaultUsersOpt);
          this.closeRefa.nativeElement.click();
        },
        (error) => {
          this.errMsg = error.error.message;
        }
      );
    } else {
      this.errMsg = 'New Password and Confirm Password are not Matched';
    }
  }else{
    this.errMsg = 'All Fields are Required'
  }

    setTimeout(() => {
      this.errMsg = '';
    }, 3000);
  }

  openBDropdown() {
    this.Bdrpdwn = !this.Bdrpdwn;
  }
  openDropdown() {
    this.drpdwn = !this.drpdwn;
  }
  defaultOption(data: any) {
    const index = this.defaultBusiOpt.indexOf(data);
    if (index > -1) {
      this.defaultBusiOpt.splice(index, 1);
    } else {
      this.defaultBusiOpt.push(data);
    }
    console.log(this.defaultBusiOpt);
    this.getPanels(this.defaultBusiOpt,this.defaultUsersOpt);
  }
  defaulUsers(data: any) {
    const index = this.defaultUsersOpt.indexOf(data);
    if (index > -1) {
      this.defaultUsersOpt.splice(index, 1);
    } else {
      this.defaultUsersOpt.push(data);
    }
    console.log(this.defaultUsersOpt);
    this.getPanels(this.defaultBusiOpt,this.defaultUsersOpt);
  }
  backgroundcolor() {
    document.body.style.backgroundColor = '#fff';
  }

  // sweetalert
  showAlert1(message: any) {
    const swalWithStyle = Swal.mixin({
      customClass: {
        popup: 'my-custom-popup',
      },
    });
    swalWithStyle.fire({
      width: 400,
      color: '#000',
      icon: 'success',
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
        popup: 'my-custom-popup',
      },
    });
    swalWithStyle.fire({
      width: 400,
      color: '#000',
      icon: 'error',
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

  deletePostPop(panelId: any) {
    // let data={
    //   toDelete:toDelete,
    //   topicId: topicId
    // }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiServe.deletePanel(panelId).subscribe((res: any) => {
          if (res) {
            this.showAlert1('Panel Deleted Successfully');
            this.getPanels(this.defaultBusiOpt,this.defaultUsersOpt);
          }
        });
      }
    });
  }

  updatePanelName(data : any) {
    this.panelId = data?._id;
    this.inputText1 = data?.name
    
  }

  updatePanelData() {
    const payload = {
      name: this.updatePanelForm.value.panelName,
    };

    this.apiServe.updatePanel(this.panelId, payload).subscribe(
      (res: any) => {
        if (res) {
          this.showAlert1('Panel Updated Successfully!');
          this.updatePanelForm.reset();
          this.getPanels(this.defaultBusiOpt,this.defaultUsersOpt);
          this.closeRef.nativeElement.click();
        }
      },
      (error) => {
        this.showAlert2(error.error.msg);
      }
    );

    console.log(payload);
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }
}
