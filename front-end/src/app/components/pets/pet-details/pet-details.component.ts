import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Pet } from 'src/app/data/interfaces/pet';
import * as moment from 'moment';
import Splide from '@splidejs/splide';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { ClientPetFormComponent } from '../modals/client-pet-form/client-pet-form.component';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss'],
})
export class PetDetailsComponent implements OnInit, AfterViewInit {
  loading$ = this.loader.loading$;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private loader: LoadingService) {}
  ngAfterViewInit(): void {
    const main = new Splide('#main-carousel', {
      type: 'fade',
      rewind: true,
      pagination: false,
      arrows: false,
    });

    const thumbnails = new Splide('#thumbnail-carousel', {
      fixedWidth: 50,
      fixedHeight: 50,
      width: 350,
      gap: 5,
      isNavigation: true,
      prev: 'splide__arrow--prev arrow__move-left',
      next: 'splide__arrow--next arrow__move-right',
      breakpoints: {
        900: {
          width: 270,
        },
        480: {
          width: 200,
        },
        430: {
          width: 270,
        },
      },
      rewind: true,
      pagination: false,
    });

    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();
  }
  petDetail?: Pet;
  petId?: string;
  age: number | string = 0;
  nowMoment = moment();
  photos: any;
  show: boolean = true;

  ngOnInit() {
    this.setPetDetail();
  }

  openAdoptDialog() {
    this.dialog.open(ClientPetFormComponent, {
      data: {
        title: 'Хочу всиновити',
        type: 'adopt',
        petId: this.petDetail?._id,
      },
    });
  }

  openOverstayDialog() {
    this.dialog.open(ClientPetFormComponent, {
      data: {
        title: 'Хочу взяти на перетримку',
        type: 'overstay',
        petId: this.petDetail?._id,
        allOverstayDates: this.petDetail?.overstayDates,
      },
    });
  }

  setPetDetail() {
    this.petDetail = this.route.snapshot.data['PetsDetails$'];
    const birthMoment = moment(this.petDetail ? this.petDetail.birthDate : moment());
    if (this.nowMoment.diff(birthMoment, 'year') === 0) {
      this.age = 'Менше року';
    } else this.age = this.nowMoment.diff(birthMoment, 'year');
    this.photos = this.petDetail?.photos;
    if (!this.photos.length) {
      this.photos.push('/assets/img/animal-shelter-placeholder.png');
      this.show = false;
    }
  }
}
