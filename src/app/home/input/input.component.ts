import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CO } from 'src/app/shared/CO.model';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  course_details : FormGroup;
  CO_details : FormGroup;
  PO_details : FormGroup;

  arrayItems: {
    id: number;
    title: string;
  }[];

  demoform:FormGroup;
  show = false;
  co:Array<CO>=[];
  marks_dist: FormGroup;
  constructor(private fb:FormBuilder,private account_service:AccountService) {
    this.demoform = this.fb.group({demoArray:this.fb.array([])})
   }

  ngOnInit() {
    
    this.co = [];
    this.course_details=this.fb.group({
      name:['',[Validators.required]],
      code:['',[Validators.required,]],
      session:['',[Validators.required,]],
      semester:['',[Validators.required,]],
      credits:['',[Validators.required,]],
      ltp:['',[Validators.required,]],
      co:['',[Validators.required,]]
    })
  
      this.account_service.demo=this.course_details.valueChanges;
  }
  coursesubmit(){
    console.log("Ahead");
    console.log(this.course_details.value);
    this.co=this.account_service.co;
    for(let i=0;i<this.course_details.controls['co'].value;i++)
    {
      let val : CO = {
        Course_Outcome : "",
        Cognitive_Level : "",
        No_of_hours : "",
        PO_map : [],
        ISE1 : [],
        ISE2 : [],
        MSE : [],
        ESE : []
      };
      this.co.push(val);

      // this.account_service.course_details=this.course_details;
    }
    this.account_service.co=this.co;
  }

}
