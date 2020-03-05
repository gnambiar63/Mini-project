import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AccountService } from '../../shared/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css']
})
export class DraftsComponent implements OnInit,AfterViewInit {
  
  papers;

  constructor(private account_service:AccountService,private router:Router) { }

  ngOnInit() {
    
}
  ngAfterViewInit()
  {
    //console.log(sessionStorage.getItem('Email'))
    this.account_service.find_draft().subscribe(
      (res)=> {
        //console.log(res);
        this.papers = res;
      },
      (err)=> 
      {
        //console.log(err);
      }
    );
  }

  Set_Value(event : Event,num)
  {
    sessionStorage.setItem('CO', JSON.stringify(this.papers[num].Data.CO));
    sessionStorage.setItem('PO', JSON.stringify(this.papers[num].Data.PO));
    sessionStorage.setItem('CD', JSON.stringify(this.papers[num].Data.Main_Details));
    this.router.navigateByUrl('/home');
  }
}
