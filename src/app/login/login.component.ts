import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor() { }

  ngOnInit() {
    this.loginForm= new FormGroup({
      Username: new FormControl(),
      Password: new FormControl()
    });


  }

  onsubmit():void{
    console.log(this.loginForm.value);
  }

}
