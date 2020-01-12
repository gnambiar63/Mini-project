import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';
import { CO } from 'src/app/shared/CO.model';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-course-outcome',
  templateUrl: './course-outcome.component.html',
  styleUrls: ['./course-outcome.component.css']
})
export class CourseOutcomeComponent implements OnInit,AfterViewInit {

  @ViewChild('stepper',{static: false}) stepper:MatStepper;
  @ViewChild('btn',{static: false}) button;
  @ViewChild('ref',{static: false}) reference:ElementRef;


  //small bug where deleting stepper contents while stepper index greater than or equal to the one 
    // deleted causes freezing
  
  ngAfterViewInit() {
    // if(this.stepper.selectedIndex != this.stepper._steps.length-1)
    //   {
    //     this.button.nativeElement.disabled = true;
    //   }
    //   else{
    //     this.button.nativeElement.enabled = true;
    //   }
  }

  access(event : Event,i)
  {
    console.log(i);
    if(i >= this.stepper._steps.length-1)
    {
      this.button.nativeElement.disabled = false;
      this.reference.nativeElement.innerText = 'Save Changes';  //Does not work for some reason

      // this.button2.nativeElement.disabled = true;
      // this.secbutton.nativeElement.disabled = true;
    }
  }
  
  CO_details:FormGroup;
  test:FormGroup;
  co:Array<CO>;

  constructor(private fb:FormBuilder,private account_service:AccountService) { }


  ngOnInit() {

    // if(this.stepper)
    // {
    //   if(this.stepper.selectedIndex != this.stepper._steps.length-1)
    //   {
    //     this.button.nativeElement.disabled = true;
    //   }
    //   else{
    //     this.button.nativeElement.disabled = false;
    //   }
    // }
    
  this.CO_details=this.fb.group({
    Course_Outcome:['',[Validators.required]],
    Cognitive_Level:['',[Validators.required,]],
    No_of_hours:['',[Validators.required,]],
    })

    this.co=this.account_service.co;
    this.account_service.currentMessage.subscribe(message => this.co = message)

    console.log(this.co);
  }

  CO_submit(num){
    
    this.account_service.co[num].Course_Outcome=this.CO_details.controls['Course_Outcome'].value;
    this.account_service.co[num].Cognitive_Level=this.CO_details.controls['Cognitive_Level'].value;
    this.account_service.co[num].No_of_hours=this.CO_details.controls['No_of_hours'].value;
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

}
