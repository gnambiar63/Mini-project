import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';
import { CO } from 'src/app/shared/CO.model';
import { StorageService } from 'src/app/shared/storage.service';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-attainment',
  templateUrl: './attainment.component.html',
  styleUrls: ['./attainment.component.css']
})
export class AttainmentComponent implements OnInit {

  @ViewChild('stepper',{static: false}) stepper:MatStepper;

  marks_dist:FormGroup;
  co:Array<CO>;
  exam :Array<string>=["ISE1","ISE2","MSE","ESE"];
  exam_values:Array<string>=[];

  constructor(private fb:FormBuilder,private account_service:AccountService,private storage:StorageService) {
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

  ngAfterViewInit()
  {
    if(this.account_service.co.length!=0)
    {
      this.marks_dist.setValue({
        ISE1:this.co[0].ISE1A,
        ISE2:this.co[0].ISE2A,
        MSE:this.co[0].MSEA,
        ESE:this.co[0].ESEA
      });
    }
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

      var x = (100*(1*this.account_service.co[num].ISE1A + 1*this.account_service.co[num].ISE2A)/(this.account_service.co[num].ISE1*1 + this.account_service.co[num].ISE2*1));

      var y = 100*(this.account_service.co[num].MSEA)/(this.account_service.co[num].MSE*1);

      var z = 100*(this.account_service.co[num].ESEA)/(this.account_service.co[num].ESE*1);
      
      if((this.account_service.co[num].ISE1*1 + this.account_service.co[num].ISE2*1) == 0)
      {
        x = 0;
      }

      if((this.account_service.co[num].MSE*1) == 0)
      {
        y = 0;
      }

      if(this.account_service.co[num].ESE*1 == 0)
      {
        z = 0;
      }
      this.account_service.co[num].obt=(0.1*x + 0.3*y + 0.6*z);
      this.account_service.co[num].dv=100*((0.1*x + 0.3*y + 0.6*z)/(this.account_service.co[num].p))

      this.storage.setCOValue(this.account_service.co)

      if(this.account_service.co.length!=0 && num< this.stepper._steps.length-1 && this.marks_dist.touched == false  && this.marks_dist.dirty == false)
      {
        this.marks_dist.setValue({
          ISE1:this.co[num+1].ISE1A,
          ISE2:this.co[num+1].ISE2A,
          MSE:this.co[num+1].MSEA,
          ESE:this.co[num+1].ESEA
        });
      }
      // this.storage.setPOValue(this.account_service.po)
  }

  Update_Direct_PO(event : Event)
  {
    this.account_service.Direct_PO();
    // this.storage.setCOValue(this.account_service.co)
    this.storage.setPOValue(this.account_service.po)
    console.log(this.account_service.po)
  }

}
