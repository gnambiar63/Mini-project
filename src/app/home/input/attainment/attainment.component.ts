import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../../../shared/account.service';
import { CO } from '../../../shared/CO.model';
import { StorageService } from '../../../shared/storage.service';
import { MatStepper } from '@angular/material';
import { PO } from '../../../shared/PO.model';

@Component({
  selector: 'app-attainment',
  templateUrl: './attainment.component.html',
  styleUrls: ['./attainment.component.css']
})
export class AttainmentComponent implements OnInit {

  @ViewChild('stepper',{static: false}) stepper:MatStepper;
  @ViewChild('btn',{static: false}) final_button;

  marks_dist:FormGroup;
  co:Array<CO>;
  po:Array<PO>;
  exam :Array<string>=["ISE1","ISE2","MSE","ESE"];
  exam_values:Array<string>=[];
  ctr=0;

  constructor(private fb:FormBuilder,private account_service:AccountService,private storage:StorageService) {
    this.marks_dist=this.fb.group({
      Action_Plan:['',Validators.required]
    })
    this.co=this.account_service.co;
    this.po=this.account_service.po;
   }


  ngOnInit() {

    this.co=this.account_service.co;
    this.po=this.account_service.po;
  }

  ngAfterViewInit()
  {

  }

  access(event : Event,i)
  {
    // console.log(this.stepper._steps.length-1)
    // if(this.ctr == this.stepper._steps.length-1)
    // {
    //   let x = document.getElementById("at-"+String(this.stepper._steps.length-1));
    //   x.innerHTML="Save Changes";
    // }

  }
  

  marks(num)
  {
    this.po[num].PO_Action = this.marks_dist.controls['Action_Plan'].value;

      this.storage.setCOValue(this.account_service.co)
      this.storage.setPOValue(this.account_service.po)

      // if(this.account_service.co.length!=0 && this.ctr< this.stepper._steps.length-1 && this.marks_dist.touched == false  && this.marks_dist.dirty == false)
      // {
      //   this.marks_dist.setValue({
      //     Action_Plan:this.po[num+1].PO_Action
      //   });
      // }

      // if(this.ctr >= this.stepper._steps.length-1)
      // {
      //   this.final_button.nativeElement.disabled = false;
      //   (document.getElementById("at-"+String(this.stepper._steps.length-1)) as HTMLButtonElement).disabled=true;
      // }
      console.log(this.ctr)
      this.ctr = this.ctr + 1
      // this.storage.setPOValue(this.account_service.po)
  }

  Update_Direct_PO(event : Event)
  {
    this.account_service.Direct_PO();
    // this.storage.setCOValue(this.account_service.co)
    this.storage.setPOValue(this.account_service.po)
    console.log(this.account_service.po)
  }

  Save(event:Event)
  {
    this.account_service.save_draft().subscribe(
      (res)=>{
        console.log("File saved")
      },
      (err)=>{
        console.log("Failed!!")
      }
    );
  }

}
