import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  submitted = false;

  constructor() { }

  ngOnInit() {
    this.loginform= new FormGroup({
      Username: new FormControl(),
      Password: new FormControl()
    });


  }

  onsubmit():void{
    console.log(this.loginform.value);
  }

}
