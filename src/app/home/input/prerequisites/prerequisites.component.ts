import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../shared/account.service';
import { CO } from '../../../shared/CO.model';
import { PO } from '../../../shared/PO.model';
import { StorageService } from '../../../shared/storage.service';
import { MatStepper } from '@angular/material';
@Component({
  selector: 'app-prerequisites',
  templateUrl: './prerequisites.component.html',
  styleUrls: ['./prerequisites.component.css']
})
export class PrerequisitesComponent implements OnInit {

  @ViewChild('stepper',{static: false}) stepper:MatStepper;
  @ViewChild('btn',{static: false}) final_button;

  PO_details:FormGroup;
  co:Array<CO>;
  po:Array<PO>;
  show:boolean=false;
  constructor(private fb:FormBuilder,private account_service:AccountService,private storage:StorageService) { }
  preq;

  ngOnInit() {
    this.PO_details=this.fb.group({
      po_pso:['',Validators.required]
    })
    this.co=this.account_service.co;
    this.po=this.account_service.po;
    this.preq = this.account_service.main_course_details[7]
    //console.log(this.preq);
    
  }


  PO_submit()
  {
    // this.co[this.PO_index].PO_map.push(this.PO_details.controls['po_pso'].value);
    this.preq.push(this.PO_details.controls['po_pso'].value);
    this.account_service.main_course_details[7] = this.preq;
    this.show = true;
    this.account_service.changeMessage(this.co)

    this.storage.setCOValue(this.account_service.co)
    this.storage.setPOValue(this.account_service.po)
    this.storage.setCourseDetailsValue(this.account_service.main_course_details)


  }
  
  del(event,index){
    //console.log(index+1);
    // var x = this.co[num].PO_map[index].toString();
    this.preq.splice(index,1);
    this.account_service.main_course_details[7] = this.preq;

    // console.log(this.po[index].CO_list)
    // console.log(index)
    this.account_service.changeMessage(this.co)

    this.storage.setCOValue(this.account_service.co)
    this.storage.setPOValue(this.account_service.po)
    this.storage.setCourseDetailsValue(this.account_service.main_course_details)
  }

  Save(event:Event)
  {
    this.account_service.save_draft().subscribe(
      (res)=>{
        //console.log("File saved")
      },
      (err)=>{
        //console.log("Failed!!")
      }
    );
  }


}
