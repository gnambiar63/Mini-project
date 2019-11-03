import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  PO_index=0;
  show = false;
  co:Array<CO>=[];
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
      
  }
  coursesubmit(){
    console.log("Ahead");
    console.log(this.co);
    for(let i=0;i<this.course_details.controls['co'].value;i++)
    {
      let val :CO;
      this.co.push(val);
    }
  }
  PO_submit(num)
  {
    // this.co[this.PO_index].PO_map.push(this.PO_details.controls['po_pso'].value);
    console.log(num);
    // this.co[num].PO_map.push(this.PO_details.controls['po_pso'].value);
    this.show = true;
  }
}
