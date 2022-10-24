import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonateFullComponent } from './components/donates/donate-full/donate-full.component';
import { LandingComponent } from './components/main/landing/landing.component';
import { NewsListComponent } from './components/news/news-list/news-list.component';
import { PetDetailsComponent } from './components/pets/pet-details/pet-details.component';
import { PetsListComponent } from './components/pets/pets-list/pets-list.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { PetDetailResolver } from './components/pets/pet-details/pet-detail.resolver';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './components/auth/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { StatisticsComponent } from './components/main/components/statistics/statistics.component';
import { ContactsComponent } from './components/main/components/contacts/contacts.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
      },
      {
        path: 'pets',
        component: PetsListComponent,
      },
      {
        path: 'pets/details',
        component: PetDetailsComponent,
        resolve: { PetsDetails$: PetDetailResolver },
      },
      {
        path: 'news',
        component: NewsListComponent,
      },
      {
        path: 'statistic',
        component: StatisticsComponent,
      },
      {
        path: 'donates',
        component: DonateFullComponent,
      },
      {
        path: 'contacts',
        component: ContactsComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [],
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(res => res.AdminModule),
  },
  { path: '**', redirectTo: '404' },
  { path: '404', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
