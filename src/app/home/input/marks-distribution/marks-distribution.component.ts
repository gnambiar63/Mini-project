import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AccountService } from '../../../shared/account.service';
import { CO } from '../../../shared/CO.model';
import { StorageService } from '../../../shared/storage.service';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-marks-distribution',
  templateUrl: './marks-distribution.component.html',
  styleUrls: ['./marks-distribution.component.css']
})
export class MarksDistributionComponent implements OnInit {

  @ViewChild('stepper',{static: false}) stepper:MatStepper;
  @ViewChild('btn',{static: false}) final_button;


  marks_dist:FormGroup;
  co:Array<CO>;
  exam :Array<string>=["ISE1","ISE2","ISE3","ISE4","MSE","ESE"];
  exam_values:Array<string>=[];

  constructor(private fb:FormBuilder,private account_service:AccountService,private storage:StorageService) {
    this.co=this.account_service.co;
   }

  ngOnInit() {
    
    this.marks_dist=this.fb.group({
      ISE1:['',Validators.required],
      ISE2:['',Validators.required],
      ISE3:['',Validators.required],
      ISE4:['',Validators.required],
      MSE:['',Validators.required],
      ESE:['',Validators.required]
    })

    this.co=this.account_service.co;
  }

  ngAfterViewInit()
  {
    setTimeout(() => {
      if(this.account_service.co.length!=0)
      {
        this.marks_dist.setValue({
          ISE1:this.co[0].ISE1,
          ISE2:this.co[0].ISE2,
          ISE3:this.co[0].ISE2,
          ISE4:this.co[0].ISE2,
          MSE:this.co[0].MSE,
          ESE:this.co[0].ESE
        });
      }
    });
  }

  access(event : Event,i)
  {
    let x = document.getElementById("mardist-"+String(this.stepper._steps.length-1));
    x.innerHTML="Save Changes";

  }

  marks(num)
  {
  //  console.log(this.marks_dist.value); 
   this.account_service.co[num].ISE1=this.marks_dist.controls['ISE1'].value;
   this.account_service.co[num].ISE2=this.marks_dist.controls['ISE2'].value;
   this.account_service.co[num].ISE3=this.marks_dist.controls['ISE3'].value;
   this.account_service.co[num].ISE4=this.marks_dist.controls['ISE4'].value;
   this.account_service.co[num].MSE=this.marks_dist.controls['MSE'].value;
   this.account_service.co[num].ESE=this.marks_dist.controls['ESE'].value;

   this.storage.setCOValue(this.account_service.co)

   if(this.account_service.co.length!=0 && num< this.stepper._steps.length-1 && this.marks_dist.touched == false  && this.marks_dist.dirty == false)
   {
     this.marks_dist.setValue({
       ISE1:this.co[num+1].ISE1,
       ISE2:this.co[num+1].ISE2,
       ISE3:this.co[num+1].ISE3,
       ISE4:this.co[num+1].ISE4,
       MSE:this.co[num+1].MSE,
       ESE:this.co[num+1].ESE
     });
   }
   if(num >= this.stepper._steps.length-1)
   {
      // console.log(num)
      this.final_button.nativeElement.disabled = false;
     (document.getElementById("mardist-"+String(this.stepper._steps.length-1)) as HTMLButtonElement).disabled=true;
   }
  //  this.storage.setPOValue(this.account_service.po)
  }
  Update_New_Direct_CO(event : Event)
  {
    this.account_service.New_Direct_CO();
    // this.storage.setCOValue(this.account_service.co)
    this.storage.setCOValue(this.account_service.co)
    this.storage.setPOValue(this.account_service.po)
    this.account_service.save_draft().subscribe(
      (res)=>{
        // console.log("File saved")
      },
      (err)=>{
        // console.log("Failed!!")
      }
    );
    console.log(this.account_service.co)
  }

}
