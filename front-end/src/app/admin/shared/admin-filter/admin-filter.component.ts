import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-admin-filter',
  templateUrl: './admin-filter.component.html',
  styleUrls: ['./admin-filter.component.scss'],
})
export class AdminFilterComponent implements OnInit {
  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() PaginationChange: any;
  @Input() filterParams!: any;
  form: boolean = false;
  filterValue?: any;
  filterForm?: FormGroup;
  today: Date = new Date();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.filterValue = this.filterParams;
    this.filterForm = this.fb.group(this.filterParams.defValue);
  }
  onSubmit(form: FormGroup) {
    this.filterChange.emit(form.value);
  }
  resetFilterForm() {
    this.filterForm?.reset(this.filterParams?.defValue);
  }
}
