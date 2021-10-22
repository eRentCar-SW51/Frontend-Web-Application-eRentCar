import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyCarComponent} from "./my-car/pages/my-car/my-car.component";
import {MyFavouritesComponent} from "./my-favourites/pages/my-favourites/my-favourites.component";
import {MyRentalsComponent} from "./my-rentals/pages/my-rentals/my-rentals.component";
import {MyReservationsComponent} from "./my-reservations/pages/my-reservations/my-reservations.component";
import {SearchCarComponent} from "./search-car/pages/search-car/search-car.component";
import {SubscriptionComponent} from "./subscription/pages/subscription/subscription.component";
import {ClientNavigationComponent} from "./client-navigation/client-navigation.component";
import {CarComponent} from "./car/pages/car/car.component";
import {MyProfileComponent} from "./my-profile/pages/my-profile/my-profile.component";

const auxUser: any = localStorage.getItem('clientData');

const routes: Routes = [
  {path: 'client/:clientId/my-car',  component: MyCarComponent},
  {path: 'client/:clientId/favourites', component: MyFavouritesComponent},
  {path: 'client/:clientId/rentals', component: MyRentalsComponent},
  {path: 'client/:clientId/reservations', component: MyReservationsComponent},
  {path: 'client/:clientId/search', component: SearchCarComponent},
  {path: 'client/:clientId/subscription', component: SubscriptionComponent, data: JSON.parse(auxUser)},
  {path: 'client/:clientId', component: ClientNavigationComponent},
  {path: 'client/:clientId/search/car/:carId', component: CarComponent},
  {path: 'client/:clientId/profile', component: MyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
