import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CO } from '../../shared/CO.model';
import { AccountService } from '../../shared/account.service';
import { PO } from '../../shared/PO.model';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Output() myEvent = new EventEmitter();


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

  
  constructor(private fb:FormBuilder,private account_service:AccountService,private storage:StorageService) {
    this.demoform = this.fb.group({demoArray:this.fb.array([])})
   }

  ngOnInit() {
    if(!this.storage.getPOValue())
    {
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
          L2:0,

          dir:0,
          indir:0,
          PO_Action:"",
        };
        this.po.push(val);
      }
      this.account_service.po=this.po;
    
    }
      
    
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
  ngAfterViewInit()
  {
    setTimeout(() => {
      if(this.account_service.main_course_details[0]!="")
      {
        this.course_details.setValue({
          name:this.account_service.main_course_details[0],
          code:this.account_service.main_course_details[1],
          session:this.account_service.main_course_details[2],
          semester:this.account_service.main_course_details[3],
          credits:this.account_service.main_course_details[4],
          ltp:this.account_service.main_course_details[5],
          co:this.account_service.main_course_details[6]
        });
      }
    });
  }

  print(event :Event)
  {
    this.myEvent.emit(null)
  }

  coursesubmit(){
    console.log("Ahead");
    console.log(this.course_details.value);

    this.co=this.account_service.co;
    this.po=this.account_service.po;

    this.account_service.course_details=this.course_details;

    this.account_service.main_course_details[0]=this.course_details.controls["name"].value;
    this.account_service.main_course_details[1]=this.course_details.controls["code"].value;
    this.account_service.main_course_details[2]=this.course_details.controls["session"].value;
    this.account_service.main_course_details[3]=this.course_details.controls["semester"].value;
    this.account_service.main_course_details[4]=this.course_details.controls["credits"].value;
    this.account_service.main_course_details[5]=this.course_details.controls["ltp"].value;
    this.account_service.main_course_details[6]=this.course_details.controls["co"].value;

    this.storage.setCourseDetailsValue(this.account_service.main_course_details);

    var addvar = this.course_details.controls['co'].value - this.co.length;


    if(addvar >= 0)
    {
      for(let i=0;i<(addvar);i++)
      {
        let val : CO = {
          Course_Outcome : "",
          Cognitive_Level : "",
          No_of_hours : "",
          CO_Target:0,
          Bloom_Level:["",""],
          PO_map : [],
          CO_Assessment : [],
          PI_map : [],
          ISE1 : 0,
          ISE2 : 0,
          MSE : 0,
          ESE : 0,
  
          ISE1A:0,
          ISE2A:0,

          ISEAvg:0,
          ISEA:0,
          MSEA:0,
          ESEA:0,
          CSA:0,
          Total_Attainment:0,

          Action:false,
          Action_plan:"",
          Modification_plan:"",
  
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
    console.log(this.account_service.co)
    this.storage.setCOValue(this.account_service.co)
    this.storage.setPOValue(this.account_service.po)

    this.account_service.save_draft().subscribe(
      (res)=>{
        console.log("File saved")
      },
      (err)=>{
        console.log("Failed!!")
      }
    );
  }

}
