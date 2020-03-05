import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { CO } from '../shared/CO.model';
import { PO } from '../shared/PO.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  @ViewChild('sidenav',{static: false}) sidenav : MatSidenav;

  viewvar = 0;
  test = "side"

  co:Array<CO>=[];
  po:Array<PO>=[];
  main_course_details=["","","","","","","",[],"","","","",""]; //course-name,course-code,lab,semester,credits,ltp,prerequisites,ise,mse,ese,total,Faculty in charge

  constructor(private router:Router) { }
  
  mode = new FormControl('over');
  ngOnInit() {

  }

  swapview(x)
  {
    if(x == 'new')
    {
      this.viewvar = 1;
    }
    else if(x == 'record')
    {
      this.viewvar = 2;
    }
    else
    {
      this.viewvar = 0;
    }
  }
  Redirect(event : Event)
  {
    
    sessionStorage.setItem('CO', JSON.stringify(this.co));
    sessionStorage.setItem('PO', JSON.stringify(this.po));
    sessionStorage.setItem('CD', JSON.stringify(this.main_course_details));
    this.router.navigateByUrl('/home');
  }
}
