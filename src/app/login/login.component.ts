import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.loginform= new FormGroup({
    //   Username: new FormControl(),
    //   Password: new FormControl()
    // });

    this.loginform = this.fb.group({
      Username: ['', Validators.required],
      Password:['', [Validators.required, Validators.minLength(8)]]
    });


  }

  onsubmit():void{
    console.log(this.loginform.value);
  }

}
