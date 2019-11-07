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
  p:Array<number> = [];
  
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
      console.log(this.p);
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
    let printContents, popupWin;
    printContents = document.getElementById('paper').innerHTML;
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
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}





