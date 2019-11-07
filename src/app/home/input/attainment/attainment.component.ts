import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';
import { CO } from 'src/app/shared/CO.model';

@Component({
  selector: 'app-attainment',
  templateUrl: './attainment.component.html',
  styleUrls: ['./attainment.component.css']
})
export class AttainmentComponent implements OnInit {


  marks_dist:FormGroup;
  co:Array<CO>;
  exam :Array<string>=["ISE1","ISE2","MSE","ESE"];
  exam_values:Array<string>=[];

  constructor(private fb:FormBuilder,private account_service:AccountService) {
    this.co=this.account_service.co;
   }

  ngOnInit() {
    
    this.marks_dist=this.fb.group({
      ISE1:['',Validators.required],
      ISE2:['',Validators.required],
      MSE:['',Validators.required],
      ESE:['',Validators.required]
    })

    this.co=this.account_service.co;
  }

  marks(num)
  {
   console.log(this.marks_dist.value); 
   this.account_service.co[num].ISE1A=this.marks_dist.controls['ISE1'].value;
   this.account_service.co[num].ISE2A=this.marks_dist.controls['ISE2'].value;
   this.account_service.co[num].MSEA=this.marks_dist.controls['MSE'].value;
   this.account_service.co[num].ESEA=this.marks_dist.controls['ESE'].value;

   if(this.account_service.co[num].ISE1A>0 || this.account_service.co[num].ISE2A > 0)
      {
        this.account_service.co[num].p=this.account_service.co[num].p+20;
        console.log('ISEtrue');
      }
      if(this.account_service.co[num].MSEA> 0)
      {
        this.account_service.co[num].p=this.account_service.co[num].p+20;
        console.log('MSEtrue');
      }
      if(this.account_service.co[num].ESEA> 0)
      {
        this.account_service.co[num].p=this.account_service.co[num].p+60;
        console.log('ESEtrue');
      }
      
      this.account_service.co[num].dv=100*((0.1*(100*(1*this.account_service.co[num].ISE1A + 1*this.account_service.co[num].ISE2A)/(0.01*this.account_service.co[num].ISE1*10 + 0.01*this.account_service.co[num].ISE2*10)) + 0.3*100*(this.account_service.co[num].MSEA)/(0.01*this.account_service.co[num].MSE*20) + 0.6*100*(this.account_service.co[num].ESEA)/(0.01*this.account_service.co[num].ESE*60))/(this.account_service.co[num].p))
  }

}
