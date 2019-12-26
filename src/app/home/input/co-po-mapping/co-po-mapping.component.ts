import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';
import { CO } from 'src/app/shared/CO.model';
import { PO } from 'src/app/shared/PO.model';

@Component({
  selector: 'app-co-po-mapping',
  templateUrl: './co-po-mapping.component.html',
  styleUrls: ['./co-po-mapping.component.css']
})
export class COPOMappingComponent implements OnInit {

  PO_details:FormGroup;
  co:Array<CO>;
  po:Array<PO>;
  show:boolean=false;
  constructor(private fb:FormBuilder,private account_service:AccountService) { }



  ngOnInit() {
    this.PO_details=this.fb.group({
      po_pso:['',Validators.required]
    })
    this.co=this.account_service.co;
    this.po=this.account_service.po;
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
        this.co[num].PO_map.push(this.PO_details.controls['po_pso'].value);
      }
    }
    else
      {
        //console.log(this.po)
        alert('PO/PSO entered is invalid');
      }
    
    
    //this.co[num].PO_map.push(this.PO_details.controls['po_pso'].value);
    console.log(this.co[num].PO_map);
    this.show = true;
    this.account_service.changeMessage(this.co)
  }
  
  del(event,index,num){
    this.co[num].PO_map.splice(index,1);
    this.account_service.changeMessage(this.co)
  }

  Addup(event : Event)
  {
    this.account_service.PO_Total();
  }
}
