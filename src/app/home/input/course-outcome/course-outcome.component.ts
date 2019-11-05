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
  co:Array<CO>;

  constructor(private fb:FormBuilder,private account_service:AccountService) { }


  ngOnInit() {
    
  this.CO_details=this.fb.group({
    course_outcome:['',[Validators.required]],
    cognitive_level:['',[Validators.required,]],
    session:['',[Validators.required,]],
    })

    this.co=this.account_service.co;
    console.log(this.co);
  }

}
