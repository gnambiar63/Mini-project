import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public mobile:boolean=true;
  constructor(private account_service:AccountService,private storage:StorageService) { }

  ngOnInit() {

    if(this.storage.getCOValue())
    {
      this.account_service.co = this.storage.getCOValue()
    }
    if(this.storage.getPOValue())
    {
      this.account_service.po = this.storage.getPOValue()
    }
    if(this.storage.getCourseDetailsValue())
    {
      this.account_service.main_course_details = this.storage.getCourseDetailsValue()
    }
    console.log(this.account_service.co)
    console.log(this.account_service.po)
    console.log(this.account_service.main_course_details)

  }

}
