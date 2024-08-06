import { Component, OnInit, ViewChild } from '@angular/core';
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
  updatePanelForm: any;
  showPassword: any;
  constructor(private apiServe: ApiService) {}

  ngOnInit(): void {
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
    this.getPanels();

    this.changePasswordForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        passwordValidator(),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        passwordValidator(),
      ]),
      currentPassword: new FormControl('', Validators.required),
    });

    this.updatePanelForm = new FormGroup({
      panelName: new FormControl('', [Validators.required]),
    });
  }

  getPanels() {
    this.apiServe.getPanels().subscribe((res: any) => {
      this.showPanelList = res?.data;
    });
  }
  addData() {
    console.log(this.addDetails.value);
    this.apiServe.addPanels(this.addDetails.value).subscribe((res: any) => {
      if (res) {
        this.showAlert1('Panel added Successfully');
        this.getPanels();
      }
    });
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
  changePassword(id: any) {
    this.panelId = id;
  }
  updatePassword() {
    console.log(
      this.changePasswordForm.value.newPassword ===
        this.changePasswordForm.value.confirmPassword
    );
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
          this.getPanels();
          this.closeRefa.nativeElement.click();
        },
        (error) => {
          this.errMsg = error.error.message;
        }
      );
    } else {
      this.errMsg = 'New Password and Confirm Password are not Matched';
    }

    setTimeout(() => {
      this.errMsg = '';
    }, 3000);
  }

  openDropdown() {
    this.drpdwn = !this.drpdwn;
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
            this.getPanels();
          }
        });
      }
    });
  }

  updatePanelName(id: string) {
    this.panelId = id;
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
          this.getPanels();
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
