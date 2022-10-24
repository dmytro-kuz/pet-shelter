import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminStatisticsFoodResValue } from 'src/app/admin/shared/interfaces/admin-statistics-value';

import { AdminStatisticService } from '../admin-statistic.service';
import { Location } from '@angular/common';
import { first } from 'rxjs';

@Component({
  selector: 'app-admin-dialog-food-statistics',
  templateUrl: './admin-dialog-food-statistics.component.html',
  styleUrls: ['./admin-dialog-food-statistics.component.scss'],
})
export class AdminDialogFoodStatisticsComponent implements OnInit {
  modalFoodForm: FormGroup = this.fb.group({
    food: [''],
  });
  foods: AdminStatisticsFoodResValue[] | undefined;

  title: String = 'Видалення корму';

  constructor(
    private fb: FormBuilder,
    private adminStatisticService: AdminStatisticService,
    private route: ActivatedRoute,
    private _location: Location,
  ) {}

  ngOnInit() {
    this.adminStatisticService
      .getFoodStatistics({
        name: '',
        limit: 0,
        page: 0,
        active: null,
        direction: null,
      })
      .pipe(first())
      .subscribe(data => {
        const foodId = this.route.snapshot.queryParamMap.get('id');
        this.foods = data.list;
        if (foodId) {
          this.modalFoodForm.patchValue({
            food: data.list.find(food => food._id === foodId) as any,
          });
        }
      });
  }
  onSubmit(form: FormGroup) {
    this.adminStatisticService
      .deleteFood(form.value.food)
      .pipe(first())
      .subscribe(data => {
        this._location.back();
      });
  }
}
