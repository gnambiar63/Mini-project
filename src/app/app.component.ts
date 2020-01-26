import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './shared/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'obe';
  public mobile : any;
  public innerWidth: any;
  public email;
  constructor(public router : Router,private account_service:AccountService){
    this.account_service.currentEmail
      .subscribe(data => {
        this.email = data;
        if(data)
        {
          localStorage.setItem('Email', data);
        }
        console.log(localStorage.getItem('Email'))
        // console.log(this.co);
      });
  }
  ngOnInit(){
    if(localStorage.getItem('Email'))
    {
      this.email = localStorage.getItem('Email');
    }
    console.log("This is "+this.email)
    this.onResize(null);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth<1200)
    {
      this.mobile=true;
    }
    else{
      this.mobile=false;
      if(this.router.url === '/login')
      {
        console.log('true');
      }
      console.log(this.innerWidth);
    }
  }

  updateEmail($event)
  {
    console.log("update email")
    console.log($event)
    this.email = $event;
  }
}
