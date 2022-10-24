import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { MainModule } from './components/main/main.module';
import { NewsModule } from './components/news/news.module';
import { PetsModule } from './components/pets/pets.module';
import { DonateModule } from './components/donates/donate.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AuthModule } from './components/auth/auth.module';
import { PageNotFoundModule } from './shared/components/page-not-found/page-not-found.module';
import { AdminModule } from './admin/admin.module';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { ErrorCatchingInterceptorProvider } from './interceptors/error-catching.interceptor';
import { LoaderInterceptorProvider } from './interceptors/loader.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MainModule,
    PetsModule,
    NewsModule,
    DonateModule,
    HttpClientModule,
    MatIconModule,
    AuthModule,
    PageNotFoundModule,
    AdminModule,
  ],

  providers: [AuthInterceptorProvider, ErrorCatchingInterceptorProvider, LoaderInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
