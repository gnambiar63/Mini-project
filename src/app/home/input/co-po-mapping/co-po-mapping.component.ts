import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../shared/account.service';
import { CO } from '../../../shared/CO.model';
import { PO } from '../../../shared/PO.model';
import { StorageService } from '../../../shared/storage.service';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-co-po-mapping',
  templateUrl: './co-po-mapping.component.html',
  styleUrls: ['./co-po-mapping.component.css']
})
export class COPOMappingComponent implements OnInit {
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
    let x = document.getElementById("copo-"+String(this.stepper._steps.length-1));
    x.innerHTML="Save Changes";
    if(i >= this.stepper._steps.length-1)
    {
      this.final_button.nativeElement.disabled = false;
      (document.getElementById("copo-"+String(this.stepper._steps.length-1)) as HTMLButtonElement).disabled=true;
    }
  }

  PO_submit(num)
  {
    // this.co[this.PO_index].PO_map.push(this.PO_details.controls['po_pso'].value);
    console.log(num);

    var x = (this.PO_details.controls['po_pso'].value).toUpperCase();
    var y = x.substr(0,2);
    console.log(y);

    if(y.localeCompare("PO")==0)  //PO is added onto the specific CO
    {
      x = Number(x.substring(2));
      console.log(x)
      
      if(x>=1 && x<=12)
      {
        this.po[x-1].CO_list.push(num);
        this.po[x-1].CO_list.sort();
        this.co[num].PO_map.push(this.PO_details.controls['po_pso'].value);

      }
    }

    else if(y.localeCompare("PS")==0)    //PSO is added onto the specific CO
    {
      x = Number(x.substring(3));
      console.log(x)
      
      if(x>=1 && x<=3)
      {
        this.po[x+11].CO_list.push(num);
        this.po[x+11].CO_list.sort();
        this.co[num].PO_map.push(this.PO_details.controls['po_pso'].value);
      }
    }
    else
      {
        //console.log(this.po)
        alert('PO/PSO entered is invalid');
      }
    
      console.log(this.account_service.po);
    
    //this.co[num].PO_map.push(this.PO_details.controls['po_pso'].value);
    console.log(this.co[num].PO_map);
    this.show = true;
    this.account_service.changeMessage(this.co)

    this.storage.setCOValue(this.account_service.co)
    this.storage.setPOValue(this.account_service.po)
  }
  
  del(event,index,num){
    console.log(index+1);
    var x = this.co[num].PO_map[index].toString();
    this.co[num].PO_map.splice(index,1);

    console.log(x);

    if((x.substr(0,2)).localeCompare("PO") == 0)
    {
      index = Number(x.substring(2));
    }
    else
    {
      index = Number(x.substring(3));
    }
    index-=1;
    console.log(index);


    const loc = this.po[index].CO_list.indexOf(num);
    this.po[index].CO_list.splice(loc,1);
    // console.log(this.po[index].CO_list)
    // console.log(index)
    this.account_service.changeMessage(this.co)

    this.storage.setCOValue(this.account_service.co)
    this.storage.setPOValue(this.account_service.po)
  }

  Addup(event : Event)
  {
    this.account_service.PO_Total();
    // this.storage.setCOValue(this.account_service.co)
    this.storage.setPOValue(this.account_service.po)
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
