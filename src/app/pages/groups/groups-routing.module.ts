import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroupListComponent} from './group-list/group-list.component';
import {GroupViewComponent} from './group-view/group-view.component';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent,
  },
  {
    path: ':id',
    component: GroupViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {
}
