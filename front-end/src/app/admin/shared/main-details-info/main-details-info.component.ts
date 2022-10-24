import { Component, Input, OnInit } from '@angular/core';
import { DetailsInfo } from '../interfaces/details-info';

@Component({
  selector: 'app-main-details-info',
  templateUrl: './main-details-info.component.html',
  styleUrls: ['./main-details-info.component.scss'],
})
export class MainDetailsInfoComponent implements OnInit {
  @Input() data?: DetailsInfo;

  details?: Array<any>;
  route?: string;

  constructor() {}

  ngOnInit() {
    if (this.data) {
      this.details = this.data.params;
      this.route = this.data.route;
    }
  }
}
