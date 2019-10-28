import { Component, OnInit } from '@angular/core';

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

  instructions = [
    'All Questions are Compulsory',
    'Draw neat diagrams',
    'Assume suitable data if necessary'
  ];

  constructor() { }

  ngOnInit() {
  }

}
