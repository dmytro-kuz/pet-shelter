import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private scroller: ViewportScroller, private router: Router) {}

  burgerOn: boolean = false;
  landingPage: boolean = false;

  ngOnInit() {}

  toggleBurger() {
    this.burgerOn = !this.burgerOn;
    if (this.burgerOn) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
  checkRoutes() {
    if (this.router.url === '/') {
      this.landingPage = true;
    }
  }

  landingRoute(scroll: string): void {
    this.scroller.scrollToAnchor(scroll);
  }
}
