import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';
import { FormGroup } from '@angular/forms';
import { CO } from 'src/app/shared/CO.model';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {
  current = null;
  semMonth = 'Nov/Dec. 2018';
  marks = 80;
  class = 'T.E';
  courseCode = 'IT52';
  course = 'Computer Networks';
  duration = '180 Minutes';
  sem = 'V';
  branch = 'IT';


  show_details:boolean=false;
  course_details : FormGroup;
  
  
  instructions = [
    'All Questions are Compulsory',
    'Draw neat diagrams',
    'Assume suitable data if necessary'
  ];

  co:Array<CO>;

  PO:Array<number>=[1,2,3,4,5,6,7,8,9,10,11,12];
  PSO:Array<number>=[1,2,3];
  
  constructor(private account_service:AccountService) {
    this.account_service.currentMessage
      .subscribe(data => {
        this.co = data;
        console.log(this.co);
      });
  }
  
  testing=false;


  ngOnInit() {
    // this.course_details=this.account_service.course_details;
    this.account_service.demo.subscribe(
      (res)=>{
        this.course_details=res;
        console.log(res);
      }
      
    );
  

  }
  test()
  {
    console.log(this.co)
    this.co=this.account_service.co;
    console.log(this.co)
    this.testing=true;
  }

  check(index,x)
  {
    if(this.co[index].PO_map.includes("PO"+(x+1)))
    {
      // console.log('true');
      return true;
    }
    else
    {
      // console.log('false');
      // console.log("PO"+(x+1));
      return false;
    }
  }

  checkalt(index,x)
  {
    if(this.co[index].PO_map.includes("PSO"+(x+1)))
    {
      // console.log('true');
      return true;
    }
    else
    {
      // console.log('false');
      // console.log("PO"+(x+1));
      return false;
    }
  }

  add:Array<any>=[0,0,0,0,0,0,0,0,0,0,0,0];

  // addPO(){
  //   for(let i=0;i<12;i++)
  //   {
  //     var p = document.getElementsByClassName(i.toString());
  //     console.log(p);
  //     Array.prototype.forEach.call(p, function(el) {
  //     // Do stuff here
  //     this.add[i] = this.add[i] + el.innerHTML;
  //   });
  //   }
  // }

}
