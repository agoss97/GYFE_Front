import { DetailRestaurantComponent } from './detail-restaurant/detail-restaurant.component';
import { ListRestaurantComponent } from './list-restaurant/list-restaurant.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'detail/:id', component: DetailRestaurantComponent },
  {path: 'list-restaurant', component: ListRestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
