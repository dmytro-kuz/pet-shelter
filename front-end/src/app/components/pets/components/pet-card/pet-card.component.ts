import { Component, Input, OnInit } from '@angular/core';
import { Pet } from 'src/app/data/interfaces/pet';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss'],
})
export class PetCardComponent implements OnInit {
  @Input() pet?: Pet;

  get photo(): string {
    const photo = this.pet?.photos[0];
    return photo ?? '/assets/img/animal-shelter-placeholder.png';
  }

  constructor() {}

  ngOnInit() {}
}
