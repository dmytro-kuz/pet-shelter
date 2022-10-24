import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { StatisticsService } from '../services/statistics.services';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit {
  donates$ = this.service.getDonates();
  width!: number;
  innerWidth: any;
  // options
  view: [number, number] = [this.width, 300];
  fitContainer: boolean = true;

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme: Color = {
    name: 'test',
    selectable: false,
    group: ScaleType.Linear,
    domain: [
      '#FA709A',
      '#FEE140',
      '#F76B1C',
      '#EE74E1',
      '#DDD6F3',
      '#FFBBEC',
      '#A9C9FF',
      '#74EBD5',
      '#9FACE6',
      '#FA8BFF',
      '#2B86C5',
      '#2BD2FF',
      '#FFDEE9',
      '#2BFF88',
    ],
  };
  constructor(private service: StatisticsService, private breakpoint: BreakpointObserver) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.setMode();
  }

  private setMode(): void {
    if (this.innerWidth >= 600 && this.innerWidth <= 700) {
      this.view = [500, 300];
    }
    if (this.innerWidth >= 500 && this.innerWidth <= 599) {
      this.view = [400, 300];
    }
    if (this.innerWidth >= 425 && this.innerWidth <= 499) {
      this.showLegend = false;
      this.view = [400, 300];
    }
    if (this.innerWidth < 425) {
      this.showLegend = false;
      this.view = [300, 300];
    }
  }
}
