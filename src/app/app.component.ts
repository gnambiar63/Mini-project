import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'obe';
  private mobile : any;
  public innerWidth: any;
  constructor(private router : Router){}
  ngOnInit(){
    this.onResize(null);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth<1200)
    {
      this.mobile=true;
    }
    else{
      this.mobile=false;
      if(this.router.url === '/login')
      {
        console.log('true');
      }
      console.log(this.innerWidth);
    }
  }
}
