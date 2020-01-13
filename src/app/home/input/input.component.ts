import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CO } from 'src/app/shared/CO.model';
import { AccountService } from 'src/app/shared/account.service';
import { PO } from 'src/app/shared/PO.model';

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
  po:Array<PO>=[];
  marks_dist: FormGroup;

  
  constructor(private fb:FormBuilder,private account_service:AccountService) {
    this.demoform = this.fb.group({demoArray:this.fb.array([])})
   }

  ngOnInit() {
    for(let i=0;i<15;i++)
    {
      let val : PO = {
        Description : "",
        Verbs : "",
        CO_list : [],
        Justification : "",
        Total_Sessions:0,
        Level:0,
        Direct_PO:0,
        Indirect_PO:0,
        L1:0,
        L2:0
      };
      this.po.push(val);
    }
    this.account_service.po=this.po;

    
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
    this.po=this.account_service.po;

    this.account_service.course_details=this.course_details;

    var addvar = this.course_details.controls['co'].value - this.co.length;


    if(addvar >= 0)
    {
      for(let i=0;i<(addvar);i++)
      {
        let val : CO = {
          Course_Outcome : "",
          Cognitive_Level : "",
          No_of_hours : "",
          PO_map : [],
          ISE1 : 0,
          ISE2 : 0,
          MSE : 0,
          ESE : 0,
  
          ISE1A:0,
          ISE2A:0,
          MSEA:0,
          ESEA:0,
  
          p:0,
          obt:0,
          dv:0,
          course_exit : [0,0,0]
        };
        this.co.push(val);
  
        // this.account_service.course_details=this.course_details;
      }
    }

    else
    {
      for(let i = 0;i<Math.abs(addvar);i++)
      {
        this.co.pop();
      }
      console.log(this.co.length)
    }
    
    this.account_service.co=this.co;
  }

}
