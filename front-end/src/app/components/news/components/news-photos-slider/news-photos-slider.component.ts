import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Splide from '@splidejs/splide';
import { uid } from 'uid';
@Component({
  selector: 'app-news-photos-slider',
  templateUrl: './news-photos-slider.component.html',
  styleUrls: ['./news-photos-slider.component.scss'],
})
export class NewsPhotosSliderComponent implements AfterViewInit, OnInit {
  @Input() data?: any;

  constructor() {}

  photos: string[] = [];

  uId = uid(5);

  ngOnInit() {
    this.photos = this.data;
  }

  ngAfterViewInit(): void {
    const main = new Splide('#main-carousel' + this.uId, {
      type: 'fade',
      heightRatio: 0.7,
      rewind: true,
      pagination: false,
      arrows: false,
      breakpoints: {
        768: {
          heightRatio: 0.6,
        },
        620: {
          fixedWidth: 500,
        },
        550: {
          fixedWidth: 450,
        },
        480: {
          fixedWidth: 370,
        },
        430: {
          fixedWidth: 310,
        },
        330: {
          fixedWidth: 260,
        },
      },
    });

    const thumbnails = new Splide('#thumbnails-carousel' + this.uId, {
      rewind: true,
      fixedWidth: 75,
      fixedHeight: 58,
      isNavigation: true,
      arrows: true,
      gap: 10,
      focus: 'center',
      pagination: false,
      cover: true,
      dragMinThreshold: {
        mouse: 4,
        touch: 10,
      },
      breakpoints: {
        768: {
          fixedWidth: 66,
          fixedHeight: 38,
        },
        620: {
          fixedWidth: 60,
          fixedHeight: 34,
          gap: 2,
          perPage: 8,
        },
        430: {
          fixedWidth: 50,
          fixedHeight: 28,
        },
        330: {
          fixedWidth: 40,
          fixedHeight: 22,
        },
      },
      keyboard: false,
      prev: 'splide__arrow--prev arrow__move-left',
      next: 'splide__arrow--next arrow__move-right',
    });

    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();
  }
}
