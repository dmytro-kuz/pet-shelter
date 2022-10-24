import { Component, OnInit } from '@angular/core';
import { FilterOptions } from 'src/app/data/interfaces/filter-options';
import { FilterService } from '../components/filter/filter.service';
import { PetsService } from '../pets.service';
@Component({
  selector: 'app-pets-preview',
  templateUrl: './pets-preview.component.html',
  styleUrls: ['./pets-preview.component.scss'],
})
export class PetsPreviewComponent implements OnInit {
  constructor(private petsService: PetsService, private filterService: FilterService) {}

  loading$ = this.petsService.loading$;
  pets$ = this.petsService.pets$;
  defValue: FilterOptions = {
    type: null,
    size: null,
    sex: null,
    age: null,
    limit: 6,
    page: 0,
  };

  ngOnInit() {
    this.filterService.filter.next(this.defValue);
    this.filterService.pagination.next(this.defValue);
  }
}
