import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-web-list',
  templateUrl: './web-list.component.html',
  styleUrls: ['./web-list.component.css']
})
export class WebListComponent implements OnInit {
  @ViewChild('closeRef') closeRef: any;
  addWebsite: any;
  motherID: any;
  showWebList: any;
  updateWebsiteForm: any;
  inputText1: string = '';
  websiteId: any;


  constructor(private activeRoute: ActivatedRoute, private apiServe: ApiService) { }

  ngOnInit(): void {
    this.addWebsite = new FormGroup({
      websiteURL: new FormControl('', Validators.required)
    })

    this.activeRoute.paramMap.subscribe((param: any) => {
      this.motherID = param.get('id')
    })
    this.getWebsitesList()

    this.updateWebsiteForm = new FormGroup({
      websiteName: new FormControl('', [Validators.required]),
    });
  }

  getWebsitesList() {
    this.apiServe.getWebsites(this.motherID).subscribe((res: any) => {
      this.showWebList = res?.data;
    })
  }

  addData() {
    let data = {
      "websiteURL": this.addWebsite?.value?.websiteURL,
      "motherPanelId": this.motherID
    }
    if (this.addWebsite.valid) {
      this.apiServe.addWebsite(data).subscribe((res: any) => {
        this.addWebsite.reset();
        this.getWebsitesList();
      })
    } else {
      this.showAlert2('Field is Required')
    }
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

  updateWebsiteName(data : any) {
    this.websiteId = data?._id;
    this.inputText1 = data?.websiteURL;
  }

  updateWebsiteData() {
    const payload = {
      websiteURL: this.updateWebsiteForm.value.websiteName,
    };

    this.apiServe.updateWebsite(this.websiteId, payload).subscribe(
      (res: any) => {
        if (res) {
          this.showAlert1('Website Updated Successfully!');
          this.updateWebsiteForm.reset();
          this.getWebsitesList();
          this.closeRef.nativeElement.click();
        }
      },
      (error) => {
        this.showAlert2(error.error.msg);
      }
    );
  }

  deleteWebsitePop(websiteId: any) {
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
        this.apiServe.deleteWesbite(websiteId).subscribe((res: any) => {
          if (res) {
            this.showAlert1('Wesbite Deleted Successfully');
            this.getWebsitesList();
          }
        });
      }
    });
  }
}
