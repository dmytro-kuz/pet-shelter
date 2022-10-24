import { AdminNewsDetailResolver } from './components/admin-news/components/admin-news-detail/admin-news-detail.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOverstaysComponent } from './components/admin-overstays/admin-overstays/admin-overstays.component';
import { AdminPetsComponent } from './components/admin-pets/admin-pets/admin-pets.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { AdminDonateComponent } from './components/admin-donate/admin-donate.component';
import { AdminPetDetailComponent } from './components/admin-pets/admin-pet-detail/admin-pet-detail.component';
import { AdminPetDetailResolver } from './components/admin-pets/admin-pet-detail/admin-pet-detail.resolver';
import { AdminOverstayDetailsComponent } from './components/admin-overstays/admin-overstay-details/admin-overstay-details.component';
import { OverstayDetailResolver } from './components/admin-overstays/admin-overstay-details/overstay-details.resolver';
import { AdminDrugStatisticsComponent } from './components/admin-statitistics-components/admin-drug-statistics/admin-drug-statistics.component';
import { AdminFoodStatisticsComponent } from './components/admin-statitistics-components/admin-food-statistics/admin-food-statistics.component';
import { AdminStatisticsWrapperComponent } from './components/admin-statitistics-components/admin-statistics-wrapper/admin-statistics-wrapper.component';
import { AdminNewsComponent } from './components/admin-news/components/admin-news/admin-news.component';
import { AdminAdoptsComponent } from './components/admin-adopt/admin-adopts/admin-adopts.component';
import { AdminAdoptDetailsComponent } from './components/admin-adopt/admin-adopt-details/admin-adopt-details.component';
import { AdminDetailResolver } from './components/admin-adopt/admin-adopt-details/adopt-details.resover';
import { AdminDialogFoodStatisticsComponent } from './components/admin-statitistics-components/admin-dialog-statistics/admin-dialog-food-statistics.component';
import { AdminDialogDrugStatisticsComponent } from './components/admin-statitistics-components/admin-dialog-drug-statistics/admin-dialog-drug-statistics.component';
import { AdminNewsDetailComponent } from './components/admin-news/components/admin-news-detail/admin-news-detail.component';
import { AdminNewsAddingComponent } from './components/admin-news/components/admin-news-adding/admin-news-adding.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'pets',
        component: AdminPetsComponent,
      },
      {
        path: 'pets/detail',
        component: AdminPetDetailComponent,
        resolve: { PetDetails$: AdminPetDetailResolver },
      },
      {
        path: 'overstays',
        component: AdminOverstaysComponent,
      },
      {
        path: 'overstay-details',
        component: AdminOverstayDetailsComponent,
        resolve: { OverstayDetails$: OverstayDetailResolver },
      },
      {
        path: 'news',
        component: AdminNewsComponent,
      },
      {
        path: 'news/adding',
        component: AdminNewsAddingComponent,
      },
      {
        path: 'news/details',
        component: AdminNewsDetailComponent,
        resolve: { NewsDetails$: AdminNewsDetailResolver },
      },
      {
        path: 'statistics',
        component: AdminStatisticsWrapperComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'food',
          },
          {
            path: 'food',
            component: AdminFoodStatisticsComponent,
          },

          {
            path: 'drug',
            component: AdminDrugStatisticsComponent,
          },
          {
            path: 'food/details',
            component: AdminDialogFoodStatisticsComponent,
          },
          {
            path: 'drug/details',
            component: AdminDialogDrugStatisticsComponent,
          },
        ],
      },
      {
        path: 'adopts',
        component: AdminAdoptsComponent,
      },
      {
        path: 'adopt-details',
        component: AdminAdoptDetailsComponent,
        resolve: { AdoptDetails$: AdminDetailResolver },
      },
      {
        path: 'donate',
        component: AdminDonateComponent,
      },
      {
        path: '**',
        redirectTo: '/404',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
