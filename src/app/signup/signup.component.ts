import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupform: FormGroup;
  submitted = false;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    // this.loginform= new FormGroup({
    //   Username: new FormControl(),
    //   Password: new FormControl()
    // });

    this.signupform=this.fb.group({
      Email:['',[Validators.required,Validators.email]],
      Password:['',[Validators.required,Validators.minLength(8)]],
      CPassword:['',[Validators.required,Validators.minLength(8)]],
    })


  }


  onsubmit():void{
    console.log(this.signupform.value);
  }

}

