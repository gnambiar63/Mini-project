import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CO } from 'src/app/shared/CO.model';
import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  @Output() fire: EventEmitter<any> = new EventEmitter();

  private data : string = '';

  co:Array<CO>=[];
  course_details : FormGroup;
  public demo:Observable<any>;
  public CO_data:Array<Observable<any>>
  public time:Observable<any>; 




  constructor(private http: HttpClient) {
    this.messageSource.next(this.co);
  }

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


  change() {
    console.log('change started'); 
     this.fire.emit(this.co);
   }

   getEmittedValue() {
     return this.fire;
   }

   private messageSource = new BehaviorSubject(null);
   currentMessage = this.messageSource.asObservable();

   changeMessage(message: Array<CO>) {
    this.messageSource.next(message)
  }


}
