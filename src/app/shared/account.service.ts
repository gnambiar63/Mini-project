import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CO } from 'src/app/shared/CO.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private data : string = '';

  co:Array<CO>=[];

  constructor(private http: HttpClient) { }

  register(signupdata)
  {
    return this.http.post<any>("http://localhost:3000/register",signupdata);
  }
  login(logindata)
  {
    return this.http.post<any>("http://localhost:3000/login",logindata);
  }
  setValue(val) {
    this.co = val;
    return null;
  }

  getValue() {
      return this.co ;
  }
}
