import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public temp;
  public print;
  constructor() { }
  

  setCOValue(CO)
  {
    sessionStorage.setItem('CO', JSON.stringify(CO));
  }
  setPOValue(PO)
  {
    sessionStorage.setItem('PO', JSON.stringify(PO));
  }
  setCourseDetailsValue(CD)
  {
    sessionStorage.setItem('CD', JSON.stringify(CD));
  }

  getCOValue()
  {
    this.temp = JSON.parse(sessionStorage.getItem('CO'));
    return this.temp;
  }

  getPOValue()
  {
    this.temp = JSON.parse(sessionStorage.getItem('PO'));
    return this.temp;
  }
  getCourseDetailsValue()
  {
    this.temp = JSON.parse(sessionStorage.getItem('CD'));
    return this.temp;
  }

  Print()
  {
    let popupWin;
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
    <body onload="window.print();window.close()">${print}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
