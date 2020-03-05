import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../../shared/account.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CO } from '../../shared/CO.model';
import { PO } from '../../shared/PO.model';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  
  
  PO_total = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  confirm_total = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


  show_details:boolean=false;
  public course_details : FormGroup =this.fb.group({
    name:['',[Validators.required]],
    code:['',[Validators.required,]],
    session:['',[Validators.required,]],
    semester:['',[Validators.required,]],
    credits:['',[Validators.required,]],
    ltp:['',[Validators.required,]],
    co:['',[Validators.required,]]
  });
  printContents;
  

  co:Array<CO>;
  po:Array<PO>;

  PO:Array<number>=[1,2,3,4,5,6,7,8,9,10,11,12];
  PSO:Array<number>=[1,2,3];
  p:Array<number> = [];

  public final_attainment:Array<number>;

  public show = []


  public course_details_display = {
    name  : "",
    code  : "",
    session  : "",
    semester  : "",
    credits  : "",
    ltp  : "",
    co  : ""
  }
  
  constructor(private account_service:AccountService,private storage:StorageService,private fb:FormBuilder) {
    this.account_service.currentMessage
      .subscribe(data => {
        this.co = data;
        //console.log(this.co);
      });

    this.account_service.currentData
      .subscribe(data => {
        this.final_attainment = data;
        //console.log(this.final_attainment);
      });

      this.po = this.account_service.po;
      //console.log("Called it")

  }
  
  testing=false;


  ngOnInit() {
    // this.course_details=this.account_service.course_details;
    this.po = this.account_service.po;
    //console.log("Enter")
    //console.log(this.po)
    //console.log("Exit")
    this.co = this.account_service.co;
    this.show = this.account_service.main_course_details;
    //console.log(this.account_service.main_course_details)

    this.final_attainment = [0,0]
    
    this.account_service.demo.subscribe(
      (res)=>{
        this.course_details=res;
        this.course_details_display.name = res.name
        this.course_details_display.code = res.code
        this.course_details_display.session = res.session
        this.course_details_display.semester = res.semester
        this.course_details_display.credits = res.credits
        this.course_details_display.ltp = res.ltp
        this.course_details_display.co = res.co
        //console.log(res);
      }
      
    );

  

  }
  test()
  {
    //console.log(this.co)
    this.co=this.account_service.co;
    this.po=this.account_service.po;
    //console.log(this.co)
    this.testing=true;
  }

  check(index,x) //Only forward totalling updation possible not backwards
  {
    if(this.co[index].PO_map.includes("PO"+(x+1)))
    {
      // //console.log('true');
      if(this.confirm_total[x]<=index)
      {
        this.PO_total[x] += Number(this.co[index].No_of_hours); 
        this.confirm_total[x]=index+1;
        //console.log("worked")
      }
      // //console.log(this.PO_total)
      // //console.log(index+":"+x)
      // this.storage.setCOValue(this.account_service.co)
      this.storage.setPOValue(this.account_service.po)
      return true;
    }
    else
    {
      // //console.log('false');
      // //console.log("PO"+(x+1));
      return false;
    }
  }

  checkalt(index,x)
  {
    if(this.co[index].PO_map.includes("PSO"+(x+1)))
    {
      // //console.log('true');
      if(this.confirm_total[x+12]<=index)
      {
        this.PO_total[x+12] += Number(this.co[index].No_of_hours); 
        this.confirm_total[x+12]+=1;
        //console.log("worked")
      }
      // this.storage.setCOValue(this.account_service.co)
      this.storage.setPOValue(this.account_service.po)
      return true;
    }
    else
    {
      // //console.log('false');
      // //console.log("PO"+(x+1));
      return false;
    }
  }

  // add:Array<any>=[0,0,0,0,0,0,0,0,0,0,0,0];

  // addPO(){
  //   for(let i=0;i<12;i++)
  //   {
  //     var p = document.getElementsByClassName(i.toString());
  //     //console.log(p);
  //     Array.prototype.forEach.call(p, function(el) {
  //     // Do stuff here
  //     this.add[i] = this.add[i] + el.innerHTML;
  //   });
  //   }
  // }

  t = 0;
  tindex=-1;
  testcheck(index){
    this.t=0;

    if(this.p.length<=index)
    {
      if(this.co[index].ISE1A+this.co[index].ISE2A > 0)
      {
        this.t=this.t+20;
      }
      if(this.co[index].MSEA> 0)
      {
        this.t=this.t+20;
      }
      if(this.co[index].ESEA> 0)
      {
        this.t=this.t+60;
      }
      if(this.t>0 && this.tindex!=index)
      {
        this.p.push(this.t);
        this.tindex=index;
      }
      //console.log(this.p);
      return true;
    }
    else
    {
      return false;
    }
  }


  yesno(index){
    if(this.account_service.co[index].dv>60)
    {
      return true;
    }
  }
  
  paper(): void {
    let popupWin;
    this.printContents = document.getElementById('paper').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
          <style>
          

                #demo {
                  height: 100%;
                  width: auto;
                  color: black;
                  /* border: 2px solid red; */
                  background: white;
                }
                @media (max-width:450px)
                {
                  #demo {
                    height:100vh;
                    width:auto;
                    color: black;
                    /* border: 2px solid red; */
                    background: white;
                  }
                }
                #paper {
                  /* width:750px;
                  height:842px; */
                  width:100%;
                  height:250%;
                  color: black;
                  /* // border: 2px solid red; */
                  background: white;
                  /* margin:2%; */
                }
                #list{
                  margin: 0 10%;
                  }
                  table th{
                    border:1px solid black;
                    list-style-type: none;
                    font-weight: 500;
                    font-size: 0.8rem;
                }
                table tbody{
                    border-bottom:1px solid black;
                }
                table td{
                  border:1px solid black;
                  font-size: 0.8rem;
                }
                
                #logo {
                  margin-left: 5%;
                  margin-top: 5%;
                }
                
                #info {
                  margin: 0 10%;
                  border: 1px solid black;
                  /* height: 200px; */
                }
                
                #headerLeft {
                  list-style-type: none;
                  font-weight: 500;
                  font-size: 0.8rem
                }
                
                hr {
                  margin: 0;
                }
                
                #instructions {
                  margin-left: 5%;
                }
                
                #instructions > ul {
                  list-style-type: none;
                  font-weight: 500;
                  font-size: 0.8rem;
                }
                
                #instructions > p {
                  margin-bottom: 0;
                }
                
                .grid-container {
                  display: grid;
                  margin: 0 10%;
                  grid-template-columns: 10% 70% 10% auto;
                  grid-gap: 1px;
                  background-color: black;
                  padding: 1px;
                  font-size: 0.8rem;
                }
                
                .grid-item {
                  padding:0 2%;
                  background-color: white;
                }
                
                #paperbold{
                  font-weight: 500;
                  font-size: 0.8rem;
                }
                #questions{
                  margin: 0 10%;
                  }
                  table th{
                    border:1px solid black;
                    list-style-type: none;
                    font-weight: 500;
                    font-size: 0.8rem;
                }
                table tbody{
                    border-bottom:1px solid black;
                }
                table td{
                  border-left:1px solid black;
                  border-right:1px solid black;
                }
                .one,.three,.four{
                  width:10%;
                  padding:0 8px;
                
                }
                .two{
                  width:70%;
                  padding:0 8px;
                
                }
                
                div.scroll {
                  width:auto;
                  overflow-x:scroll;
                  overflow-y:scroll;
                  height:80vh;
                  /* margin:2px; */
              }
              @media (max-width: 450px) {
                div.scroll {
                  /* width:stretch; */
                  height:50vh;
                  /* background:white; */
                  /* margin:2px; */
              }
              }
              .space{
                /* padding-left:50px; */
                margin-left:5%;
              }
          </style>
        </head>
    <body onload="window.print();window.close()">${this.printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}





