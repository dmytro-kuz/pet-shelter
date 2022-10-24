import { FilterOptions } from '../../../../data/interfaces/filter-options';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filterValues } from './../../../../data/filterValue';
import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() filterValues?: Array<any>;
  filterValue?: Array<any>;
  filterForm?: FormGroup;
  startPageSize: number = 6;
  startPageIndex: number = 0;
  defValue: FilterOptions = {
    type: null,
    size: null,
    sex: null,
    age: null,
    limit: this.startPageSize,
    page: this.startPageIndex,
  };

  constructor(private fb: FormBuilder, private filterService: FilterService) {}

  filter$ = this.filterService.filter$;

  ngOnInit() {
    this.filterValue = filterValues;
    this.filterForm = this.fb.group(this.defValue);
  }

  onSubmit(form: FormGroup) {
    this.filterService.filter.next(form.value);
  }
  resetFilterForm(): void {
    this.filterForm?.reset(this.defValue);
  }
}
