import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';
import { CO } from 'src/app/shared/CO.model';

@Component({
  selector: 'app-co-po-mapping',
  templateUrl: './co-po-mapping.component.html',
  styleUrls: ['./co-po-mapping.component.css']
})
export class COPOMappingComponent implements OnInit {

  PO_details:FormGroup;
  co:Array<CO>;
  show:boolean=false;
  constructor(private fb:FormBuilder,private account_service:AccountService) { }



  ngOnInit() {
    this.PO_details=this.fb.group({
      po_pso:['',Validators.required]
    })
    this.co=this.account_service.co;
  }
  PO_submit(num)
  {
    // this.co[this.PO_index].PO_map.push(this.PO_details.controls['po_pso'].value);
    console.log(num);
    this.co[num].PO_map.push(this.PO_details.controls['po_pso'].value);
    console.log(this.co[num].PO_map);
    this.show = true;
  }
  
  del(event,index,num){
    this.co[num].PO_map.splice(index,1);
  }
}
