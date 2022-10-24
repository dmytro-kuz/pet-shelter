import { Component, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { StatisticsService } from '../services/statistics.services';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent {
  view: [number, number] = [300, 300];
  fitContainer: boolean = true;
  chartData$ = this.service.getPets();

  // options
  gradient: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme: Color = {
    name: 'test',
    selectable: false,
    group: ScaleType.Linear,
    domain: ['#FBAB7E', '#F7CE68', '#FF99AC', '#FF6A88'],
  };

  constructor(private service: StatisticsService) {}
}
