import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../shared/account.service';
import { CO } from '../../../shared/CO.model';
import { PO } from '../../../shared/PO.model';
import { StorageService } from '../../../shared/storage.service';
import { MatStepper } from '@angular/material';
@Component({
  selector: 'app-co-pi-mapping',
  templateUrl: './co-pi-mapping.component.html',
  styleUrls: ['./co-pi-mapping.component.css']
})
export class CoPiMappingComponent implements OnInit {
  @ViewChild('stepper',{static: false}) stepper:MatStepper;
  @ViewChild('btn',{static: false}) final_button;

  PO_details:FormGroup;
  co:Array<CO>;
  po:Array<PO>;
  show:boolean=false;
  constructor(private fb:FormBuilder,private account_service:AccountService,private storage:StorageService) { }


  ngOnInit() {
    this.PO_details=this.fb.group({
      po_pso:['',Validators.required]
    })
    this.co=this.account_service.co;
    this.po=this.account_service.po;
  }

  access(event : Event,i)
  {
    let x = document.getElementById("copi-"+String(this.stepper._steps.length-1));
    x.innerHTML="Save Changes";
    if(i >= this.stepper._steps.length-1)
    {
      this.final_button.nativeElement.disabled = false;
      (document.getElementById("copi-"+String(this.stepper._steps.length-1)) as HTMLButtonElement).disabled=true;
    }
  }

  PO_submit(num)
  {
    // this.co[this.PO_index].PO_map.push(this.PO_details.controls['po_pso'].value);
    this.co[num].PI_map.push(this.PO_details.controls['po_pso'].value);
    this.show = true;
    this.account_service.changeMessage(this.co)

    this.storage.setCOValue(this.account_service.co)
    this.storage.setPOValue(this.account_service.po)
  }
  
  del(event,index,num){
    console.log(index+1);
    // var x = this.co[num].PO_map[index].toString();
    this.co[num].PI_map.splice(index,1);

    // console.log(this.po[index].CO_list)
    // console.log(index)
    this.account_service.changeMessage(this.co)

    this.storage.setCOValue(this.account_service.co)
    this.storage.setPOValue(this.account_service.po)
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
