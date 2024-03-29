import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailRoomComponent } from './detail-room/detail-room.component';
import { ListRoomComponent } from './list-room/list-room.component';

const routes: Routes = [
  { path: 'detail/:key', component: DetailRoomComponent },
  { path: 'list-room', component: ListRoomComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
