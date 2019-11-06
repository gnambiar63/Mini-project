import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';
import { CO } from 'src/app/shared/CO.model';

@Component({
  selector: 'app-course-outcome',
  templateUrl: './course-outcome.component.html',
  styleUrls: ['./course-outcome.component.css']
})
export class CourseOutcomeComponent implements OnInit {

  CO_details:FormGroup;
  test:FormGroup;
  co:Array<CO>;

  constructor(private fb:FormBuilder,private account_service:AccountService) { }


  ngOnInit() {
    
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
