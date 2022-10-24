import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-default',
  templateUrl: './button-default.component.html',
  styleUrls: ['./button-default.component.scss'],
})
export class ButtonDefaultComponent implements OnInit {
  constructor() {}
  @Input() title?: string;

  ngOnInit() {}
}
