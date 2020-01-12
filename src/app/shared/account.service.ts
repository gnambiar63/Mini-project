import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CO } from 'src/app/shared/CO.model';
import { PO } from 'src/app/shared/PO.model';
import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  @Output() fire: EventEmitter<any> = new EventEmitter();

  private data : string = '';


  co:Array<CO>=[];
  po:Array<PO>=[];
  course_details : FormGroup;
  public demo:Observable<any>;
  public course_exit:Observable<any>;
  public CO_data:Array<Observable<any>>
  public time:Observable<any>; 
  public sum:number = 0;




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

   Direct_PO()
   {
    for(let i=0;i<15;i++)
    {
      if(this.po[i].CO_list.length != 0)
      {
        this.po[i].CO_list.forEach((item)=>
        {  
           //console.log(this.sum) 
           this.po[i].Direct_PO += Number(this.co[item].dv) 
        });
        this.po[i].Direct_PO /= this.po[i].CO_list.length;
      }
    }
   }

   Indirect_PO()
   {
    for(let i=0;i<15;i++)
    {
      if(this.po[i].CO_list.length != 0)
      {
        this.po[i].CO_list.forEach((item)=>
        {  
           //console.log(this.sum) 
           this.po[i].Indirect_PO += Number(((this.co[item].course_exit[2])*3 + (this.co[item].course_exit[1])*2 + (this.co[item].course_exit[0])*1)/((this.co[item].course_exit[2]*1 + this.co[item].course_exit[1]*1 + this.co[item].course_exit[0]*1)*3)*100) 
        });
        this.po[i].Indirect_PO /= this.po[i].CO_list.length;
        // console.log(this.po[i].Indirect_PO);
        this.po[i].L1=this.Attainment_Calculation(this.po[i].Direct_PO)
        this.po[i].L2=this.Attainment_Calculation(this.po[i].Indirect_PO)
      }
    }
   }

   Attainment_Calculation(x)
   {
     if(x>=60)
     {
        return 3;
     }
     else if(x>=40 && x<60)
     {
      return 2;
     }
     else{
      return 1;
     }
   }


   PO_Total()
   {
      for(let i=0;i<15;i++)
      {
        this.sum = 0;
        this.po[i].CO_list.forEach((item)=>
        {  
           //console.log(this.sum) 
           this.sum += Number(this.co[item].No_of_hours) 
        });
        this.po[i].Total_Sessions = this.sum
        //Level Left
        this.Level_Calculation(i)
      }
   }

   Level_Calculation(i)
   {
     if(this.course_details.controls['session'].value == 48) //case for 48 hr course sessions
     {
        if(this.po[i].Total_Sessions >=19)
        {
          this.po[i].Level = 3;
        }
        else if(this.po[i].Total_Sessions >=12)
        {
          this.po[i].Level = 2;
        }
        else if(this.po[i].Total_Sessions == 0)
        {
          this.po[i].Level = 0;
        }
        else{
          this.po[i].Level = 1;
        }
     }

     else if(this.course_details.controls['session'].value == 42) //case for 42 hr course sessions
     {
        if(this.po[i].Total_Sessions >=17)
        {
          this.po[i].Level = 3;
        }
        else if(this.po[i].Total_Sessions >=11)
        {
          this.po[i].Level = 2;
        }
        else if(this.po[i].Total_Sessions == 0)
        {
          this.po[i].Level = 0;
        }
        else{
          this.po[i].Level = 1;
        }
     }

     else //case for 39 hr course sessions
     {
        if(this.po[i].Total_Sessions >=16)
        {
          this.po[i].Level = 3;
        }
        else if(this.po[i].Total_Sessions >=10)
        {
          this.po[i].Level = 2;
        }
        else if(this.po[i].Total_Sessions == 0)
        {
          this.po[i].Level = 0;
        }
        else{
          this.po[i].Level = 1;
        }
     }
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
