import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(public router: Router) {}

  isTablet = false;
  getIsTablet(): boolean {
    const width = document.documentElement.clientWidth;
    const breakpoint = 768;
    if (width <= breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.isTablet = this.getIsTablet();
    window.onresize = () => {
      this.isTablet = this.getIsTablet();
    };
  }

  isMainPage() {
    return this.router.url === '/';
  }

  isContactsPage() {
    return this.router.url === '/contacts';
  }
}
