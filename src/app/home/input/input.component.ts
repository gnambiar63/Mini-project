import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CO } from 'src/app/shared/CO.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  course_details : FormGroup;
  CO_details : FormGroup;
  PO_details : FormGroup;
  exam :Array<string>=["ISE1","ISE2","MSE","ESE"];
  exam_values:Array<string>=[];
  show = false;
  co:Array<CO>=[];
  marks_dist: FormGroup;
  constructor(private fb:FormBuilder) { }

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
    
    this.CO_details=this.fb.group({
      course_outcome:['',[Validators.required]],
      cognitive_level:['',[Validators.required,]],
      session:['',[Validators.required,]],
      })

    this.PO_details=this.fb.group({
      po_pso:['',Validators.required]
    })

    this.marks_dist = this.fb.group({
      orders: new FormArray([])
    });
      
  }
  coursesubmit(){
    console.log("Ahead");
    console.log(this.co);
    for(let i=0;i<this.course_details.controls['co'].value;i++)
    {
      let val : CO = {
        Course_Outcome : "",
        Cognitive_Level : "",
        No_of_hours : 0,
        PO_map : []
      };
      this.co.push(val);
    }
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
