import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';
import { CO } from 'src/app/shared/CO.model';

@Component({
  selector: 'app-marks-distribution',
  templateUrl: './marks-distribution.component.html',
  styleUrls: ['./marks-distribution.component.css']
})
export class MarksDistributionComponent implements OnInit {

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
   this.account_service.co[num].ISE1=this.marks_dist.controls['ISE1'].value;
   this.account_service.co[num].ISE2=this.marks_dist.controls['ISE2'].value;
   this.account_service.co[num].MSE=this.marks_dist.controls['MSE'].value;
   this.account_service.co[num].ESE=this.marks_dist.controls['ESE'].value;
  }

}
