import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
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

  constructor(private fb:FormBuilder,private account_service:AccountService) { }

  ngOnInit() {
    
    this.marks_dist = this.fb.group({
      orders: new FormArray([])
    });

    this.co=this.account_service.co;
  }

}
