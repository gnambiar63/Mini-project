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

  show = false;
  co:Array<CO>=[];
  marks_dist: FormGroup;
  constructor(private fb:FormBuilder,private account_service:AccountService) { }

  ngOnInit() {
    
    this.course_details=this.fb.group({
      name:['',[Validators.required]],
      code:['',[Validators.required,]],
      session:['',[Validators.required,]],
      semester:['',[Validators.required,]],
      credits:['',[Validators.required,]],
      ltp:['',[Validators.required,]],
      co:['',[Validators.required,]]
    })
  
      
  }
  coursesubmit(){
    console.log("Ahead");
    console.log(this.co);
    this.co=this.account_service.co;
    for(let i=0;i<this.course_details.controls['co'].value;i++)
    {
      let val : CO = {
        Course_Outcome : "",
        Cognitive_Level : "",
        No_of_hours : 0,
        PO_map : []
      };
      this.co.push(val);

      this.account_service.co=this.co;
    }
  }

}
