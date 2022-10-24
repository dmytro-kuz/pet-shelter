import { SocketService } from './../../../shared/service/socket.service';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { NotificationInfo } from '../../shared/interfaces/notification-info';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit, OnDestroy {
  constructor(private breakpoint: BreakpointObserver, private socketService: SocketService) {}

  notificationInfo$: Observable<NotificationInfo> = this.socketService.listen('broadcast');
  isExpanded: boolean = false;
  sideNavMode!: MatDrawerMode;
  toggle: boolean = false;

  @ViewChild(MatSidenav, { static: true }) sidenav?: MatSidenav;

  ngOnInit() {
    this.setMode();
    this.socketService.connect();
  }
  ngOnDestroy() {
    this.socketService.disconnect();
  }
  closeSideNAv() {
    if (this.toggle) {
      return this.sidenav?.toggle();
    }
    return;
  }

  private setMode(): void {
    if (this.sidenav) {
      if (this.breakpoint.isMatched('(max-width: 425px)')) {
        this.isExpanded = true;
        this.toggle = true;
        this.sidenav.close();
        this.sidenav.mode = 'over';
      } else {
        this.toggle = false;
        this.sidenav?.open();
        this.sidenav.mode = 'side';
      }
    }
  }
  deleteToken() {
    localStorage.removeItem('accessToken');
  }
}
