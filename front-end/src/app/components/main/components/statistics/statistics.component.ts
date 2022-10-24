import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/service/loading.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  chartName: string = 'pie';

  constructor(private loader: LoadingService) {}
  loading$ = this.loader.loading$;

  ngOnInit() {}
  changeChart(name: string) {
    this.chartName = name;
  }
}
