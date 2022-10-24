import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminStatisticsDrugResValue } from 'src/app/admin/shared/interfaces/admin-statistics-value';
import { AdminStatisticService } from '../admin-statistic.service';
import { Location } from '@angular/common';
import { first } from 'rxjs';

@Component({
  selector: 'app-admin-dialog-drug-statistics',
  templateUrl: './admin-dialog-drug-statistics.component.html',
  styleUrls: ['./admin-dialog-drug-statistics.component.scss'],
})
export class AdminDialogDrugStatisticsComponent implements OnInit {
  modalDrugForm = this.fb.group({
    drug: [''],
  });
  drugs: AdminStatisticsDrugResValue[] | undefined;

  title: String = 'Видалення препарату';

  constructor(
    private fb: FormBuilder,
    private adminStatisticService: AdminStatisticService,
    private route: ActivatedRoute,
    private _location: Location,
  ) {}

  ngOnInit() {
    this.adminStatisticService
      .getDrugStatistics({
        name: '',
        limit: 0,
        page: 0,
        active: null,
        direction: null,
      })
      .pipe(first())
      .subscribe(data => {
        const drugId = this.route.snapshot.queryParamMap.get('id');
        this.drugs = data.list;
        if (drugId) {
          this.modalDrugForm.patchValue({
            drug: data.list.find(drug => drug._id === drugId) as any,
          });
        }
      });
  }
  onSubmit(form: FormGroup) {
    this.adminStatisticService
      .deleteDrug(form.value.drug)
      .pipe(first())
      .subscribe(data => {
        this._location.back();
      });
  }
}
