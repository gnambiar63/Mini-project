import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public temp;
  constructor() { }
  

  setCOValue(CO)
  {
    sessionStorage.setItem('CO', JSON.stringify(CO));
  }
  setPOValue(PO)
  {
    sessionStorage.setItem('PO', JSON.stringify(PO));
  }

  getCOValue()
  {
    this.temp = JSON.parse(sessionStorage.getItem('CO'));
    return this.temp;
  }

  getPOValue()
  {
    this.temp = JSON.parse(sessionStorage.getItem('PO'));
    return this.temp;
  }

  setdemo(Course_details)
  {
    sessionStorage.setItem('Course_Details', Course_details);
  }
  getdemo()
  {
    this.temp = sessionStorage.getItem('Course_Details');
    return this.temp;
  }
}
