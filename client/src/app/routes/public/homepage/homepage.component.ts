import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'prk-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  count: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
