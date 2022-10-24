import { ContentTableModule } from './../../shared/content-table/content-table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFilterModule } from '../../shared/admin-filter/admin-filter.module';
import { AdminNewsComponent } from './components/admin-news/admin-news.component';
import { AdminNewsDetailComponent } from './components/admin-news-detail/admin-news-detail.component';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminNewsAddingComponent } from './components/admin-news-adding/admin-news-adding.component';
import { AdminRoutingModule } from 'src/app/admin/admin-routing.module';

@NgModule({
  declarations: [AdminNewsComponent, AdminNewsDetailComponent, AdminNewsAddingComponent],
  imports: [
    CommonModule,
    ContentTableModule,
    AdminFilterModule,
    SpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatFormFieldModule,
    AdminRoutingModule,
  ],
})
export class AdminNewsModule {}
