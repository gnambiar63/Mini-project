import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private data : string = '';

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
    this.data = val;
  }

  getValue() {
      return this.data ;
  }
}
