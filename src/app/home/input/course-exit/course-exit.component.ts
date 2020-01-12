import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';
import { CO } from 'src/app/shared/CO.model';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-course-exit',
  templateUrl: './course-exit.component.html',
  styleUrls: ['./course-exit.component.css']
})
export class CourseExitComponent implements OnInit {

  course_exit:FormGroup;
  test:FormGroup;
  co:Array<CO>;

  constructor(private fb:FormBuilder,private account_service:AccountService) { }


  ngOnInit() {

    
    
  this.course_exit=this.fb.group({
    No3:['',[Validators.required]],
    No2:['',[Validators.required,]],
    No1:['',[Validators.required,]],
    })

    this.co=this.account_service.co;
    this.account_service.currentMessage.subscribe(message => this.co = message)

    console.log(this.co);
  }

  CO_submit(num){
    
    this.account_service.co[num].course_exit[2]=this.course_exit.controls['No3'].value;
    this.account_service.co[num].course_exit[1]=this.course_exit.controls['No2'].value;
    this.account_service.co[num].course_exit[0]=this.course_exit.controls['No1'].value;
    // this.account_service.change();
    this.account_service.changeMessage(this.co)
    // this.account_service.change(this.CO_details).subscribe(
    //   (err)=>{
    //     console.log(err);
    //   }
    // )

    // this.account_service.co=this.co;
    console.log(this.account_service.co)
  }
  Update_Indirect_PO(event : Event)
  {
    this.account_service.Indirect_PO();
  }
}
