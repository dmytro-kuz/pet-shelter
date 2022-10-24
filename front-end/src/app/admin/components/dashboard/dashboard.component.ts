import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ApiAdminService } from 'src/app/shared/service/api-admin.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { DashboardInfo } from '../../shared/interfaces/dashboard-info';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  path: string = '/dashboard';
  loading$ = this.loader.loading$;

  constructor(private loader: LoadingService, private apiAdminService: ApiAdminService) {}

  dashboardInfo$: Observable<DashboardInfo> = this.apiAdminService.get(this.path, {});

  ngOnInit() {}
}
