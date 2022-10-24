import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { StatisticsService } from '../services/statistics.services';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  countDrugForm: any;
  countFood: number = 0;
  countDrug: number = 0;
  constructor(private service: StatisticsService) {}
  colors: string[] = ['#8067dc', '#a367dc', '#dc67ce'];
  tooltips: string[] = [
    'Кількість пачок закупленого корму відносно норми на одну тварину за  місяць',
    'Кількість пачок придбаних ліків відносно норми на одну тварину за  місяць',
    'Кількість ліків, яких треба придбати ',
  ];

  progressData$ = this.service.getPetsNeed().pipe(
    map(progressData => {
      return progressData.map((progressItem: any, index: number) => ({
        ...progressItem,
        width: progressItem.value,
        color: this.colors[index],
        tooltip: this.tooltips[index],
      }));
    }),
  );

  ngOnInit(): void {
    this.service
      .getCountFood()
      .pipe(first())
      .subscribe(data => {
        this.countFood = data;
      });
    this.service
      .getCountDrug()
      .pipe(first())
      .subscribe(data => {
        this.countDrug = data;
      });
  }
}
