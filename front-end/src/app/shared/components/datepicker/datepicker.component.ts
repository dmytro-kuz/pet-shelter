import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PickerParams } from 'src/app/data/interfaces/picker-params';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class DatepickerComponent implements OnInit {
  @Input() pickerData?: PickerParams;

  // calendar params
  minCalendarDate: Moment = moment();
  maxCalendarValue: Moment = this.minCalendarDate.clone().add(3, 'M');
  maxCalendarDate: Moment = this.maxCalendarValue;
  disabledDates?: Array<number>;

  startOverstay: Moment = moment();
  endOverstay: Moment = moment();
  reservedDatesForm?: FormGroup;
  label?: string;
  clearType?: string;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.disabledDates = this.pickerData?.allOverstayDates;
    this.label = this.pickerData?.label;
    this.clearType = this.pickerData?.clearType;
    this.setCurrentDates();
    this.reservedDatesGroup();
  }

  setCurrentDates() {
    this.startOverstay = moment(this.pickerData?.overstayDates[0]);
    this.endOverstay = moment(this.pickerData?.overstayDates[this.pickerData.overstayDates?.length - 1]);
  }

  reservedDatesGroup() {
    this.reservedDatesForm = this.formBuilder.group({
      overstayStart: ['', Validators.required],
      overstayEnd: ['', Validators.required],
    });
  }

  myFilter = (date: Moment | null): any => {
    const filterDate = (date || moment()).valueOf();
    return this.disabledDates?.indexOf(filterDate) == -1;
  };

  startDateChanged(event: MatDatepickerInputEvent<Moment>) {
    this.getOverstayDates();
    const selectedDate = event.value?.startOf('day').valueOf();
    if (selectedDate && this.disabledDates) {
      const maxDate = Math.max(...this.disabledDates);
      if (selectedDate < maxDate) {
        const sortedDates = this.disabledDates?.concat(selectedDate).sort();
        this.maxCalendarDate = moment(sortedDates[sortedDates.indexOf(selectedDate) + 1]);
      }
    } else {
      this.maxCalendarDate = this.maxCalendarValue;
    }
  }

  getOverstayDates() {
    if (this.reservedDatesForm?.valid) {
      const startDate = this.reservedDatesForm?.value.overstayStart.startOf('day');
      const endDate = this.reservedDatesForm?.value.overstayEnd.startOf('day');
      const daysAmount = endDate.clone().add(1, 'd').diff(startDate, 'days');
      const reservedDates = [];
      let date = startDate.clone();

      for (let i = 0; i < daysAmount; i++) {
        reservedDates.push(date.valueOf());
        date.add(1, 'd');
      }
      return reservedDates;
    }
    return [];
  }

  clearAndChangeReservedDates() {
    this.reservedDatesForm?.reset();
    this.setCurrentDates();
    this.getOverstayDates();
    if (this.clearType == 'filter') {
      this.pickerData?.overstayDates.forEach((element: number) => {
        this.disabledDates = this.disabledDates?.filter(item => {
          return item !== element;
        });
      });

      this.maxCalendarDate = this.maxCalendarValue;
    } else if (this.clearType == 'clear') {
      this.maxCalendarDate = this.maxCalendarValue;
    }
  }
}
