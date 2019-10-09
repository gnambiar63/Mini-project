import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  submitted = false;
  public loginsuccess : number;
  public loginfailed : number;
  public Email : string = "";


  constructor(private account_service: AccountService,private fb: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.loginform=this.fb.group({
      Email:['',[Validators.required,Validators.email]],
      Password:['',[Validators.required,Validators.minLength(8)]]
    })


  }

  onsubmit():void{
    console.log(this.loginform.value);
    this.account_service.login(this.loginform.value).subscribe(
      (res)=> {
        console.log(res);
        this.loginsuccess = res.value;
        console.log('Inside'+this.loginsuccess);
        this.loginfailed = res.fvalue;
        this.Email = res.Email;
      },
      (err)=> {console.log(err)}
    );
    console.log(this.loginsuccess);

    // if(true)
    // {
    //   console.log(this.loginsuccess);
    //   console.log('Moving to home');
    //   this.account_service.setValue(this.Email);
    //   this.router.navigate(['/home']);
    // }
  }

}
