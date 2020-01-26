import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';
import { CO } from 'src/app/shared/CO.model';
import { MatStepper } from '@angular/material';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-course-exit',
  templateUrl: './course-exit.component.html',
  styleUrls: ['./course-exit.component.css']
})
export class CourseExitComponent implements OnInit {

  @ViewChild('stepper',{static: false}) stepper:MatStepper;
  @ViewChild('btn',{static: false}) final_button;

  course_exit:FormGroup;
  test:FormGroup;
  co:Array<CO>;

  constructor(private fb:FormBuilder,private account_service:AccountService,private storage:StorageService) { }


  ngOnInit() {

    
    
  this.course_exit=this.fb.group({
    No3:['',[Validators.required]],
    No2:['',[Validators.required,]],
    No1:['',[Validators.required,]],
    })

    this.co=this.account_service.co;
    // this.account_service.currentMessage.subscribe(message => this.co = message)

    console.log(this.co);
  }
  ngAfterViewInit()
  {
    setTimeout(() => {    //set timeout is used to avoid expressionchange error.Let the form load empty first and then fill it.
      if(this.account_service.co.length!=0)
      {
        this.course_exit.setValue({
          No3:this.co[0].course_exit[2],
          No2:this.co[0].course_exit[1],
          No1:this.co[0].course_exit[0]
        });
      }
    });
  }

  access(event : Event,i)
  {
    let x = document.getElementById("coex-"+String(this.stepper._steps.length-1));
    x.innerHTML="Save Changes";
    if(i >= this.stepper._steps.length-1)
    {
      this.final_button.nativeElement.disabled = false;
      (document.getElementById("coex-"+String(this.stepper._steps.length-1)) as HTMLButtonElement).disabled=true;
    }
  }

  CO_submit(num){
    
    this.account_service.co[num].course_exit[2]=this.course_exit.controls['No3'].value;
    this.account_service.co[num].course_exit[1]=this.course_exit.controls['No2'].value;
    this.account_service.co[num].course_exit[0]=this.course_exit.controls['No1'].value;
    // this.account_service.change();
    this.account_service.changeMessage(this.co)

    this.storage.setCOValue(this.account_service.co)
    // this.storage.setPOValue(this.account_service.po)
    // this.account_service.change(this.CO_details).subscribe(
    //   (err)=>{
    //     console.log(err);
    //   }
    // )

    // this.account_service.co=this.co;
    console.log(this.account_service.co)

    
    if(this.account_service.co.length!=0 && num< this.stepper._steps.length-1 && this.course_exit.touched == false  && this.course_exit.dirty == false)
    {
      this.course_exit.setValue({
        No3:this.co[num+1].course_exit[2],
        No2:this.co[num+1].course_exit[1],
        No1:this.co[num+1].course_exit[1]
      });
    }
  }
  Update_Indirect_PO(event : Event)
  {
    this.account_service.Indirect_PO();
    // this.storage.setCOValue(this.account_service.co)
    this.storage.setPOValue(this.account_service.po)
  }
}
