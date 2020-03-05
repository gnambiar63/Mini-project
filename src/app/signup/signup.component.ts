import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  server_url="http://localhost:3000/register";
  signupform: FormGroup;
  submitted = false;
  branch: any = ['COMPS', 'IT', 'EXTC', 'ETRX','MCA']


  constructor(private fb:FormBuilder,private http: HttpClient,private account_service: AccountService,private router: Router) { }

  ngOnInit() {
    // this.loginform= new FormGroup({
    //   Username: new FormControl(),
    //   Password: new FormControl()
    // });

    this.signupform=this.fb.group({
      Email:['',[Validators.required,Validators.email]],
      Password:['',[Validators.required,Validators.minLength(8)]],
      CPassword:['',[Validators.required,Validators.minLength(8)]],
      Branch:['',[Validators.required]]

    })


  }


  onsubmit():void{
    //console.log(this.signupform.value);
    this.account_service.register(this.signupform.value).subscribe(
      (res)=> {
      //console.log(res)
      this.account_service.changeEmail(res.Email)        
      this.router.navigateByUrl('/start');
    },
      (err)=> {}////console.log(err)
    );
  }

}

