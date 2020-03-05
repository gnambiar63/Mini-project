import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CO } from './CO.model';
import { PO } from './PO.model';
import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  @Output() fire: EventEmitter<any> = new EventEmitter();

  private data : string = '';
  public email : string = '';

  public url = "https://outcome-based-evaluation.herokuapp.com";
  //"http://"+ window.location.hostname +":3000/register

  co:Array<CO>=[];
  po:Array<PO>=[];
  main_course_details=["","","","","","","",[],"","","","",""]; //course-name,course-code,lab,semester,credits,ltp,prerequisites,ise,mse,ese,total,Faculty in charge
  course_details : FormGroup;
  public demo:Observable<any>;
  public course_exit:Observable<any>;
  public CO_data:Array<Observable<any>>
  public time:Observable<any>; 
  public sum:number = 0;

  public final_attainment = [0,0];

  public prereq = [];



  constructor(private http: HttpClient) {
    this.messageSource.next(this.co);
    this.messageSource.next(this.email);
  }

  register(signupdata)
  {
    return this.http.post<any>(this.url + "/register",signupdata);
  }
  login(logindata)
  {
    //console.log(window.location.hostname)
    return this.http.post<any>(this.url +"/login",logindata);
  }
  save_draft()
  {
    var file = {
      "Subject_Code":this.main_course_details[1],
      "Email":sessionStorage.getItem('Email'),
      "Main_Details":this.main_course_details,
      "CO":this.co,
      "PO":this.po
    }
    return this.http.post<any>(this.url +"/saveDraft",file);
  }
  find_draft()
  {
    var email={
      "Email" : sessionStorage.getItem('Email')
    }
    //console.log(email.Email)
    return this.http.post<any>(this.url + "/findDraft",email);
  }
  // setValue(val) {
  //   this.co = val;
  //   return null;
  // }

  // getValue() {
  //     return this.co ;
  // }


  change() {
    //console.log('change started'); 
     this.fire.emit(this.co);
   }

   updateMail() {
    //console.log('change started'); 
     this.fire.emit(this.email);
   }

   Direct_PO()
   {
    for(let i=0;i<15;i++)
    {
      if(this.po[i].CO_list.length != 0)
      {
        this.po[i].CO_list.forEach((item)=>
        {  
           ////console.log(this.sum) 
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
           ////console.log(this.sum) 
           this.po[i].Indirect_PO += Number(((this.co[item].course_exit[2])*3 + (this.co[item].course_exit[1])*2 + (this.co[item].course_exit[0])*1)/((this.co[item].course_exit[2]*1 + this.co[item].course_exit[1]*1 + this.co[item].course_exit[0]*1)*3)*100) 
        });
        this.po[i].Indirect_PO /= this.po[i].CO_list.length;
        // //console.log(this.po[i].Indirect_PO);
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
           ////console.log(this.sum) 
           this.sum += Number(this.co[item].No_of_hours) 
        });
        this.po[i].Total_Sessions = this.sum
        //Level Left
        this.Level_Calculation(i)
      }
   }

   Level_Calculation(i)
   {

      this.po[i].Level = this.po[i].Total_Sessions/this.po[i].CO_list.length;
      if(this.po[i].Level > 3)
      {
        this.po[i].Level = 3;
      }
      else if(this.po[i].Total_Sessions == 0)
      {
        this.po[i].Level = 0
      }
    //  if(this.course_details.controls['session'].value == 48) //case for 48 hr course sessions
    //  {
    //     if(this.po[i].Total_Sessions >=19)
    //     {
    //       this.po[i].Level = 3;
    //     }
    //     else if(this.po[i].Total_Sessions >=12)
    //     {
    //       this.po[i].Level = 2;
    //     }
    //     else if(this.po[i].Total_Sessions == 0)
    //     {
    //       this.po[i].Level = 0;
    //     }
    //     else{
    //       this.po[i].Level = 1;
    //     }
    //  }

    //  else if(this.course_details.controls['session'].value == 42) //case for 42 hr course sessions
    //  {
    //     if(this.po[i].Total_Sessions >=17)
    //     {
    //       this.po[i].Level = 3;
    //     }
    //     else if(this.po[i].Total_Sessions >=11)
    //     {
    //       this.po[i].Level = 2;
    //     }
    //     else if(this.po[i].Total_Sessions == 0)
    //     {
    //       this.po[i].Level = 0;
    //     }
    //     else{
    //       this.po[i].Level = 1;
    //     }
    //  }

    //  else //case for 39 hr course sessions
    //  {
    //     if(this.po[i].Total_Sessions >=16)
    //     {
    //       this.po[i].Level = 3;
    //     }
    //     else if(this.po[i].Total_Sessions >=10)
    //     {
    //       this.po[i].Level = 2;
    //     }
    //     else if(this.po[i].Total_Sessions == 0)
    //     {
    //       this.po[i].Level = 0;
    //     }
    //     else{
    //       this.po[i].Level = 1;
    //     }
    //  }
   }
   New_Direct_CO()
   {
     if(this.main_course_details[2]!="1")
     {
      for(let i=0;i<this.co.length;i++)
      {
        let num = 2;
        if(this.co[i].ISE1 == 0 || this.co[i].ISE2 == 0)
        {
          num--;
        }
        this.co[i].ISEAvg = (this.co[i].ISE1 + this.co[i].ISE2)/num;
        if(this.co[i].ISEAvg > 70)
        {
         this.co[i].ISEA = 3;
        }
        else if(this.co[i].ISEAvg > 50)
        {
         this.co[i].ISEA = 2;
        }
        else if(this.co[i].ISEAvg == 0)
        {
         this.co[i].ISEA = 0;
        }
        else
        {
         this.co[i].ISEA = 1;
        } 
 
        if(this.co[i].MSE > 60)
        {
         this.co[i].MSEA = 3;
        }
        else if(this.co[i].MSE > 40)
        {
         this.co[i].MSEA = 2;
        }
        else if(this.co[i].MSE == 0)
        {
         this.co[i].MSEA = 0;
        }
        else
        {
         this.co[i].MSEA = 1;
        }
        
        if(this.co[i].ESE > 60)
        {
         this.co[i].ESEA = 3;
        }
        else if(this.co[i].ESE > 40)
        {
         this.co[i].ESEA = 2;
        }
        else if(this.co[i].ESE == 0)
        {
         this.co[i].ESEA = 0;
        }
        else
        {
         this.co[i].ESEA = 1;
        } 
      }
     }
     else
     {
      for(let i=0;i<this.co.length;i++)
      {
        let num = 2;
        if(this.co[i].ISE1 == 0 || this.co[i].ISE2 == 0)
        {
          num--;
        }
        this.co[i].ISEAvg = (this.co[i].ISE1 + this.co[i].ISE2)/num;
        if(this.co[i].ISEAvg > 80)
        {
         this.co[i].ISEA = 3;
        }
        else if(this.co[i].ISEAvg > 60)
        {
         this.co[i].ISEA = 2;
        }
        else if(this.co[i].ISEAvg == 0)
        {
         this.co[i].ISEA = 0;
        }
        else
        {
         this.co[i].ISEA = 1;
        } 
 
        if(this.co[i].MSE > 60)
        {
         this.co[i].MSEA = 3;
        }
        else if(this.co[i].MSE > 40)
        {
         this.co[i].MSEA = 2;
        }
        else if(this.co[i].MSE == 0)
        {
         this.co[i].MSEA = 0;
        }
        else
        {
         this.co[i].MSEA = 1;
        }
        
        if(this.co[i].ESE > 80)
        {
         this.co[i].ESEA = 3;
        }
        else if(this.co[i].ESE > 60)
        {
         this.co[i].ESEA = 2;
        }
        else if(this.co[i].ESE == 0)
        {
         this.co[i].ESEA = 0;
        }
        else
        {
         this.co[i].ESEA = 1;
        } 
      }
     }
     this.Direct_CO_Value()
   }
   Direct_CO_Value()
   {
      for(let i=0;i<this.co.length;i++)
      {
        this.co[i].dv = (0.2*(this.co[i].ISEA) + 0.2*(this.co[i].MSEA) + 0.6*(this.co[i].ESEA));
        //console.log(this.co[i].dv)


        if((this.co[i].MSEA == 0 && this.co[i].ESEA == 0) || (this.co[i].ESEA == 0 && this.co[i].ISEA == 0))
        {
          this.co[i].dv *= 5;
          //console.log(this.co[i].dv)
        }
        else if(this.co[i].MSEA == 0 || this.co[i].ISEA == 0)
        {
          this.co[i].dv *= 1.25;
        }
        else if(this.co[i].ESEA == 0)
        {
          this.co[i].dv *= 2.5;
        }
        else if(this.co[i].MSEA == 0 && this.co[i].ISEA == 0)
        {
          this.co[i].dv = this.co[i].ESEA;
        }

        //console.log(this.co[i].dv)
      }
   }

   New_Direct_Course_Exit_Attainment()
   {
     for(let i=0;i<this.co.length;i++)
     {
      let x = (((this.co[i].course_exit[2])*3 + (this.co[i].course_exit[1])*2 + 1*(this.co[i].course_exit[0]))/((1*(this.co[i].course_exit[2]) + 1*(this.co[i].course_exit[1]) + 1*(this.co[i].course_exit[0]))*3))*100;
      if(x > 80)
      {
       this.co[i].CSA = 3;
      }
      else if(x > 60)
      {
       this.co[i].CSA = 2;
      }
      else
      {
       this.co[i].CSA = 1;
      }
      //console.log(this.co[i].CSA) 
     }
     this.Total_Attainment()
   }
   Total_Attainment()
   {
    for(let i=0;i<this.co.length;i++)
    {
      this.co[i].Total_Attainment = 0.8*(this.co[i].dv) + 0.2*(this.co[i].CSA);
      
      if(this.co[i].Total_Attainment < (this.co[i].CO_Target/100)*3)
      {
        this.co[i].Action = true;
      }
    }
    this.Overall_Direct_And_Indirect_Attainment_Level()
   }

   Overall_Direct_And_Indirect_Attainment_Level()
   {
    let ctr = 0;
    for(let i=0;i<this.po.length;i++)
    {
      if(this.po[i].CO_list.length!=0)
      {
        let dir = 0;
        let indir = 0;
        ctr = ctr + 1;
        for(let j=0;j<this.po[i].CO_list.length;j++)
        {
          dir += this.co[this.po[i].CO_list[j]].dv
          indir += this.co[this.po[i].CO_list[j]].CSA
        }
        dir /= this.po[i].CO_list.length;
        indir /= this.po[i].CO_list.length;

        this.po[i].dir = dir;
        this.po[i].indir = indir;

        this.final_attainment[0] += dir;
        this.final_attainment[1] += indir;
      }
    }
    this.final_attainment[0] /= ctr;
    this.final_attainment[1] /= ctr;

    this.changeData(this.final_attainment)
   }

   getEmittedValue() {
     return this.fire;
   }

   private messageSource = new BehaviorSubject(null);
   currentMessage = this.messageSource.asObservable();

   changeMessage(message: Array<CO>) {
    this.messageSource.next(message)
  }

  private EmailSource = new BehaviorSubject(null);
  currentEmail = this.EmailSource.asObservable();

  changeEmail(Email : string)
  {
    this.EmailSource.next(Email);
  }

  private DataSource = new BehaviorSubject(null);
  currentData = this.DataSource.asObservable();

  changeData(message: Array<number>) 
  {
   this.DataSource.next(message)
 }

}
