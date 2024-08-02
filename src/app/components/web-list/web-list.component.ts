import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-web-list',
  templateUrl: './web-list.component.html',
  styleUrls: ['./web-list.component.css']
})
export class WebListComponent implements OnInit {

  addWebsite: any;
  motherID: any;
  showWebList : any;

  constructor(private activeRoute: ActivatedRoute, private apiServe: ApiService) { }

  ngOnInit(): void {
    this.addWebsite = new FormGroup({
      websiteURL: new FormControl('', Validators.required)
    })

    this.activeRoute.paramMap.subscribe((param: any) => {
      this.motherID = param.get('id')
    })
    this.getWebsitesList()
  }

  getWebsitesList(){
    this.apiServe.getWebsites(this.motherID).subscribe((res : any)=>{
      this.showWebList = res?.data;
    })
  }

  addData() {
    let data = {
      "websiteURL": this.addWebsite?.value?.websiteURL,
      "motherPanelId": this.motherID
    }
    console.log(data,'payload');
    this.apiServe.addWebsite(data).subscribe((res : any)=>{
      this.getWebsitesList();
    })
  }
}
