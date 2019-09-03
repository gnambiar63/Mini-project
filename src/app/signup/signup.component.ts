import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupform: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.signupform= new FormGroup({
    //   Username: new FormControl(),
    //   Password: new FormControl()
    // });

    this.signupform = this.fb.group({
      Username: ['', Validators.required],
      Email:['', Validators.required],
      Password:['', [Validators.required, Validators.minLength(8)]],
      CPassword:['', [Validators.required, Validators.minLength(8)]]
    });


  }

  onsubmit():void{
    this.submitted=true;
    console.log(this.signupform.value);
  }

}
